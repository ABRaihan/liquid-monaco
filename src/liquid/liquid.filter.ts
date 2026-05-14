import type { LiquidValueType } from "./object";

type LiquidFilter = {
  label: string;
  acceptedTypes: LiquidValueType[];
  detail?: string;
  documentation?: string;
  insertText?: string;
};

export const liquidFilters: LiquidFilter[] = [
  {
    label: "handle",
    detail: "filter",
    acceptedTypes: ["string"],
    documentation: "Converts a string into a handle format.",
  },
  {
    label: "divided_by",
    detail: "filter: divided_by: number",
    acceptedTypes: ["number"],
    documentation: "Divides a number by another number.",
    insertText: "divided_by: ${1}",
  },
];
