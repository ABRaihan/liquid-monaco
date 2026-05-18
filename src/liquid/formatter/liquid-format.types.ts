import type * as monaco from "monaco-editor";

export type LiquidFormatterOptions = {
  tabSize: number;
  insertSpaces: boolean;
  indentUnit: string;
};

export function resolveLiquidFormatterOptions(
  options: monaco.languages.FormattingOptions | undefined,
): LiquidFormatterOptions {
  const tabSize = options?.tabSize && options.tabSize > 0 ? options.tabSize : 2;
  const insertSpaces = options?.insertSpaces ?? true;

  return {
    tabSize,
    insertSpaces,
    indentUnit: insertSpaces ? " ".repeat(tabSize) : "\t",
  };
}

export function indentText(level: number, options: LiquidFormatterOptions): string {
  return options.indentUnit.repeat(Math.max(level, 0));
}
