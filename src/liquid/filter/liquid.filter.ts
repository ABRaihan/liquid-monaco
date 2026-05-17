import { arrayFilters } from "./array.filter";
import type { LiquidFilter } from "./filter.types";
import { mathFilters } from "./math.filter";
import { stringFilters } from "./string.filter";

export const liquidFilters: LiquidFilter[] = [...mathFilters, ...arrayFilters, ...stringFilters];
