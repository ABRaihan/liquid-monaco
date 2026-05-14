import { customerObject } from "./customer.object";
import { discountsObject } from "./discount.object";
import { lineItemObject } from "./line_item.object";
import { marketObject } from "./market.object";
import type { LiquidObject } from "./object.types";
import { paymentMethodObject, paymentOptionsObject } from "./payment.object";

export const cartObject: LiquidObject = {
  label: "cart",
  detail: "Cart object",
  type: "object",
  documentation:
    "Represents cart data with pricing, line items, discounts, addresses, market, currency, fulfillment, and payment information.",
  properties: [
    {
      label: "_id",
      type: "string",
      detail: "Cart ID",
    },
    {
      label: "discount",
      type: "number",
      detail: "Total discount amount",
    },
    {
      label: "ip",
      type: "string",
      detail: "Customer IP address",
    },
    {
      label: "user_agent",
      type: "string",
      detail: "Customer browser user agent",
    },
    {
      label: "note",
      type: "string",
      detail: "Cart or order note",
    },
    {
      label: "createdAt",
      type: "string",
      detail: "Cart creation date",
    },
    {
      label: "updatedAt",
      type: "string",
      detail: "Cart update date",
    },
    {
      label: "coupon",
      type: "string",
      detail: "Applied coupon",
    },
    {
      label: "subtotal",
      type: "number",
      detail: "Cart subtotal",
    },
    {
      label: "tax",
      type: "number",
      detail: "Total tax amount",
    },
    {
      label: "payment",
      type: "number",
      detail: "Payment charge amount",
    },
    {
      label: "shipping",
      type: "number",
      detail: "Shipping charge amount",
    },
    {
      label: "total",
      type: "number",
      detail: "Cart total amount",
    },
    lineItemObject,
    discountsObject,
    {
      label: "billing_address",
      type: "object",
      detail: "Billing address",
      properties: [
        {
          label: "address1",
          type: "string",
          detail: "Billing address line 1",
        },
        {
          label: "address2",
          type: "string",
          detail: "Billing address line 2",
        },
        {
          label: "city",
          type: "string",
          detail: "Billing city",
        },
        {
          label: "company",
          type: "string",
          detail: "Billing company",
        },
        {
          label: "country",
          type: "object",
          detail: "Billing country",
          properties: [
            {
              label: "_id",
              type: "string",
              detail: "Country ID",
            },
            {
              label: "name",
              type: "string",
              detail: "Country name",
            },
            {
              label: "iso_3166_alpha2",
              type: "string",
              detail: "Country ISO alpha-2 code",
            },
            {
              label: "flag",
              type: "string",
              detail: "Country flag URL",
            },
            {
              label: "iso_3166_alpha3",
              type: "string",
              detail: "Country ISO alpha-3 code",
            },
            {
              label: "native_name",
              type: "string",
              detail: "Country native name",
            },
            {
              label: "official_name",
              type: "string",
              detail: "Country official name",
            },
          ],
        },
        {
          label: "first_name",
          type: "string",
          detail: "Billing first name",
        },
        {
          label: "last_name",
          type: "string",
          detail: "Billing last name",
        },
        {
          label: "phone",
          type: "string",
          detail: "Billing phone number",
        },
        {
          label: "postal_code",
          type: "string",
          detail: "Billing postal code",
        },
      ],
    },
    {
      label: "shipping_address",
      type: "object",
      detail: "Shipping address",
      properties: [
        {
          label: "address1",
          type: "string",
          detail: "Shipping address line 1",
        },
        {
          label: "address2",
          type: "string",
          detail: "Shipping address line 2",
        },
        {
          label: "city",
          type: "string",
          detail: "Shipping city",
        },
        {
          label: "company",
          type: "string",
          detail: "Shipping company",
        },
        {
          label: "country",
          type: "object",
          detail: "Shipping country",
          properties: [
            {
              label: "_id",
              type: "string",
              detail: "Country ID",
            },
            {
              label: "name",
              type: "string",
              detail: "Country name",
            },
            {
              label: "iso_3166_alpha2",
              type: "string",
              detail: "Country ISO alpha-2 code",
            },
            {
              label: "flag",
              type: "string",
              detail: "Country flag URL",
            },
            {
              label: "iso_3166_alpha3",
              type: "string",
              detail: "Country ISO alpha-3 code",
            },
            {
              label: "native_name",
              type: "string",
              detail: "Country native name",
            },
            {
              label: "official_name",
              type: "string",
              detail: "Country official name",
            },
          ],
        },
        {
          label: "first_name",
          type: "string",
          detail: "Shipping first name",
        },
        {
          label: "last_name",
          type: "string",
          detail: "Shipping last name",
        },
        {
          label: "phone",
          type: "string",
          detail: "Shipping phone number",
        },
        {
          label: "postal_code",
          type: "string",
          detail: "Shipping postal code",
        },
      ],
    },
    customerObject,
    marketObject,
    {
      label: "currency",
      type: "object",
      detail: "Cart currency",
      properties: [
        {
          label: "_id",
          type: "string",
          detail: "Currency ID",
        },
        {
          label: "name",
          type: "string",
          detail: "Currency name",
        },
        {
          label: "iso_4217_code",
          type: "string",
          detail: "Currency ISO 4217 code",
        },
        {
          label: "native_name",
          type: "string",
          detail: "Currency native name",
        },
        {
          label: "symbol",
          type: "string",
          detail: "Currency symbol",
        },
      ],
    },
    {
      label: "taxes",
      type: "array",
      detail: "Applied taxes",
    },
    {
      label: "fulfillment",
      type: "object",
      detail: "Selected fulfillment method",
      properties: [
        {
          label: "description",
          type: "string",
          detail: "Fulfillment description",
        },
        {
          label: "method",
          type: "string",
          detail: "Fulfillment method",
        },
        {
          label: "name",
          type: "string",
          detail: "Fulfillment name",
        },
        {
          label: "price",
          type: "number",
          detail: "Fulfillment price",
        },
        {
          label: "rate",
          type: "string",
          detail: "Fulfillment rate ID",
        },
      ],
    },
    {
      label: "fulfillment_options",
      type: "object",
      detail: "Available fulfillment options",
      properties: [
        {
          label: "deliveries",
          type: "array",
          detail: "Delivery options",
        },
        {
          label: "pickups",
          type: "array",
          detail: "Pickup options",
          properties: [
            {
              label: "description",
              type: "string",
              detail: "Pickup description",
            },
            {
              label: "instructions",
              type: "string",
              detail: "Pickup instructions",
            },
            {
              label: "name",
              type: "string",
              detail: "Pickup name",
            },
            {
              label: "price",
              type: "number",
              detail: "Pickup price",
            },
            {
              label: "rate",
              type: "string",
              detail: "Pickup rate ID",
            },
          ],
        },
        {
          label: "shippings",
          type: "array",
          detail: "Shipping options",
          properties: [
            {
              label: "description",
              type: "string",
              detail: "Shipping description",
            },
            {
              label: "instructions",
              type: "string",
              detail: "Shipping instructions",
            },
            {
              label: "name",
              type: "string",
              detail: "Shipping name",
            },
            {
              label: "price",
              type: "number",
              detail: "Shipping price",
            },
            {
              label: "rate",
              type: "string",
              detail: "Shipping rate ID",
            },
          ],
        },
      ],
    },
    paymentMethodObject,
    paymentOptionsObject,
  ],
};
