import type { LiquidObject } from "./object.types";

export const phoneObject: LiquidObject = {
  label: "phone",
  type: "object",
  detail: "Customer phone number",
  properties: [
    {
      label: "number",
      type: "string",
      detail: "Phone number",
    },
  ],
};
