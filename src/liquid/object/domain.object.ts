import type { LiquidObject } from "./object.types";

export const domainObject: LiquidObject = {
  label: "domain",
  type: "object",
  detail: "Domain information",
  properties: [
    {
      label: "_id",
      type: "string",
      detail: "Domain ID",
    },
    {
      label: "name",
      type: "string",
      detail: "Domain name",
    },
    {
      label: "is_tld",
      type: "boolean",
      detail: "Whether the domain is a top-level domain",
    },
    {
      label: "is_primary",
      type: "boolean",
      detail: "Whether the domain is primary",
    },
  ],
};
