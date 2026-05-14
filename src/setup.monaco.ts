import { loader } from "@monaco-editor/react";

import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
type Monaco = typeof monaco;

import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";

import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";

import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";

import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

import { LiquidLanguage, LiquidTheme } from "./liquid";

self.MonacoEnvironment = {
  getWorker(_: unknown, label: string) {
    switch (label) {
      case "json":
        return new jsonWorker();

      case "css":
      case "scss":
      case "less":
        return new cssWorker();

      case "html":
      case "handlebars":
      case "razor":
        return new htmlWorker();

      case "typescript":
      case "javascript":
        return new tsWorker();

      default:
        return new editorWorker();
    }
  },
};

loader.config({ monaco });

export class MonacoEditor {
  constructor() {}
  async init(): Promise<Monaco> {
    const monaco = await loader.init();
    new LiquidTheme(monaco).register();
    new LiquidLanguage(monaco).register();
    return monaco;
  }
}
