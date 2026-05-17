import { conditionalTags } from "./conditional.tag";
import { iterationTags } from "./iteration.tag";
import { syntaxTags } from "./syntax.tag";
import type { LiquidTag } from "./tag.types";
import { themeTags } from "./theme.tag";
import { variableTags } from "./variable.tag";

export const liquidTags: LiquidTag[] = [...conditionalTags, ...iterationTags, ...syntaxTags, ...themeTags, ...variableTags];
