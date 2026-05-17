import type { LiquidCompletionContext, LiquidCompletionMode } from "./completion.types";
import { LiquidCompletionCatalog } from "./liquid-catalog.completion";
import {
  getAssignmentValueExpression,
  getIdentifierPrefix,
  getLastSegmentOutsideQuotes,
  getLeadingIdentifier,
  getPropertyAccess,
  isIdentifier,
  isOnlyWhitespaceAndOptionalIdentifier,
  removeLeadingIdentifier,
  splitOutsideQuotes,
} from "./string-scanner.completion";
import { LiquidTypeResolver } from "./type-inference.completion";
import type { LiquidVariableSymbol } from "./completion.types";

export class LiquidCompletionContextResolver {
  private readonly catalog: LiquidCompletionCatalog;
  private readonly typeResolver: LiquidTypeResolver;

  constructor(
    catalog: LiquidCompletionCatalog,
    typeResolver: LiquidTypeResolver,
  ) {
    this.catalog = catalog;
    this.typeResolver = typeResolver;
  }

  resolve(mode: LiquidCompletionMode, expression: string, variables: LiquidVariableSymbol[]): LiquidCompletionContext {
    if (mode === "output") {
      return this.resolveValueExpression(mode, expression, variables);
    }

    return this.resolveTagExpression(mode, expression, variables);
  }

  private resolveTagExpression(
    mode: LiquidCompletionMode,
    expression: string,
    variables: LiquidVariableSymbol[],
  ): LiquidCompletionContext {
    if (isOnlyWhitespaceAndOptionalIdentifier(expression)) {
      return {
        mode,
        type: "tag",
        prefix: getIdentifierPrefix(expression),
      };
    }

    const tagName = getLeadingIdentifier(expression);
    if (!tagName) return { mode, type: "unknown" };

    if (tagName === "assign") {
      const assignmentExpression = getAssignmentValueExpression(expression);
      if (assignmentExpression !== undefined) {
        return this.resolveValueExpression(mode, assignmentExpression, variables);
      }
    }

    const expressionAfterTagName = removeLeadingIdentifier(expression);
    return this.resolveValueExpression(mode, expressionAfterTagName, variables);
  }

  private resolveValueExpression(
    mode: LiquidCompletionMode,
    expression: string,
    variables: LiquidVariableSymbol[],
  ): LiquidCompletionContext {
    const filterContext = this.resolveFilterContext(mode, expression, variables);
    if (filterContext.type !== "unknown") return filterContext;

    const valueSegment = getLastSegmentOutsideQuotes(expression, "|");
    const propertyAccess = getPropertyAccess(valueSegment);
    if (propertyAccess) {
      return {
        mode,
        type: "property",
        path: propertyAccess.path,
        prefix: propertyAccess.prefix,
      };
    }

    const trimmedExpression = expression.trim();
    if (!trimmedExpression) {
      return { mode, type: "root-value", prefix: "" };
    }

    if (isIdentifier(trimmedExpression)) {
      const hasExactRootValue = this.hasExactRootValue(trimmedExpression, variables);
      return hasExactRootValue ? { mode, type: "unknown" } : { mode, type: "root-value", prefix: trimmedExpression };
    }

    return { mode, type: "unknown" };
  }

  private resolveFilterContext(
    mode: LiquidCompletionMode,
    expression: string,
    variables: LiquidVariableSymbol[],
  ): LiquidCompletionContext {
    const pipeSegments = splitOutsideQuotes(expression, "|");
    if (pipeSegments.length < 2) return { mode, type: "unknown" };

    const currentFilterSegment = pipeSegments[pipeSegments.length - 1] ?? "";
    const filterPrefix = getIdentifierPrefix(currentFilterSegment);
    const trimmedFilterSegment = currentFilterSegment.trim();

    if (!this.isFilterNamePosition(currentFilterSegment)) {
      return { mode, type: "unknown" };
    }

    if (filterPrefix && trimmedFilterSegment === filterPrefix && this.catalog.getFilter(filterPrefix)) {
      return { mode, type: "unknown" };
    }

    const valueExpression = pipeSegments.slice(0, -1).join("|");

    return {
      mode,
      type: "filter",
      valueType: this.typeResolver.inferExpressionType(valueExpression, variables),
      prefix: filterPrefix,
    };
  }

  private isFilterNamePosition(filterSegment: string): boolean {
    const trimmed = filterSegment.trim();
    if (!trimmed) return true;

    return /^[A-Za-z_][\w-]*$/.test(trimmed);
  }

  private hasExactRootValue(value: string, variables: LiquidVariableSymbol[]): boolean {
    return this.catalog.objects.some((object) => object.label === value) || variables.some((variable) => variable.label === value);
  }
}
