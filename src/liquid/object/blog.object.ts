import type { LiquidObject } from "./object.types";

export const blogObject: LiquidObject = {
  label: "blog",
  detail: "Blog object",
  type: "object",
  documentation: "Represents a blog collection/category with SEO metadata, image, template, URL, and metafields.",
  properties: [
    {
      label: "id",
      type: "string",
      detail: "Blog ID",
    },
    {
      label: "title",
      type: "string",
      detail: "Blog title",
    },
    {
      label: "image",
      type: "object",
      detail: "Blog image",
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
      detail: "Blog thumbnail URL",
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
      detail: "Blog handle",
    },
    {
      label: "template",
      type: "string",
      detail: "Blog template",
    },
    {
      label: "metafields",
      type: "array",
      detail: "Blog metafields",
    },
    {
      label: "url",
      type: "string",
      detail: "Blog URL",
    },
    {
      label: "createdAt",
      type: "string",
      detail: "Blog creation date",
    },
    {
      label: "updatedAt",
      type: "string",
      detail: "Blog update date",
    },
  ],
};
export const blogsObject: LiquidObject = {
  label: "blogs",
  type: "array",
  detail: "Blogs",
  properties: [],
};
