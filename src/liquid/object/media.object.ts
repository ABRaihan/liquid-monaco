import type { LiquidObject } from "./object.types";

export const mediaObject: LiquidObject = {
  label: "media",
  detail: "Media object",
  type: "object",
  documentation:
    "Represents media file data with type, store, file name, MIME type, size, URL, version, and timestamps.",
  properties: [
    {
      label: "_id",
      type: "string",
      detail: "Media ID",
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
      detail: "Media file name",
    },
    {
      label: "mimetype",
      type: "string",
      detail: "Media MIME type",
    },
    {
      label: "size",
      type: "string",
      detail: "Media file size",
    },
    {
      label: "url",
      type: "string",
      detail: "Media URL",
    },
    {
      label: "__v",
      type: "number",
      detail: "Version key",
    },
    {
      label: "createdAt",
      type: "string",
      detail: "Media creation date",
    },
    {
      label: "updatedAt",
      type: "string",
      detail: "Media update date",
    },
  ],
};
