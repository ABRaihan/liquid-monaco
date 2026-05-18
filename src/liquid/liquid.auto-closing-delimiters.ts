import * as monaco from "monaco-editor";
import { LIQUID_LANGUAGE_ID } from "./constants";

type Monaco = typeof monaco;

type LiquidDelimiterPair = {
  open: "{{" | "{%";
  close: "}}" | "%}";
};

const LIQUID_AUTO_CLOSING_DELIMITERS: LiquidDelimiterPair[] = [
  { open: "{{", close: "}}" },
  { open: "{%", close: "%}" },
];

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

  constructor(
    monacoInstance: Monaco,
    editor: monaco.editor.ICodeEditor,
  ) {
    this.monacoInstance = monacoInstance;
    this.editor = editor;

    this.editor.onDidChangeModelContent((event) => {
      this.handleModelContentChange(event);
    });
  }

  private handleModelContentChange(event: monaco.editor.IModelContentChangedEvent): void {
    const typedText = this.getSingleTypedDelimiterCharacter(event);
    if (this.isApplyingEdit || !typedText) return;

    const model = this.editor.getModel();
    if (!model || model.getLanguageId() !== LIQUID_LANGUAGE_ID) return;

    const selections = this.editor.getSelections();
    if (!selections?.length || selections.some((selection) => !selection.isEmpty())) return;

    const delimiterPair = this.getTypedDelimiterPair(model, selections[0].getPosition(), typedText);
    if (!delimiterPair) return;

    const edits: monaco.editor.IIdentifiedSingleEditOperation[] = [];
    const nextSelections: monaco.Selection[] = [];

    for (const selection of selections) {
      const position = selection.getPosition();
      const pairAtCursor = this.getTypedDelimiterPair(model, position, typedText);
      if (!pairAtCursor || pairAtCursor.open !== delimiterPair.open) return;
      if (this.hasExistingClosingDelimiter(model, position, pairAtCursor.close)) return;

      edits.push({
        range: new this.monacoInstance.Range(position.lineNumber, position.column, position.lineNumber, position.column),
        text: `  ${pairAtCursor.close}`,
      });
      nextSelections.push(
        new this.monacoInstance.Selection(
          position.lineNumber,
          position.column + 1,
          position.lineNumber,
          position.column + 1,
        ),
      );
    }

    this.isApplyingEdit = true;
    this.editor.executeEdits("liquid-auto-closing-delimiters", edits, nextSelections);
    this.isApplyingEdit = false;
  }

  private getSingleTypedDelimiterCharacter(event: monaco.editor.IModelContentChangedEvent): "{" | "%" | undefined {
    if (event.isFlush || event.changes.length === 0) return undefined;

    const typedText = event.changes[0].text;
    if (typedText !== "{" && typedText !== "%") return undefined;

    const isSimpleTyping = event.changes.every((change) => change.text === typedText && change.rangeLength === 0);

    return isSimpleTyping ? typedText : undefined;
  }

  private getTypedDelimiterPair(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
    typedText: string,
  ): LiquidDelimiterPair | undefined {
    const candidates = LIQUID_AUTO_CLOSING_DELIMITERS.filter((pair) => pair.open.endsWith(typedText));

    return candidates.find((pair) => {
      const startColumn = position.column - pair.open.length;
      if (startColumn < 1) return false;

      return (
        model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        }) === pair.open
      );
    });
  }

  private hasExistingClosingDelimiter(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
    closingDelimiter: string,
  ): boolean {
    const lineRest = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: position.column,
      endLineNumber: position.lineNumber,
      endColumn: model.getLineMaxColumn(position.lineNumber),
    });

    return lineRest.startsWith(closingDelimiter) || lineRest.startsWith(` ${closingDelimiter}`);
  }
}
