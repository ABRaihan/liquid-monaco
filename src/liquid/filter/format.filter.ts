import type { LiquidFilter } from "./filter.types";

export const formatFilters: LiquidFilter[] = [
  {
    label: "date",
    detail: "string | date: string",
    acceptedTypes: ["string"],
    returnType: "string",
    documentation: "Converts a timestamp into another date format.",
  },
  {
    label: "json",
    detail: "variable | concat: array2",
    acceptedTypes: ["array", "string", "object"],
    returnType: "string",
    documentation: "Converts a string, or object, into JSON format.",
  },
];
