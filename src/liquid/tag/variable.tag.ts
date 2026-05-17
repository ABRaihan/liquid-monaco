import type { LiquidTag } from "./tag.types";

export const variableTags: LiquidTag[] = [
  {
    label: "assign",
    detail: "{% assign variable_name = value %}",
    documentation: "Creates a new variable.",
    insertText: " assign ${1:variable_name} = ${2:value}",
  },
  {
    label: "render",
    detail: "{% render 'filename' %}",
    documentation: "Renders a snippet or app block.",
    insertText: " render $0",
  },
  {
    label: "capture",
    detail: "Creates a new variable with a string value.",
    documentation: "You can create complex strings with Liquid logic and variables.",
    insertText: " capture ${1:variable} %}\n  $0\n{% endcapture ",
  },
  {
    label: "decrement",
    detail: "Creates a new variable, with a default value of -1, that's decreased by 1 with each subsequent call.",
    documentation:
      "Creates a new variable, with a default value of -1, that's decreased by 1 with each subsequent call.",
    insertText: "decrement ${1:variable_name}",
  },
  {
    label: "increment",
    detail: "Creates a new variable, with a default value of 0, that's increased by 1 with each subsequent call.",
    documentation:
      "Creates a new variable, with a default value of 0, that's increased by 1 with each subsequent call.",
    insertText: "increment ${1:variable_name}",
  },
];
