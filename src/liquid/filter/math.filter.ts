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
    label: "ceil",
    detail: "number | ceil",
    acceptedTypes: ["number"],
    documentation:
      "Rounds the input up to the nearest whole number. LiquidJS tries to convert the input to a number before the filter is applied.",
  },
  {
    label: "divided_by",
    detail: "number | divided_by: number",
    acceptedTypes: ["number"],
    documentation:
      "Divides a number by another number. The result is the string obtained by JavaScript .toString() of the result number.",
    insertText: "divided_by: ${1}",
  },
  {
    label: "floor",
    detail: "number | floor",
    acceptedTypes: ["number"],
    documentation: "Rounds the input down to the nearest whole number.",
  },
  {
    label: "minus",
    detail: "number | minus:number",
    acceptedTypes: ["number"],
    documentation: "Subtracts a number from another number.",
    insertText: "minus: ${1}",
  },
  {
    label: "modulo",
    detail: "number | modulo:number",
    acceptedTypes: ["number"],
    documentation: "Returns the remainder of a division operation.",
    insertText: "modulo: ${1}",
  },
  {
    label: "plus",
    detail: "number | plus:number",
    acceptedTypes: ["number"],
    documentation: "Adds a number to another number.",
    insertText: "plus: ${1}",
  },
  {
    label: "round",
    detail: "number | round",
    acceptedTypes: ["number"],
    documentation:
      "Rounds a number to the nearest integer or, if a number is passed as an argument, to that number of decimal places.",
  },
  {
    label: "times",
    detail: "number | times:number",
    acceptedTypes: ["number"],
    documentation: "Multiplies a number by another number.",
    insertText: "times: ${1}",
  },
];
