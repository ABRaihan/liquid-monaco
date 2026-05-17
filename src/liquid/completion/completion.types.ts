import type { LiquidFilter } from "../filter/filter.types";
import type { LiquidObject, LiquidProperty, LiquidValueType } from "../object";
import type { LiquidTag } from "../tag/tag.types";

export type LiquidCompletionMode = "output" | "tag" | "liquid-block";

export type LiquidCompletionContextType = "root-value" | "property" | "filter" | "tag" | "unknown";

export type LiquidVariableSymbol = {
  label: string;
  type: LiquidValueType;
};

export type LiquidCompletionContext =
  | {
      mode: LiquidCompletionMode;
      type: "root-value";
      prefix: string;
    }
  | {
      mode: LiquidCompletionMode;
      type: "property";
      path: string[];
      prefix: string;
    }
  | {
      mode: LiquidCompletionMode;
      type: "filter";
      valueType: LiquidValueType;
      prefix: string;
    }
  | {
      mode: LiquidCompletionMode;
      type: "tag";
      prefix: string;
    }
  | {
      mode?: LiquidCompletionMode;
      type: "unknown";
    };

export type LiquidCompletionData = {
  objects: LiquidObject[];
  filters: LiquidFilter[];
  tags: LiquidTag[];
};

export type LiquidCompletionModel = {
  context: LiquidCompletionContext;
  variables: LiquidVariableSymbol[];
};

export type ResolvedLiquidExpression = {
  mode: LiquidCompletionMode;
  expression: string;
  expressionStartOffset: number;
};

export type ResolvedLiquidProperty = LiquidProperty | LiquidObject;
