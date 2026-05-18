import * as monaco from "monaco-editor";

export const liquidTokenizer: monaco.languages.IMonarchLanguage = {
  tokenizer: {
    root: [
      // 1. Liquid Blocks & Comments
      [/\{%\s*comment\s*%\}/, { token: "comment.liquid", next: "@commentState" }],
      [/\{%\s*stylesheet\s*%\}/, { token: "tag.liquid", next: "@stylesheetState", nextEmbedded: "css" }],

      // 2. Liquid Delimiters
      [/\{\{/, { token: "delimiter.liquid", next: "@outputState" }],
      [/\{%/, { token: "delimiter.liquid", next: "@tagState" }],

      // [/<script\b[^>]*>/, { token: "tag.html", next: "@scriptState", nextEmbedded: "text/javascript" }],
      // [/<([a-zA-Z0-9]+)\b[^>]*>/, { token: "@rematch", next: "@htmlState", nextEmbedded: "text/html" }],
      // [/[^<{}%]+/, ""],
      // 3. HTML Tags (Manually tokenized so they don't break the stack)
      [/<\/?[a-zA-Z0-9:-]+/, { token: "tag.html", next: "@htmlTagState" }],
      [/<!--/, { token: "comment.html", next: "@htmlCommentState" }],

      // 4. Strings and text fallbacks
      [/[^<{%\s]+/, "html"],
      [/\s+/, "html"],
    ],
    commentState: [
      [/\{%\s*comment\s*%\}/, { token: "comment.liquid", next: "@push" }],
      [/\{%\s*endcomment\s*%\}/, { token: "comment.liquid", next: "@pop" }],
      [/[^{%]+/, "comment.liquid"], // skip single text and capture block text for performance
      [/./, "comment.liquid"],
    ],
    htmlTagState: [
      [/>/, { token: "tag.html", next: "@pop" }],
      [/\{\{/, { token: "delimiter.liquid", next: "@outputState" }], // Allows Liquid inside HTML attributes
      [/\{%/, { token: "delimiter.liquid", next: "@tagState" }],
      [/[ \t\r\n]+/, ""],
      [/["']/, { token: "string.html", next: "@htmlStringState" }],
      [/[a-zA-Z0-9:-]+/, "attribute.name.html"],
      [/=/, "delimiter.html"],
    ],
    htmlStringState: [
      [/["']/, { token: "string.html", next: "@pop" }],
      [/\{\{/, { token: "delimiter.liquid", next: "@outputState" }], // Allows Liquid inside strings
      [/[^"'{}]+/, "string.html"],
      [/./, "string.html"],
    ],
    htmlCommentState: [
      [/-->/, { token: "comment.html", next: "@pop" }],
      [/./, "comment.html"],
    ],
    scriptState: [
      [/<\/script\s*>/, { token: "tag.html", next: "@pop", nextEmbedded: "@pop" }],
      [/./, ""],
    ],
    stylesheetState: [
      [/\{%\s*endstylesheet\s*%\}/, { token: "tag.liquid", next: "@pop", nextEmbedded: "@pop" }],
      [/./, ""],
    ],
    tagState: [
      [/%\}/, { token: "delimiter.liquid", next: "@pop" }],
      [
        /\b(case|endcase|when|else|if|endif|unless|endunless|break|continue|cycle|for|in|endfor|liquid|capture|endcapture)\b/,
        "tag.delimiter.liquid",
      ],
      [/\b(assign|echo|layout|raw|endraw|layout|render)\b/, "tag.liquid"],
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
