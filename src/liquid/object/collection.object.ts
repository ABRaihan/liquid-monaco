import type { LiquidObject } from "./object.types";

export const collectionObject: LiquidObject = {
  label: "collection",
  detail: "Collection object",
  type: "object",
  documentation:
    "Represents a product collection with products, title, description, image, SEO metadata, template, type, URL, and metafields.",
  properties: [
    {
      label: "products",
      type: "array",
      detail: "Products in the collection",
    },
    {
      label: "id",
      type: "string",
      detail: "Collection ID",
    },
    {
      label: "title",
      type: "string",
      detail: "Collection title",
    },
    {
      label: "description",
      type: "string",
      detail: "Collection description",
    },
    {
      label: "image",
      type: "object",
      detail: "Collection image",
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
      label: "thumbnail",
      type: "string",
      detail: "Collection thumbnail URL",
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
      label: "template",
      type: "string",
      detail: "Collection template",
    },
    {
      label: "type",
      type: "string",
      detail: "Collection type",
    },
    {
      label: "createdAt",
      type: "string",
      detail: "Collection creation date",
    },
    {
      label: "handle",
      type: "string",
      detail: "Collection handle",
    },
    {
      label: "url",
      type: "string",
      detail: "Collection URL",
    },
    {
      label: "metafields",
      type: "array",
      detail: "Collection metafields",
    },
  ],
};
