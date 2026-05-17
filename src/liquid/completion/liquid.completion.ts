import * as monaco from "monaco-editor";
import { liquidFilters } from "../filter";
import { liquidObjects } from "../object";
import { liquidTags } from "../tag";
import type { LiquidCompletionData } from "./completion.types";
import { LiquidCompletionItemFactory } from "./completion-item.factory";
import { LiquidCompletionContextResolver } from "./context.resolver.completion";
import { LiquidCompletionCatalog } from "./liquid-catalog.completion";
import { LiquidRegionResolver } from "./liquid-region.resolver.completion";
import { LiquidTypeResolver } from "./type-inference.completion";
import { LiquidVariableScopeResolver } from "./variable-scope.completion";

type Monaco = typeof monaco;

export class LiquidCompletion {
  private readonly catalog: LiquidCompletionCatalog;
  private readonly contextResolver: LiquidCompletionContextResolver;
  private readonly itemFactory: LiquidCompletionItemFactory;
  private readonly regionResolver = new LiquidRegionResolver();
  private readonly variableScopeResolver: LiquidVariableScopeResolver;

  constructor(monacoInstance: Monaco, data: LiquidCompletionData = defaultCompletionData) {
    this.catalog = new LiquidCompletionCatalog(data);

    const typeResolver = new LiquidTypeResolver(this.catalog);
    this.contextResolver = new LiquidCompletionContextResolver(this.catalog, typeResolver);
    this.itemFactory = new LiquidCompletionItemFactory(monacoInstance);
    this.variableScopeResolver = new LiquidVariableScopeResolver(typeResolver);
  }

  get completion(): monaco.languages.CompletionItemProvider {
    return {
      triggerCharacters: [".", "|", " ", "="],
      provideCompletionItems: (model, position) => {
        const offset = model.getOffsetAt(position);
        const text = model.getValue();
        const liquidExpression = this.regionResolver.resolve(text, offset);

        if (!liquidExpression) return { suggestions: [] };

        const variables = this.variableScopeResolver.resolveVariables(text.slice(0, liquidExpression.expressionStartOffset));
        const context = this.contextResolver.resolve(liquidExpression.mode, liquidExpression.expression, variables);
        const range = this.getReplacementRange(model, position);

        switch (context.type) {
          case "tag":
            return { suggestions: this.itemFactory.createTagItems(this.catalog.tags, range) };
          case "root-value":
            return {
              suggestions: [
                ...this.itemFactory.createObjectItems(this.catalog.objects, range),
                ...this.itemFactory.createVariableItems(
                  variables.filter((variable) => !this.catalog.getObject(variable.label)),
                  range,
                ),
              ],
            };
          case "property":
            return { suggestions: this.itemFactory.createPropertyItems(this.catalog.getPropertiesFromPath(context.path), range) };
          case "filter":
            return {
              suggestions: this.itemFactory.createFilterItems(
                this.catalog.getFiltersByValueType(context.valueType, context.prefix),
                range,
              ),
            };
          case "unknown":
            return { suggestions: [] };
        }
      },
    };
  }

  private getReplacementRange(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
  ): monaco.IRange {
    const word = model.getWordUntilPosition(position);

    return {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };
  }
}

const defaultCompletionData: LiquidCompletionData = {
  objects: liquidObjects,
  filters: liquidFilters,
  tags: liquidTags,
};
