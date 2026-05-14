import { currencyObject } from "./currency.object";
import { domainObject } from "./domain.object";
import { languageObject } from "./language.object";
import type { LiquidObject } from "./object.types";

export const marketObject: LiquidObject = {
  label: "market",
  detail: "Market object",
  type: "object",
  documentation:
    "Represents market data with store, active status, primary status, countries, currency, language, and domain information.",
  properties: [
    {
      label: "_id",
      type: "string",
      detail: "Market ID",
    },
    {
      label: "store",
      type: "string",
      detail: "Store ID",
    },
    {
      label: "is_active",
      type: "boolean",
      detail: "Whether the market is active",
    },
    {
      label: "is_primary",
      type: "boolean",
      detail: "Whether the market is primary",
    },
    {
      label: "name",
      type: "string",
      detail: "Market name",
    },
    {
      label: "countries",
      type: "array",
      detail: "Country IDs included in this market",
    },
    currencyObject,
    languageObject,
    domainObject,
  ],
};

export const marketVariantObject: LiquidObject = {
  label: "marketVariant",
  type: "object",
  detail: "Market variant node",
  properties: [
    {
      label: "quantity_rule",
      type: "object",
      detail: "Quantity rule",
      properties: [
        {
          label: "min",
          type: "number",
          detail: "Minimum quantity",
        },
        {
          label: "max",
          type: "number",
          detail: "Maximum quantity",
        },
        {
          label: "increment",
          type: "number",
          detail: "Quantity increment",
        },
      ],
    },
    {
      label: "price_breaks",
      type: "array",
      detail: "Price breaks",
    },
  ],
};

export const marketVariantsObject: LiquidObject = {
  label: "marketVariants",
  type: "object",
  detail: "Market variant information",
  properties: [
    {
      label: "edges",
      type: "array",
      detail: "Market variant edges",
    },
  ],
};
