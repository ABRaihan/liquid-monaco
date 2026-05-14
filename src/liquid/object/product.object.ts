import type { LiquidObject } from "./object.types";
import { variantObject } from "./variant.object";

export const productObject: LiquidObject = {
  label: "product",
  detail: "Product object",
  type: "object",
  documentation:
    "Represents product data with media, images, options, SEO metadata, variants, pricing, availability, and selected variant information.",
  properties: [
    {
      label: "id",
      type: "string",
      detail: "Product ID",
    },
    {
      label: "title",
      type: "string",
      detail: "Product title",
    },
    {
      label: "description",
      type: "string",
      detail: "Product description",
    },
    {
      label: "media",
      type: "array",
      detail: "Product media",
    },
    {
      label: "images",
      type: "array",
      detail: "Product images",
    },
    {
      label: "featured_image",
      type: "string",
      detail: "Product featured image URL",
    },
    {
      label: "option1",
      type: "string",
      detail: "First product option name",
    },
    {
      label: "option2",
      type: "string",
      detail: "Second product option name",
    },
    {
      label: "option3",
      type: "string",
      detail: "Third product option name",
    },
    {
      label: "category",
      type: "unknown",
      detail: "Product category",
    },
    {
      label: "type",
      type: "string",
      detail: "Product type",
    },
    {
      label: "vendor",
      type: "string",
      detail: "Product vendor",
    },
    {
      label: "tags",
      type: "array",
      detail: "Product tags",
    },
    {
      label: "meta_title",
      type: "string",
      detail: "SEO meta title",
    },
    {
      label: "meta_description",
      type: "string",
      detail: "SEO meta description",
    },
    {
      label: "meta_tags",
      type: "array",
      detail: "SEO meta tags",
    },
    {
      label: "handle",
      type: "string",
      detail: "Product handle",
    },
    {
      label: "template",
      type: "string",
      detail: "Product template",
    },
    {
      label: "url",
      type: "string",
      detail: "Product URL",
    },
    {
      label: "createdAt",
      type: "number",
      detail: "Product creation date",
    },
    {
      label: "updatedAt",
      type: "number",
      detail: "Product update date",
    },
    {
      label: "metafields",
      type: "array",
      detail: "Product metafields",
    },
    {
      label: "variants",
      type: "array",
      detail: "Product variants",
    },
    {
      label: "total_variants",
      type: "number",
      detail: "Total variant count",
    },
    {
      label: "has_only_default_variant",
      type: "boolean",
      detail: "Whether the product has only the default variant",
    },
    {
      ...variantObject,
      label: "selected_or_first_available_variant",
      detail: "Selected or first available variant",
    },
    {
      label: "available",
      type: "number",
      detail: "Product available quantity",
    },
    {
      label: "price_max",
      type: "number",
      detail: "Maximum product price",
    },
    {
      label: "price_min",
      type: "number",
      detail: "Minimum product price",
    },
    {
      label: "discount_max",
      type: "number",
      detail: "Maximum product discount",
    },
    {
      label: "discount_min",
      type: "number",
      detail: "Minimum product discount",
    },
    {
      label: "options_with_values",
      type: "array",
      detail: "Product options with values",
    },
  ],
};
