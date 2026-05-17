import type { LiquidFilter } from "../filter/filter.types";
import type { LiquidValueType } from "../object";
import type { LiquidVariableSymbol } from "./completion.types";
import { LiquidCompletionCatalog } from "./liquid-catalog.completion";
import { isIdentifier, splitOutsideQuotes } from "./string-scanner.completion";

export class LiquidTypeResolver {
  private readonly catalog: LiquidCompletionCatalog;

  constructor(catalog: LiquidCompletionCatalog) {
    this.catalog = catalog;
  }

  inferExpressionType(expression: string, variables: LiquidVariableSymbol[]): LiquidValueType {
    const segments = splitOutsideQuotes(expression, "|");
    const baseExpression = segments[0] ?? "";
    let currentType = this.inferValueType(baseExpression, variables);

    for (const filterSegment of segments.slice(1)) {
      const filterName = this.getFilterName(filterSegment);
      if (!filterName) {
        currentType = "unknown";
        continue;
      }

      const filter = this.catalog.getFilter(filterName);
      currentType = this.inferFilterReturnType(filter, currentType);
    }

    return currentType;
  }

  inferValueType(expression: string, variables: LiquidVariableSymbol[]): LiquidValueType {
    const value = expression.trim();

    if (!value) return "unknown";
    if (/^-?\d+(\.\d+)?$/.test(value)) return "number";
    if (/^"([^"\\]|\\.)*"$/.test(value) || /^'([^'\\]|\\.)*'$/.test(value)) return "string";
    if (/^(true|false)$/.test(value)) return "boolean";

    const path = this.extractValuePath(value);
    if (path) return this.catalog.getRootValueType(path, variables);

    return "unknown";
  }

  getFilterName(filterSegment: string): string | undefined {
    const match = filterSegment.trimStart().match(/^([A-Za-z_][\w-]*)\b/);
    return match?.[1];
  }

  private inferFilterReturnType(filter: LiquidFilter | undefined, currentType: LiquidValueType): LiquidValueType {
    if (!filter) return "unknown";
    if (filter.returnType) return filter.returnType;

    return filter.acceptedTypes.includes(currentType) ? currentType : "unknown";
  }

  private extractValuePath(value: string): string[] | undefined {
    if (!isIdentifier(value.split(".")[0] ?? "")) return undefined;
    if (!/^[A-Za-z_][\w-]*(?:\.[A-Za-z_][\w-]*)*$/.test(value)) return undefined;

    return value.split(".");
  }
}
