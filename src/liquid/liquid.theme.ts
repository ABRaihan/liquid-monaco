import * as monaco from "monaco-editor";
import { LIQUID_THEME_ID } from "./constants";
type Monaco = typeof monaco;

export class LiquidTheme {
  private monaco: Monaco;
  constructor(monaco: Monaco) {
    this.monaco = monaco;
  }
  register() {
    this.monaco.editor.defineTheme(LIQUID_THEME_ID, {
      base: "vs-dark",
      inherit: true,
      colors: {},
      rules: [
        { token: "delimiter.liquid", foreground: "#FBCC2F" },
        { token: "object.liquid", foreground: "#4C90C9" },
        { token: "property.liquid", foreground: "#CECECE" },
        { token: "filter.liquid", foreground: "#CECECE" },
        { token: "tag.liquid", foreground: "#4C90C9" },
        { token: "tag.delimiter.liquid", foreground: "#4D93CD" },
        { token: "number.liquid", foreground: "#ADC7A0" },
        { token: "string.liquid", foreground: "#C7856F" },
        { token: "comment.liquid", foreground: "#608D4F" },
        { token: "operator.liquid", foreground: "#B2121B" },
        { token: "variable.liquid", foreground: "#C3C3C3" },
      ],
    });
  }
}
