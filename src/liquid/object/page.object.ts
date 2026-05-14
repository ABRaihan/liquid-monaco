import type { LiquidObject } from "./object.types";

export const pageObject: LiquidObject = {
  label: "page",
  detail: "Page object",
  type: "object",
  documentation:
    "Represents page data with title, content, image, SEO metadata, handle, URL, template, and metafields.",
  properties: [
    {
      label: "id",
      type: "string",
      detail: "Page ID",
    },
    {
      label: "title",
      type: "string",
      detail: "Page title",
    },
    {
      label: "content",
      type: "string",
      detail: "Page HTML content",
    },
    {
      label: "image",
      type: "object",
      detail: "Page image",
      properties: [
        {
          label: "_id",
          type: "string",
          detail: "Image ID",
        },
        {
          label: "store",
          type: "string",
          detail: "Store ID",
        },
        {
          label: "type",
          type: "string",
          detail: "Media type",
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
          label: "createdAt",
          type: "string",
          detail: "Image creation date",
        },
        {
          label: "updatedAt",
          type: "string",
          detail: "Image update date",
        },
        {
          label: "__v",
          type: "number",
          detail: "Image version key",
        },
      ],
    },
    {
      label: "thumbnail",
      type: "string",
      detail: "Page thumbnail URL",
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
      detail: "Page handle",
    },
    {
      label: "url",
      type: "string",
      detail: "Page URL",
    },
    {
      label: "template",
      type: "string",
      detail: "Page template",
    },
    {
      label: "createdAt",
      type: "string",
      detail: "Page creation date",
    },
    {
      label: "updatedAt",
      type: "string",
      detail: "Page update date",
    },
    {
      label: "metafields",
      type: "array",
      detail: "Page metafields",
    },
  ],
};
