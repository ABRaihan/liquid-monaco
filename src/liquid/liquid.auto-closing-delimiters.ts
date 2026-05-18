import * as monaco from "monaco-editor";
import { LIQUID_LANGUAGE_ID } from "./constants";

type Monaco = typeof monaco;

type LiquidOpeningDelimiter = "{{" | "{%";
type LiquidClosingDelimiter = "}}" | "%}";

type LiquidDelimiterPair = {
  open: LiquidOpeningDelimiter;
  close: LiquidClosingDelimiter;
};

type LiquidDelimiterTransform = {
  range: monaco.IRange;
  text: string;
  cursorColumn: number;
};

const OUTPUT_DELIMITER: LiquidDelimiterPair = { open: "{{", close: "}}" };
const TAG_DELIMITER: LiquidDelimiterPair = { open: "{%", close: "%}" };

const registeredMonacoInstances = new WeakSet<Monaco>();

export function registerLiquidAutoClosingDelimiters(monacoInstance: Monaco): void {
  if (registeredMonacoInstances.has(monacoInstance)) return;

  registeredMonacoInstances.add(monacoInstance);

  monacoInstance.editor.onDidCreateEditor((editor) => {
    new LiquidAutoClosingDelimiterContribution(monacoInstance, editor);
  });
}

class LiquidAutoClosingDelimiterContribution {
  private readonly editor: monaco.editor.ICodeEditor;
  private readonly monacoInstance: Monaco;
  private isApplyingEdit = false;

  constructor(monacoInstance: Monaco, editor: monaco.editor.ICodeEditor) {
    this.monacoInstance = monacoInstance;
    this.editor = editor;

    this.editor.onDidChangeModelContent((event) => {
      this.handleModelContentChange(event);
    });
  }

  private handleModelContentChange(event: monaco.editor.IModelContentChangedEvent): void {
    if (this.isApplyingEdit || !this.isLiquidDelimiterTypingEvent(event)) return;

    const model = this.editor.getModel();
    if (!model || model.getLanguageId() !== LIQUID_LANGUAGE_ID) return;

    const selections = this.editor.getSelections();
    if (!selections?.length || selections.some((selection) => !selection.isEmpty())) return;

    const edits: monaco.editor.IIdentifiedSingleEditOperation[] = [];
    const nextSelections: monaco.Selection[] = [];

    for (const selection of selections) {
      const transform = this.getDelimiterTransform(model, selection.getPosition());
      if (!transform) return;

      edits.push({
        range: transform.range,
        text: transform.text,
      });
      nextSelections.push(
        new this.monacoInstance.Selection(
          transform.range.startLineNumber,
          transform.cursorColumn,
          transform.range.startLineNumber,
          transform.cursorColumn,
        ),
      );
    }

    this.isApplyingEdit = true;
    this.editor.executeEdits("liquid-auto-closing-delimiters", edits, nextSelections);
    this.isApplyingEdit = false;
  }

  private isLiquidDelimiterTypingEvent(event: monaco.editor.IModelContentChangedEvent): boolean {
    if (event.isFlush || event.changes.length === 0) return false;

    const typedText = event.changes[0].text;
    if (typedText !== "{}" && typedText !== "{" && typedText !== "%") return false;

    return event.changes.every((change) => change.text === typedText && change.rangeLength === 0);
  }

  private getDelimiterTransform(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
  ): LiquidDelimiterTransform | undefined {
    if (this.hasOpeningDelimiterBeforeCursor(model, position, OUTPUT_DELIMITER.open)) {
      return this.getOutputDelimiterTransform(model, position);
    }

    if (this.hasOpeningDelimiterBeforeCursor(model, position, TAG_DELIMITER.open)) {
      return this.getTagDelimiterTransform(model, position);
    }

    return undefined;
  }

  private getOutputDelimiterTransform(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
  ): LiquidDelimiterTransform | undefined {
    const closingLength = this.getClosingLengthAfterCursor(model, position, OUTPUT_DELIMITER.close);
    if (!closingLength) return undefined;

    const startColumn = position.column - OUTPUT_DELIMITER.open.length;
    const endColumn = position.column + closingLength;

    return {
      range: new this.monacoInstance.Range(position.lineNumber, startColumn, position.lineNumber, endColumn),
      text: "{{  }}",
      cursorColumn: startColumn + 3,
    };
  }

  private getTagDelimiterTransform(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
  ): LiquidDelimiterTransform | undefined {
    const closingLength = this.getClosingLengthAfterCursor(model, position, "}");
    if (!closingLength) return undefined;

    const startColumn = position.column - TAG_DELIMITER.open.length;
    const endColumn = position.column + closingLength;

    return {
      range: new this.monacoInstance.Range(position.lineNumber, startColumn, position.lineNumber, endColumn),
      text: "{%  %}",
      cursorColumn: startColumn + 3,
    };
  }

  private hasOpeningDelimiterBeforeCursor(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
    openingDelimiter: LiquidOpeningDelimiter,
  ): boolean {
    const startColumn = position.column - openingDelimiter.length;
    if (startColumn < 1) return false;

    return (
      model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      }) === openingDelimiter
    );
  }

  private getClosingLengthAfterCursor(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
    preferredClosingDelimiter: LiquidClosingDelimiter | "}",
  ): number | undefined {
    const lineRest = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: position.column,
      endLineNumber: position.lineNumber,
      endColumn: model.getLineMaxColumn(position.lineNumber),
    });

    if (lineRest.startsWith(preferredClosingDelimiter)) return preferredClosingDelimiter.length;
    if (lineRest.startsWith("}")) return 1;

    return undefined;
  }
}
