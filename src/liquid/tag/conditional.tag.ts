import type { LiquidTag } from "./tag.types";

export const conditionalTags: LiquidTag[] = [
  {
    label: "case",
    detail: "Liquid case tag",
    documentation: "Renders a specific expression depending on the value of a specific variable.",
    insertText:
      " case ${1:variable} %}\n\t{% when ${2:first_value} %}\n\n\t{% when ${3:second_value} %}\n\n\t{% else %}\n  $0\n{% endcase",
  },
  {
    label: "else",
    detail: "Liquid else tag",
    documentation: "Allows you to specify a default expression to execute when no other condition is met.",
    insertText: "else",
  },
  {
    label: "if",
    detail: "Liquid conditional tag",
    documentation: "Renders an expression if a specific condition is true.",
    insertText: "if ${1:condition} %}\n  $0\n{% endif",
  },
  {
    label: "unless",
    detail: "Liquid unless tag",
    documentation: "Renders an expression unless a specific condition is true.",
    insertText: " unless ${1:condition} %}\n  $0\n{% endunless ",
  },
];
