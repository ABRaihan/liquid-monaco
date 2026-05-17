import type { LiquidValueType } from "../object";

export type LiquidFilter = {
  label: string;
  acceptedTypes: LiquidValueType[];
  returnType?: LiquidValueType;
  detail?: string;
  documentation?: string;
  insertText?: string;
};
