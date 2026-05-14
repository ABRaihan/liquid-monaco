import type { LiquidObject } from "./object.types";
import { phoneObject } from "./phone.object";

export const customerObject: LiquidObject = {
  label: "customer",
  detail: "Customer information",
  type: "object",
  documentation: "Represents customer data with name, email, phone, tags, and language information.",
  properties: [
    {
      label: "_id",
      type: "string",
      detail: "Customer ID",
    },
    {
      label: "last_name",
      type: "string",
      detail: "Customer last name",
    },
    {
      label: "first_name",
      type: "string",
      detail: "Customer first name",
    },
    {
      label: "email",
      type: "object",
      detail: "Customer email",
      properties: [
        {
          label: "address",
          type: "string",
          detail: "Customer email address",
        },
        {
          label: "is_verified",
          type: "boolean",
          detail: "Whether the email address is verified",
        },
      ],
    },
    phoneObject,
    {
      label: "tags",
      type: "array",
      detail: "Customer tags",
    },
  ],
};
