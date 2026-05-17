import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { LIQUID_LANGUAGE_ID, LIQUID_THEME_ID, LiquidLanguage, LiquidTheme } from "./liquid";
type Monaco = typeof monaco;

function App() {
  const handleBeforeMount = (monaco: Monaco) => {
    new LiquidTheme(monaco).register();
    new LiquidLanguage(monaco).register();
  };

  return (
    <Editor
      height="100dvh"
      language={LIQUID_LANGUAGE_ID}
      theme={LIQUID_THEME_ID}
      defaultValue="{%  %}"
      options={{
        automaticLayout: true,
      }}
      beforeMount={handleBeforeMount}
    />
  );
}

export default App;
