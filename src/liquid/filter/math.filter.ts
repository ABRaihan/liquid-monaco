import type { LiquidFilter } from "./filter.types";

export const mathFilters: LiquidFilter[] = [
  {
    label: "abs",
    detail: "number | abs",
    acceptedTypes: ["number"],
    documentation: "Returns the absolute value of a number.",
  },
  {
    label: "at_least",
    detail: "number | at_least: number",
    acceptedTypes: ["number"],
    documentation: "Limits a number to a minimum value.",
    insertText: "at_least: ${1}",
  },
  {
    label: "at_most",
    detail: "number | at_most: number",
    acceptedTypes: ["number"],
    documentation: "Limits a number to a maximum value.",
    insertText: "at_most: ${1}",
  },
  {
    label: "divided_by",
    detail: "filter: divided_by: number",
    acceptedTypes: ["number"],
    documentation: "Divides a number by another number.",
    insertText: "divided_by: ${1}",
  },
];
