import { marketVariantsObject } from "./market.object";
import type { LiquidObject } from "./object.types";

export const lineItemObject: LiquidObject = {
  label: "line_item",
  type: "object",
  detail: "line item",
  properties: [
    {
      label: "_id",
      type: "string",
      detail: "Line item ID",
    },
    {
      label: "product",
      type: "object",
      detail: "Product reference",
      properties: [
        {
          label: "_id",
          type: "string",
          detail: "Product ID",
        },
      ],
    },
    {
      label: "product_title",
      type: "string",
      detail: "Product title",
    },
    {
      label: "variant_title",
      type: "string",
      detail: "Variant title",
    },
    {
      label: "sku",
      type: "string",
      detail: "Product SKU",
    },
    {
      label: "vendor",
      type: "string",
      detail: "Product vendor",
    },
    {
      label: "handle",
      type: "string",
      detail: "Product handle",
    },
    {
      label: "url",
      type: "string",
      detail: "Product URL",
    },
    {
      label: "image",
      type: "string",
      detail: "Product image URL",
    },
    {
      label: "quantity",
      type: "number",
      detail: "Line item quantity",
    },
    {
      label: "base_unit_price",
      type: "number",
      detail: "Original unit price",
    },
    {
      label: "final_unit_price",
      type: "number",
      detail: "Final unit price after discounts",
    },
    {
      label: "line_total",
      type: "number",
      detail: "Line item total amount",
    },
    {
      label: "weight",
      type: "number",
      detail: "Product weight",
    },
    {
      label: "width",
      type: "number",
      detail: "Product width",
    },
    {
      label: "length",
      type: "number",
      detail: "Product length",
    },
    {
      label: "restocking_fee",
      type: "number",
      detail: "Restocking fee",
    },
    {
      label: "return_window",
      type: "number",
      detail: "Return window",
    },
    {
      label: "is_shipping_applicable",
      type: "boolean",
      detail: "Whether shipping applies to this item",
    },
    {
      label: "is_tax_applicable",
      type: "boolean",
      detail: "Whether tax applies to this item",
    },
    {
      label: "variant",
      type: "object",
      detail: "Product variant",
      properties: [
        {
          label: "_id",
          type: "string",
          detail: "Variant ID",
        },
        marketVariantsObject,
      ],
    },
  ],
};

export const lineItemsObject: LiquidObject = {
  label: "line_items",
  type: "array",
  detail: "line items",
  properties: [],
};
