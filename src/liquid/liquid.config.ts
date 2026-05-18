import * as monaco from "monaco-editor";

export const liquidConfiguration: monaco.languages.LanguageConfiguration = {
  comments: {
    blockComment: ["{% comment %}", "{% endcomment %}"],
  },
  brackets: [
    ["{", "}"],
    ["{{", "}}"],
    ["{%", "%}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "'", close: "'" },
    { open: '"', close: '"' },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "{{", close: "}}" },
    { open: "{%", close: "%}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "'", close: "'" },
    { open: '"', close: '"' },
  ],
};
