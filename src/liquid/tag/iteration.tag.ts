import type { LiquidTag } from "./tag.types";

export const iterationTags: LiquidTag[] = [
  {
    label: "break",
    detail: "Liquid break tag",
    documentation: "Stops a for loop from iterating.",
    insertText: " break ",
  },
  {
    label: "continue",
    detail: "Liquid continue tag",
    documentation: "Causes a for loop to skip to the next iteration.",
    insertText: " continue ",
  },
  {
    label: "cycle",
    detail: "Liquid cycle tag",
    documentation:
      "Loops through a group of strings and outputs them one at a time for each iteration of a for loop. The cycle tag must be used inside a for loop.",
    insertText: ' cycle "${1}", "${2}" ',
  },
  {
    label: "for",
    detail: "Liquid for tag",
    documentation: "Renders an expression for every item in an array.",
    insertText: " for ${1:variant} in ${2:array} %}\n  $0\n{% endfor ",
  },
];
