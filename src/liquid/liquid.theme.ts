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
      base: "vs",
      inherit: true,
      colors: {},
      rules: [
        { token: "delimiter.liquid", foreground: "#0037F3" },
        { token: "object.liquid", foreground: "#0037F3" },
        { token: "property.liquid", foreground: "#001872" },
        { token: "filter.liquid", foreground: "#70552A" },
        { token: "tag.liquid", foreground: "#740009" },
        { token: "tag.delimiter.liquid", foreground: "#A41CD1" },
        { token: "number.liquid", foreground: "#1F8058" },
        { token: "string.liquid", foreground: "#740009" },
        { token: "comment.liquid", foreground: "#107418" },
        { token: "operator.liquid", foreground: "#FD3E49" },
        { token: "variable.liquid", foreground: "#001872" },
      ],
    });
  }
}
