import type { LiquidObject } from "./object.types";

export const languageObject: LiquidObject = {
  label: "language",
  type: "object",
  detail: "Language information",
  properties: [
    {
      label: "_id",
      type: "string",
      detail: "Language ID",
    },
    {
      label: "name",
      type: "string",
      detail: "Language name",
    },
    {
      label: "iso_6391_code",
      type: "string",
      detail: "Language ISO 639-1 code",
    },
    {
      label: "native_name",
      type: "string",
      detail: "Language native name",
    },
  ],
};
