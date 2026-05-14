import * as monaco from "monaco-editor";

export const liquidTokenizer: monaco.languages.IMonarchLanguage = {
  tokenizer: {
    root: [
      [/\{%\s*comment\s*%\}/, { token: "comment.liquid", next: "@commentState" }],
      [/\{%\s*stylesheet\s*%\}/, { token: "tag.liquid", next: "@stylesheetState", nextEmbedded: "css" }],
      [/\{\{/, { token: "delimiter.liquid", next: "@outputState" }],
      [/\{%/, { token: "delimiter.liquid", next: "@tagState" }],
      [/<script\b[^>]*>/, { token: "tag.html", next: "@scriptState", nextEmbedded: "text/javascript" }],
      [/<\/?[a-zA-Z0-9]+\b[^>]*>/, "tag.html"],
      [/[^<{}%]+/, ""],
    ],
    commentState: [
      [/\{%\s*comment\s*%\}/, { token: "comment.liquid", next: "@push" }],
      [/\{%\s*endcomment\s*%\}/, { token: "comment.liquid", next: "@pop" }],
      [/[^{%]+/, "comment.liquid"], // skip single text and capture block text for performance
      [/./, "comment.liquid"],
    ],
    scriptState: [
      [/<\/script\s*>/, { token: "tag.html", next: "@pop", nextEmbedded: "@pop" }],
      [/./, ""], // Embedded JS Engine handle from here
    ],
    stylesheetState: [
      [/\{%\s*endstylesheet\s*%\}/, { token: "tag.liquid", next: "@pop", nextEmbedded: "@pop" }],
      [/./, ""], // Embedded CSS Engine handle from here
    ],
    tagState: [
      [/%\}/, { token: "delimiter.liquid", next: "@pop" }],
      [/\b(if|endif|for|in|endfor|unless|endunless|case|endcase|when)\b/, "tag.delimiter.liquid"],
      [/\bassign\b/, "tag.liquid"],
      [/\b\d+\b/, "number.liquid"],
      [/[><]=?|==|!=/, "operator.liquid"],
      [/=/, "operator.assign.liquid"],
      [/[a-zA-Z_]\w*/, "variable.liquid"],
      [/[ \t\r\n]+/, ""],
    ],
    outputState: [
      [/\}\}/, { token: "delimiter.liquid", next: "@pop" }],
      [/\s+/, "whitespace.liquid"],
      [/[a-zA-Z_]\w*/, "object.liquid"],
      [/\b\d+(\.\d+)?\b/, "number.liquid"],
      [/(\.)(\w+)/, ["delimiter.separator.liquid", "property.liquid"]],
      [/\|/, { token: "operator.pipe.liquid", next: "@filterState" }],
    ],
    filterState: [
      [/\s+/, "whitespace.liquid"],
      [/\b\d+(\.\d+)?\b/, "number.liquid"],
      [/[a-zA-Z_]\w*:?/, "filter.liquid"],
      [/\}\}/, { token: "delimiter.liquid", next: "@popall" }],
    ],
  },
};
