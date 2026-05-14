import type { LiquidObject } from "./object.types";

export const currencyObject: LiquidObject = {
  label: "currency",
  type: "object",
  detail: "Currency Information",
  properties: [
    {
      label: "_id",
      type: "string",
      detail: "Currency ID",
    },
    {
      label: "conversion_rate",
      type: "number",
      detail: "Currency conversion rate",
    },
    {
      label: "iso_4217_code",
      type: "string",
      detail: "Currency ISO 4217 code",
    },
    {
      label: "name",
      type: "string",
      detail: "Currency name",
    },
    {
      label: "native_name",
      type: "string",
      detail: "Currency native name",
    },
    {
      label: "symbol",
      type: "string",
      detail: "Currency symbol",
    },
  ],
};
