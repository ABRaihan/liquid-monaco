import type { LiquidObject } from "./object.types";

export const variantObject: LiquidObject = {
  label: "variant",
  detail: "Variant object",
  type: "object",
  documentation:
    "Represents product variant data with option values, image, pricing, inventory, quantity rules, shipping, tax, and metafields.",
  properties: [
    {
      label: "id",
      type: "string",
      detail: "Variant ID",
    },
    {
      label: "product",
      type: "string",
      detail: "Product ID",
    },
    {
      label: "option1",
      type: "string",
      detail: "First option value",
    },
    {
      label: "option2",
      type: "string",
      detail: "Second option value",
    },
    {
      label: "option3",
      type: "string",
      detail: "Third option value",
    },
    {
      label: "title",
      type: "string",
      detail: "Variant title",
    },
    {
      label: "image",
      type: "object",
      detail: "Variant image",
      properties: [
        {
          label: "_id",
          type: "string",
          detail: "Image ID",
        },
        {
          label: "type",
          type: "string",
          detail: "Media type",
        },
        {
          label: "store",
          type: "string",
          detail: "Store ID",
        },
        {
          label: "file_name",
          type: "string",
          detail: "Image file name",
        },
        {
          label: "mimetype",
          type: "string",
          detail: "Image MIME type",
        },
        {
          label: "size",
          type: "string",
          detail: "Image file size",
        },
        {
          label: "url",
          type: "string",
          detail: "Image URL",
        },
        {
          label: "__v",
          type: "number",
          detail: "Image version key",
        },
        {
          label: "createdAt",
          type: "string",
          detail: "Image creation date",
        },
        {
          label: "updatedAt",
          type: "string",
          detail: "Image update date",
        },
      ],
    },
    {
      label: "featured_image",
      type: "string",
      detail: "Variant featured image URL",
    },
    {
      label: "sku",
      type: "string",
      detail: "Variant SKU",
    },
    {
      label: "barcode",
      type: "string",
      detail: "Variant barcode",
    },
    {
      label: "height",
      type: "number",
      detail: "Variant height",
    },
    {
      label: "width",
      type: "number",
      detail: "Variant width",
    },
    {
      label: "length",
      type: "number",
      detail: "Variant length",
    },
    {
      label: "weight",
      type: "number",
      detail: "Variant weight",
    },
    {
      label: "price",
      type: "number",
      detail: "Variant price",
    },
    {
      label: "compare_at_price",
      type: "number",
      detail: "Variant compare-at price",
    },
    {
      label: "discount",
      type: "number",
      detail: "Variant discount",
    },
    {
      label: "use_wholesale",
      type: "boolean",
      detail: "Whether wholesale pricing is enabled",
    },
    {
      label: "quantity_rule",
      type: "object",
      detail: "Variant quantity rule",
      properties: [
        {
          label: "min",
          type: "number",
          detail: "Minimum quantity",
        },
        {
          label: "max",
          type: "unknown",
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
      detail: "Variant price breaks",
    },
    {
      label: "sell_when_out_of_stock",
      type: "boolean",
      detail: "Whether selling is allowed when out of stock",
    },
    {
      label: "requires_shipping",
      type: "boolean",
      detail: "Whether the variant requires shipping",
    },
    {
      label: "shipping_profile",
      type: "string",
      detail: "Shipping profile ID",
    },
    {
      label: "taxable",
      type: "boolean",
      detail: "Whether the variant is taxable",
    },
    {
      label: "metafields",
      type: "array",
      detail: "Variant metafields",
    },
    {
      label: "available",
      type: "number",
      detail: "Variant available quantity",
    },
  ],
};
