import type { LiquidTag } from "./tag.types";

export const syntaxTags: LiquidTag[] = [
  {
    label: "comment",
    detail: "Liquid comment tag",
    documentation:
      "Prevents an expression from being rendered or output. Any text inside comment tags won't be output, and any Liquid code will be parsed, but not executed.",
    insertText: " comment %}\n $0\n{% endcomment ",
  },
  {
    label: "echo",
    detail: "Liquid echo tag",
    documentation: "Outputs an expression.",
    insertText: " echo ${0} ",
  },
  {
    label: "liquid",
    detail: "Liquid tag",
    documentation:
      "Allows you to have a block of Liquid without delimeters on each tag. Because the tags don't have delimeters, each tag needs to be on its own line.",
    insertText: " liquid \n $0\n",
  },
  {
    label: "raw",
    detail: "Outputs any Liquid code as text instead of rendering it.",
    documentation: "Outputs any Liquid code as text instead of rendering it.",
    insertText: " raw %}\n  $0\n{% endraw ",
  },
];
