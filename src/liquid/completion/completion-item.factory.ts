import * as monaco from "monaco-editor";
import type { LiquidFilter } from "../filter/filter.types";
import type { LiquidObject, LiquidProperty } from "../object";
import type { LiquidTag } from "../tag/tag.types";
import type { LiquidVariableSymbol } from "./completion.types";

type Monaco = typeof monaco;

export class LiquidCompletionItemFactory {
  private readonly monacoInstance: Monaco;

  constructor(monacoInstance: Monaco) {
    this.monacoInstance = monacoInstance;
  }

  createObjectItems(objects: LiquidObject[], range: monaco.IRange): monaco.languages.CompletionItem[] {
    return objects.map((object) => ({
      label: object.label,
      kind: this.monacoInstance.languages.CompletionItemKind.Variable,
      detail: object.detail,
      documentation: object.documentation,
      insertText: object.label,
      range,
    }));
  }

  createVariableItems(variables: LiquidVariableSymbol[], range: monaco.IRange): monaco.languages.CompletionItem[] {
    return variables.map((variable) => ({
      label: variable.label,
      kind: this.monacoInstance.languages.CompletionItemKind.Variable,
      detail: `Assigned variable (${variable.type})`,
      insertText: variable.label,
      range,
    }));
  }

  createPropertyItems(properties: LiquidProperty[], range: monaco.IRange): monaco.languages.CompletionItem[] {
    return properties.map((property) => ({
      label: property.label,
      kind: this.monacoInstance.languages.CompletionItemKind.Property,
      detail: property.detail,
      documentation: property.documentation,
      insertText: property.label,
      range,
    }));
  }

  createFilterItems(filters: LiquidFilter[], range: monaco.IRange): monaco.languages.CompletionItem[] {
    return filters.map((filter) => ({
      label: filter.label,
      kind: this.monacoInstance.languages.CompletionItemKind.Function,
      detail: filter.detail,
      documentation: filter.documentation,
      insertText: filter.insertText ?? filter.label,
      insertTextRules: this.getInsertTextRules(filter.insertText),
      range,
    }));
  }

  createTagItems(tags: LiquidTag[], range: monaco.IRange): monaco.languages.CompletionItem[] {
    return tags.map((tag) => ({
      label: tag.label,
      kind: this.monacoInstance.languages.CompletionItemKind.Keyword,
      detail: tag.detail,
      documentation: tag.documentation,
      insertText: tag.insertText,
      insertTextRules: this.getInsertTextRules(tag.insertText),
      range,
    }));
  }

  private getInsertTextRules(insertText: string | undefined): monaco.languages.CompletionItemInsertTextRule | undefined {
    if (!insertText?.includes("${") && !insertText?.includes("$0")) return undefined;

    return this.monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet;
  }
}
