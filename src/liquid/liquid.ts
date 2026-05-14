import * as monaco from "monaco-editor";
import { LIQUID_LANGUAGE_ID } from "./constants";
import { LiquidCompletion } from "./liquid.completion";
import { liquidConfiguration } from "./liquid.config";
import { liquidTokenizer } from "./liquid.monarch";
type Monaco = typeof monaco;

export class LiquidLanguage {
  private monaco: Monaco;

  constructor(monaco: Monaco) {
    this.monaco = monaco;
  }
  register() {
    if (!this.monaco.languages.getLanguages().some((lang) => lang.id === LIQUID_LANGUAGE_ID)) {
      this.monaco.languages.register({
        id: LIQUID_LANGUAGE_ID,
        extensions: [".liquid"],
        aliases: ["Soppiya Liquid"],
        mimetypes: ["text/x-soppiya-liquid"],
      });
    }
    this.monaco.languages.setMonarchTokensProvider(LIQUID_LANGUAGE_ID, liquidTokenizer);
    this.monaco.languages.registerCompletionItemProvider(
      LIQUID_LANGUAGE_ID,
      new LiquidCompletion(this.monaco).completion,
    );
    this.monaco.languages.setLanguageConfiguration(LIQUID_LANGUAGE_ID, liquidConfiguration);
  }
}
