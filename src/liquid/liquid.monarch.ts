import * as monaco from "monaco-editor";

export const liquidTokenizer: monaco.languages.IMonarchLanguage = {
  tokenizer: {
    root: [
      [/\{%\s*comment\s*%\}/, { token: "comment.liquid", next: "@commentState" }],
      [/\{%\s*stylesheet\s*%\}/, { token: "tag.liquid", next: "@stylesheetState", nextEmbedded: "css" }],
      [/\{\{/, { token: "delimiter.liquid", next: "@outputState" }],
      [/\{%/, { token: "delimiter.liquid", next: "@tagState" }],
      [/<!doctype\s+/i, { token: "tag.html", next: "@doctypeState" }],
      [/<script\b[^>]*>/, { token: "tag.html", next: "@scriptState", nextEmbedded: "text/javascript" }],
      [/./, { token: "", next: "@htmlState", nextEmbedded: "text/html" }],
      // [/[^<{}%]+/, ""],
    ],
    commentState: [
      [/\{%\s*comment\s*%\}/, { token: "comment.liquid", next: "@push" }],
      [/\{%\s*endcomment\s*%\}/, { token: "comment.liquid", next: "@pop" }],
      [/[^{%]+/, "comment.liquid"], // skip single text and capture block text for performance
      [/./, "comment.liquid"],
    ],
    doctypeState: [
      [/\bhtml\b/i, { token: "attribute.name.html" }],
      [/>/, { token: "tag.html", next: "@htmlState", nextEmbedded: "text/html" }],
      [/[^>]+/, ""], // Handle extra attributes or whitespace inside the doctype zone safely
    ],
    htmlState: [
      [/<!doctype\s+html[^>]*>/i, { token: "tag.html" }],
      [/\{%\s*comment\s*%\}/, { token: "comment.liquid", next: "@commentState", nextEmbedded: "@pop" }],
      [/\{\{/, { token: "delimiter.liquid", next: "@outputState", nextEmbedded: "@pop" }],
      [/\{%/, { token: "delimiter.liquid", next: "@tagState", nextEmbedded: "@pop" }],
      // Otherwise, let the HTML engine handle everything (attributes, tags, doctype)
      [/./, ""],
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
      [
        /\b(case|endcase|when|else|if|endif|unless|endunless|break|continue|cycle|for|in|endfor|liquid|capture|endcapture)\b/,
        "tag.delimiter.liquid",
      ],
      [/\b(assign|echo|layout|raw|endraw)\b/, "tag.liquid"],
      [/\b\d+\b/, "number.liquid"],
      [/"/, "string.liquid"],
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
