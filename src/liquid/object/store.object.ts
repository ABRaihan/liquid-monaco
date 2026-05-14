import type { LiquidObject } from "./object.types";

export const storeObject: LiquidObject = {
  label: "store",
  detail: "Store object",
  type: "object",
  documentation:
    "Represents store data with address, units, order prefix/suffix, owner, name, currency, timezone, and timestamps.",
  properties: [
    {
      label: "_id",
      type: "string",
      detail: "Store ID",
    },
    {
      label: "address",
      type: "object",
      detail: "Store address",
      properties: [
        {
          label: "email",
          type: "unknown",
          detail: "Store email address",
        },
        {
          label: "phone",
          type: "object",
          detail: "Store phone information",
          properties: [
            {
              label: "is_verified",
              type: "boolean",
              detail: "Whether the phone is verified",
            },
            {
              label: "has_subscribed",
              type: "boolean",
              detail: "Whether the phone has subscribed",
            },
            {
              label: "has_unsubscribed",
              type: "boolean",
              detail: "Whether the phone has unsubscribed",
            },
            {
              label: "country",
              type: "string",
              detail: "Phone country ID",
            },
          ],
        },
        {
          label: "country",
          type: "string",
          detail: "Store country ID",
        },
        {
          label: "name",
          type: "unknown",
          detail: "Address name",
        },
        {
          label: "city",
          type: "unknown",
          detail: "Store city",
        },
        {
          label: "address1",
          type: "unknown",
          detail: "Store address line 1",
        },
        {
          label: "address2",
          type: "unknown",
          detail: "Store address line 2",
        },
        {
          label: "postal_code",
          type: "unknown",
          detail: "Store postal code",
        },
      ],
    },
    {
      label: "weight_unit",
      type: "string",
      detail: "Store weight unit",
    },
    {
      label: "length_unit",
      type: "string",
      detail: "Store length unit",
    },
    {
      label: "order_prefix",
      type: "string",
      detail: "Order prefix",
    },
    {
      label: "order_suffix",
      type: "string",
      detail: "Order suffix",
    },
    {
      label: "owner",
      type: "string",
      detail: "Store owner ID",
    },
    {
      label: "name",
      type: "string",
      detail: "Store name",
    },
    {
      label: "currency",
      type: "string",
      detail: "Store currency ID",
    },
    {
      label: "timezone",
      type: "string",
      detail: "Store timezone ID",
    },
    {
      label: "createdAt",
      type: "string",
      detail: "Store creation date",
    },
    {
      label: "updatedAt",
      type: "string",
      detail: "Store update date",
    },
    {
      label: "__v",
      type: "number",
      detail: "Version key",
    },
  ],
};
