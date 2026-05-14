export type LiquidValueType = "string" | "number" | "boolean" | "object" | "array" | "unknown";

export type LiquidProperty = {
  label: string;
  detail?: string;
  documentation?: string;
  type: LiquidValueType;
  properties?: LiquidProperty[];
};
export type LiquidObject = {
  label: string;
  detail?: string;
  type: "object" | "array";
  documentation?: string;
  properties: LiquidProperty[];
};
