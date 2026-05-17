import * as monaco from "monaco-editor";
import { liquidFilters } from "./filter";
import { liquidObjects, type LiquidValueType } from "./object";
import { liquidTags } from "./tag";

type LiquidDelimiterType = "output" | "tag";

type LiquidCompletionContextType = "object" | "property" | "filter" | "tag" | "unknown";

type LiquidCompletionContext = {
  delimiterType?: LiquidDelimiterType;
  type: LiquidCompletionContextType;
  entity?: string;
  entityPath?: string[];
  valuePath?: string[];
  valueType?: LiquidValueType;
  filterPrefix?: string;
};
type Monaco = typeof monaco;

export class LiquidCompletion {
  private monaco: Monaco;

  constructor(monaco: Monaco) {
    this.monaco = monaco;
  }
  get completion(): monaco.languages.CompletionItemProvider {
    return {
      triggerCharacters: [".", "|", " "],
      provideCompletionItems: (model, position) => {
        const context = this.getCompletionContext(model, position);
        const word = model.getWordUntilPosition(position);
        const range: monaco.IRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        if (context.type === "tag")
          return {
            suggestions: liquidTags.map((tag) => ({
              label: tag.label,
              kind: this.monaco.languages.CompletionItemKind.Keyword,
              detail: tag.detail,
              documentation: tag.documentation,
              insertText: tag.insertText,
              insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range,
            })),
          };
        if (context.type === "object")
          return {
            suggestions: liquidObjects.map((object) => ({
              label: object.label,
              kind: this.monaco.languages.CompletionItemKind.Variable,
              detail: object.detail,
              documentation: object.documentation,
              insertText: object.label,
              range,
            })),
          };
        if (context.type === "property" && context.entityPath) {
          const properties = this.getPropertiesFromPath(context.entityPath);
          return {
            suggestions: properties.map((property) => ({
              label: property.label,
              kind: this.monaco.languages.CompletionItemKind.Property,
              detail: property.detail,
              documentation: property.documentation,
              insertText: property.label,
              range,
            })),
          };
        }
        if (context.type === "filter") {
          const filters = this.getFiltersByValueType(context.valueType, context.filterPrefix);
          return {
            suggestions: filters.map((filter) => ({
              label: filter.label,
              kind: this.monaco.languages.CompletionItemKind.Function,
              detail: filter.detail,
              documentation: filter.documentation,
              insertText: filter.insertText ?? filter.label,
              insertTextRules: filter.insertText?.includes("${")
                ? this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                : undefined,
              range,
            })),
          };
        }

        return { suggestions: [] };
      },
    };
  }

