import type * as monaco from "monaco-editor";
import { LIQUID_LANGUAGE_ID } from "../constants";
import { formatLiquidDocument } from "./liquid-document.formatter";
import { resolveLiquidFormatterOptions } from "./liquid-format.types";

type Monaco = typeof monaco;

const registeredFormatterInstances = new WeakSet<Monaco>();

export function registerLiquidFormatter(monacoInstance: Monaco): monaco.IDisposable {
  if (registeredFormatterInstances.has(monacoInstance)) {
    return { dispose: () => {} };
  }

  registeredFormatterInstances.add(monacoInstance);

  return monacoInstance.languages.registerDocumentFormattingEditProvider(LIQUID_LANGUAGE_ID, {
    provideDocumentFormattingEdits(model, options) {
      const formattedText = formatLiquidDocument(model.getValue(), resolveLiquidFormatterOptions(options));

      if (formattedText === model.getValue()) return [];

      return [
        {
          range: model.getFullModelRange(),
          text: formattedText,
        },
      ];
    },
  });
}
