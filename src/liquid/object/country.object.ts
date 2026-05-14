import type { LiquidObject } from "./object.types";

export const countryObject: LiquidObject = {
  label: "country",
  detail: "Country object",
  type: "object",
  documentation:
    "Represents country data with ISO codes, native and official names, languages, currencies, phone, flag, continent, and tax information.",
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
      detail: "Country ISO 3166 alpha-2 code",
    },
    {
      label: "iso_3166_alpha3",
      type: "string",
      detail: "Country ISO 3166 alpha-3 code",
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
    {
      label: "__v",
      type: "number",
      detail: "Version key",
    },
    {
      label: "languages",
      type: "array",
      detail: "Country language IDs",
    },
    {
      label: "currencies",
      type: "array",
      detail: "Country currency IDs",
    },
    {
      label: "phone",
      type: "string",
      detail: "Phone configuration ID",
    },
    {
      label: "flag",
      type: "string",
      detail: "Country flag URL",
    },
    {
      label: "continent",
      type: "string",
      detail: "Continent ID",
    },
    {
      label: "tax_rate",
      type: "number",
      detail: "Country tax rate",
    },
    {
      label: "tax_name",
      type: "string",
      detail: "Country tax name",
    },
  ],
};
