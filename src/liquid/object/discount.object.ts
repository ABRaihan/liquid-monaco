import type { LiquidObject } from "./object.types";

export const discountObject: LiquidObject = {
  label: "discount",
  type: "object",
  detail: "Applied discount",
  properties: [
    {
      label: "title",
      type: "string",
      detail: "Discount title",
    },
    {
      label: "type",
      type: "string",
      detail: "Discount type",
    },
    {
      label: "value",
      type: "number",
      detail: "Discount value",
    },
    {
      label: "status",
      type: "string",
      detail: "Discount status",
    },
    {
      label: "scope",
      type: "string",
      detail: "Discount scope",
    },
    {
      label: "source",
      type: "string",
      detail: "Discount source",
    },
    {
      label: "priority",
      type: "number",
      detail: "Discount priority",
    },
    {
      label: "stackable",
      type: "boolean",
      detail: "Whether discount is stackable",
    },
    {
      label: "reason",
      type: "string",
      detail: "Discount reason",
    },
    {
      label: "computed_amount",
      type: "number",
      detail: "Computed discount amount",
    },
    {
      label: "target_line_items",
      type: "array",
      detail: "Target line items",
    },
  ],
};
export const discountsObject: LiquidObject = {
  label: "discounts",
  type: "array",
  detail: "Applied discounts",
  properties: [],
};
