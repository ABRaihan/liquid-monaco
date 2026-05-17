import type { LiquidTag } from "./tag.types";

export const themeTags: LiquidTag[] = [
  {
    label: "layout",
    detail: "{% layout name %}",
    documentation: "Specify which layout to use.",
    insertText: " layout $0",
  },
  {
    label: "render",
    detail: "{% render 'filename' %}",
    documentation: "Renders a snippet or app block.",
    insertText: " render $0",
  },
];
