import type { LiquidObject } from "./object.types";

export const paymentMethodObject: LiquidObject = {
  label: "payment_method",
  type: "object",
  detail: "Selected payment method",
  properties: [
    {
      label: "charge_type",
      type: "string",
      detail: "Payment charge type",
    },
    {
      label: "charge_value",
      type: "number",
      detail: "Payment charge value",
    },
    {
      label: "computed_amount",
      type: "number",
      detail: "Computed payment charge amount",
    },
    {
      label: "icon",
      type: "string",
      detail: "Payment method icon URL",
    },
    {
      label: "instructions",
      type: "string",
      detail: "Payment instructions",
    },
    {
      label: "note",
      type: "string",
      detail: "Payment note",
    },
    {
      label: "payment",
      type: "string",
      detail: "Payment method ID",
    },
    {
      label: "title",
      type: "string",
      detail: "Payment method title",
    },
    {
      label: "type",
      type: "string",
      detail: "Payment method type",
    },
  ],
};

export const paymentOptionObject: LiquidObject = {
  label: "payment_option",
  type: "object",
  detail: "Available payment option",
  properties: [
    {
      label: "charge_type",
      type: "string",
      detail: "Payment charge type",
    },
    {
      label: "charge_value",
      type: "number",
      detail: "Payment charge value",
    },
    {
      label: "computed_amount",
      type: "number",
      detail: "Computed payment charge amount",
    },
    {
      label: "icon",
      type: "string",
      detail: "Payment icon URL",
    },
    {
      label: "instructions",
      type: "string",
      detail: "Payment instructions",
    },
    {
      label: "note",
      type: "string",
      detail: "Payment note",
    },
    {
      label: "payment",
      type: "string",
      detail: "Payment method ID",
    },
    {
      label: "title",
      type: "string",
      detail: "Payment title",
    },
    {
      label: "type",
      type: "string",
      detail: "Payment type",
    },
  ],
};

export const paymentOptionsObject: LiquidObject = {
  label: "payment_options",
  type: "array",
  detail: "Available payment options",
  properties: [],
};

export const paymentsObject: LiquidObject = {
  label: "payments",
  type: "object",
  detail: "Payments connection",
  properties: [
    {
      label: "edges",
      type: "array",
      detail: "Payment edges",
    },
  ],
};
