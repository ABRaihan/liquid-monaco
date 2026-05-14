import type { LiquidObject } from "./object.types";

export const articleObject: LiquidObject = {
  label: "article",
  detail: "Article object",
  type: "object",
  documentation: "Represents a blog article with metadata, image, author, blog, and metafields.",
  properties: [
    {
      label: "id",
      type: "string",
      detail: "Article ID",
    },
    {
      label: "title",
      type: "string",
      detail: "Article title",
    },
    {
      label: "excerpt",
      type: "string",
      detail: "Short article excerpt",
    },
    {
      label: "content",
      type: "string",
      detail: "Article content",
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
      detail: "Article handle",
    },
    {
      label: "template",
      type: "string",
      detail: "Article template name",
    },
    {
      label: "image",
      type: "object",
      detail: "Article image object",
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
          detail: "Image size",
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
          detail: "Version key",
        },
      ],
    },
    {
      label: "thumbnail",
      type: "string",
      detail: "Article thumbnail URL",
    },
    {
      label: "url",
      type: "string",
      detail: "Article URL",
    },
    {
      label: "createdAt",
      type: "string",
      detail: "Article creation date",
    },
    {
      label: "updatedAt",
      type: "string",
      detail: "Article update date",
    },
    {
      label: "author",
      type: "string",
      detail: "Author ID",
    },
    {
      label: "blog",
      type: "string",
      detail: "Blog ID",
    },
    {
      label: "metafields",
      type: "array",
      detail: "Article metafields",
    },
  ],
};
