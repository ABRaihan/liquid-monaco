type LiquidTag = {
  label: string;
  detail?: string;
  documentation?: string;
  insertText: string;
};

export const liquidTags: LiquidTag[] = [
  {
    label: "if",
    detail: "Liquid conditional tag",
    documentation: "Creates an if block.",
    insertText: "if ${1:condition} %}\n  $0\n{% endif",
  },
  {
    label: "for",
    detail: "Liquid loop tag",
    documentation: "Creates a for loop.",
    insertText: "for ${1:item} in ${2:collection} %}\n  $0\n{% endfor",
  },
  {
    label: "case",
    detail: "Liquid case tag",
    documentation: "Creates a case block.",
    insertText: "case ${1:value} %}\n{% when ${2:condition} %}\n  $0\n{% endcase",
  },
  {
    label: "else",
    detail: "Liquid else tag",
    documentation: "Adds an else branch.",
    insertText: "else",
  },
];