  private getCompletionContext(model: monaco.editor.ITextModel, position: monaco.Position): LiquidCompletionContext {
    const textBeforeCursor = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });

    const outputStartPosition = textBeforeCursor.lastIndexOf("{{");
    const outputEndPosition = textBeforeCursor.lastIndexOf("}}");
    const isInsideOutputDelimiter = outputStartPosition !== -1 && outputStartPosition > outputEndPosition;

    const tagStartPosition = textBeforeCursor.lastIndexOf("{%");
    const tagEndPosition = textBeforeCursor.lastIndexOf("%}");
    const isInsideTagDelimiter = tagStartPosition !== -1 && tagStartPosition > tagEndPosition;

    if (isInsideOutputDelimiter) {
      const expression = textBeforeCursor.slice(outputStartPosition + 2);
      return this.resolveCompletionContext("output", expression);
    }
    if (isInsideTagDelimiter) {
      const expression = textBeforeCursor.slice(tagStartPosition + 2);
      return this.resolveCompletionContext("tag", expression);
    }
    return { type: "unknown" };
  }

  private resolveCompletionContext(delimiterType: LiquidDelimiterType, expression: string): LiquidCompletionContext {
    const pipeEndPosition = expression.lastIndexOf("|");
    const dotEndPosition = expression.lastIndexOf(".");
    if (pipeEndPosition !== -1 && pipeEndPosition > dotEndPosition) {
      return this.resolveFilterContext(delimiterType, expression, pipeEndPosition);
    }
    const propertyMatch = expression.match(/([a-zA-Z_][\w-]*(?:\.[a-zA-Z_][\w-]*)*)\.\w*$/);
    if (propertyMatch) {
      return {
        delimiterType,
        type: "property",
        entity: propertyMatch[1],
        entityPath: propertyMatch[1].split("."),
      };
    }

    if (delimiterType === "tag") {
      const trimmedExpression = expression.trim();
      const isAtTagNamePosition = /^[a-zA-Z_]*$/.test(trimmedExpression);
      if (isAtTagNamePosition) {
        return {
          delimiterType,
          type: "tag",
        };
      }
      return this.resolveOutputValueContext(delimiterType, expression);
    }
    if (delimiterType === "output") {
      return this.resolveOutputValueContext(delimiterType, expression);
    }
    return { delimiterType, type: "unknown" };
  }

  private resolveFilterContext(
    delimiterType: LiquidDelimiterType,
    expression: string,
    pipeEndPosition: number,
  ): LiquidCompletionContext {
    const valueExpression = expression.slice(0, pipeEndPosition).trim();
    const filterExpression = expression.slice(pipeEndPosition + 1).trim();

    /**
     * Case:
     * {{ product.title | }}
     * filterExpression = ""
     *
     * Suggest filters.
     */
    if (!filterExpression) {
      const valuePath = this.extractValuePath(valueExpression);
      const valueType = valuePath ? this.getValueTypeFromPath(valuePath) : this.inferLiteralValueType(valueExpression);

      return {
        delimiterType,
        type: "filter",
        valuePath,
        valueType,
        filterPrefix: "",
      };
    }

    /**
     * Case:
     * {{ product.title | ha }}
     *
     * Suggest filters with prefix.
     */
    const isTypingFilterName = /^[a-zA-Z_][\w-]*$/.test(filterExpression);

    if (isTypingFilterName) {
      const exactFilterExists = liquidFilters.some((filter) => filter.label === filterExpression);

      /**
       * Important:
       *
       * {{ product.title | handle }}
       *
       * If filter name is complete, do not suggest filter again.
       */
      if (exactFilterExists) {
        return { delimiterType, type: "unknown" };
      }

      const valuePath = this.extractValuePath(valueExpression);
      const valueType = valuePath ? this.getValueTypeFromPath(valuePath) : this.inferLiteralValueType(valueExpression);

      return {
        delimiterType,
        type: "filter",
        valuePath,
        valueType,
        filterPrefix: filterExpression,
      };
    }

    /**
     * Case:
     * {{ 4 | divided_by: 2 }}
     *
     * Later we can suggest argument values after colon.
     * For now no suggestion.
     */
    return { delimiterType, type: "unknown" };
  }
  private resolveOutputValueContext(delimiterType: LiquidDelimiterType, expression: string): LiquidCompletionContext {
    const trimmedExpression = expression.trim();
    if (!trimmedExpression) {
      return { delimiterType, type: "object" };
    }

    /**
     * User is typing the first object:
     *
     * {{ pro }}
     *
     * But when the exact object exists:
     *
     * {{ product }}
     *
     * Then do not suggest root objects again.
     */
    const isSingleIdentifier = /^[a-zA-Z_][\w-]*$/.test(trimmedExpression);
    if (isSingleIdentifier) {
      const hasExactRootObject = liquidObjects.some((object) => object.label === trimmedExpression);
      return hasExactRootObject ? { delimiterType, type: "unknown" } : { delimiterType, type: "object" };
    }

    /**
     * Complete object/property path:
     *
     * {{ product.variant.price }}
     *
     * Do not suggest object again.
     */
    const isCompletePath = /^[a-zA-Z_][\w-]*(?:\.[a-zA-Z_][\w-]*)*$/.test(trimmedExpression);

    if (isCompletePath) {
      return { delimiterType, type: "unknown" };
    }
    return { delimiterType, type: "unknown" };
  }
  private getFiltersByValueType(valueType: LiquidValueType | undefined, filterPrefix?: string) {
    return liquidFilters.filter((filter) => {
      const matchesType = !valueType || valueType === "unknown" || filter.acceptedTypes.includes(valueType);
      const matchesPrefix = !filterPrefix || filter.label.startsWith(filterPrefix);
      return matchesType && matchesPrefix;
    });
  }

  private getPropertiesFromPath(path: string[]) {
    const [rootObjectKey, ...propertyPath] = path;
    const rootObject = liquidObjects.find((object) => object.label === rootObjectKey);
    if (!rootObject) return [];
    let currentProperties = rootObject.properties;
    for (const path of propertyPath) {
      const targetProperty = currentProperties.find((property) => property.label === path);
      if (!targetProperty?.properties) return [];
      currentProperties = targetProperty.properties;
    }
    return currentProperties;
  }

  private getValueTypeFromPath(path: string[]): LiquidValueType {
    /**
     * Root object:
     *
     * product
     */
    if (path.length === 1) {
      const rootObject = liquidObjects.find((object) => object.label === path[0]);
      return rootObject?.type ?? "unknown";
    }

    /**
     * Property:
     *
     * product.title
     * product.variant.price
     */
    const property = this.getPropertyFromPath(path);

    return property?.type ?? "unknown";
  }

  private getPropertyFromPath(path: string[]) {
    const [rootObjectKey, ...propertyPath] = path;
    const rootObject = liquidObjects.find((object) => object.label === rootObjectKey);
    if (!rootObject) return undefined;

    let currentProperties = rootObject.properties;
    let currentProperty;

    for (const path of propertyPath) {
      currentProperty = currentProperties.find((property) => property.label === path);
      if (!currentProperty) return undefined;
      currentProperties = currentProperty.properties ?? [];
    }
    return currentProperty;
  }

  private inferLiteralValueType(valueExpression: string): LiquidValueType {
    const trimmedValueExpression = valueExpression.trim();
    if (/^\d+(\.\d+)?$/.test(trimmedValueExpression)) {
      return "number";
    }
    if (/^"([^"\\]|\\.)*"$/.test(trimmedValueExpression) || /^'([^'\\]|\\.)*'$/.test(trimmedValueExpression)) {
      return "string";
    }
    if (/^(true|false)$/.test(trimmedValueExpression)) {
      return "boolean";
    }
    return "unknown";
  }
  private extractValuePath(valueExpression: string): string[] | undefined {
    const trimmedValueExpression = valueExpression.trim();
    const isPath = /^[a-zA-Z_][\w-]*(?:\.[a-zA-Z_][\w-]*)*$/.test(trimmedValueExpression);
    if (!isPath) return undefined;
    return trimmedValueExpression.split(".");
  }
}
