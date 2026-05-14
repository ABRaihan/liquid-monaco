import { currencyObject } from "./currency.object";
import { discountsObject } from "./discount.object";
import { lineItemsObject } from "./line_item.object";
import { marketObject } from "./market.object";
import type { LiquidObject } from "./object.types";
import { paymentMethodObject, paymentsObject } from "./payment.object";

export const orderObject: LiquidObject = {
  label: "order",
  detail: "Order object",
  type: "object",
  documentation:
    "Represents order data with pricing, status, currency, discounts, fulfillment, line items, market, payment method, taxes, fulfillments, payments, and returns.",
  properties: [
    {
      label: "_id",
      type: "string",
      detail: "Order ID",
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
      detail: "Order note",
    },
    {
      label: "createdAt",
      type: "string",
      detail: "Order creation date",
    },
    {
      label: "updatedAt",
      type: "string",
      detail: "Order update date",
    },
    {
      label: "coupon",
      type: "string",
      detail: "Applied coupon",
    },
    {
      label: "subtotal",
      type: "number",
      detail: "Order subtotal",
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
      detail: "Order total amount",
    },
    {
      label: "paid",
      type: "number",
      detail: "Paid amount",
    },
    {
      label: "serial_id",
      type: "string",
      detail: "Order serial ID",
    },
    {
      label: "status",
      type: "string",
      detail: "Order status",
    },
    {
      label: "payment_status",
      type: "string",
      detail: "Payment status",
    },
    {
      label: "fulfillment_status",
      type: "string",
      detail: "Fulfillment status",
    },
    {
      label: "channel",
      type: "string",
      detail: "Order channel",
    },
    currencyObject,
    discountsObject,
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
    lineItemsObject,
    marketObject,
    paymentMethodObject,
    {
      label: "taxes",
      type: "array",
      detail: "Applied taxes",
    },
    {
      label: "fulfillments",
      type: "object",
      detail: "Order fulfillments connection",
      properties: [
        {
          label: "edges",
          type: "array",
          detail: "Fulfillment edges",
        },
      ],
    },
    paymentsObject,
    {
      label: "returns",
      type: "object",
      detail: "Order returns connection",
      properties: [
        {
          label: "edges",
          type: "array",
          detail: "Return edges",
        },
      ],
    },
  ],
};
