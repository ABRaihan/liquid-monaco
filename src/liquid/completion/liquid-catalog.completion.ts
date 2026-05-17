import type { LiquidFilter } from "../filter/filter.types";
import type { LiquidObject, LiquidProperty, LiquidValueType } from "../object";
import type { LiquidTag } from "../tag/tag.types";
import type { LiquidCompletionData, LiquidVariableSymbol, ResolvedLiquidProperty } from "./completion.types";

export class LiquidCompletionCatalog {
  private readonly data: LiquidCompletionData;

  constructor(data: LiquidCompletionData) {
    this.data = data;
  }

  get objects(): LiquidObject[] {
    return this.data.objects;
  }

  get filters(): LiquidFilter[] {
    return this.data.filters;
  }

  get tags(): LiquidTag[] {
    return this.data.tags;
  }

  getRootValueType(path: string[], variables: LiquidVariableSymbol[]): LiquidValueType {
    const [rootLabel, ...propertyPath] = path;
    if (!rootLabel) return "unknown";

    const variable = variables.find((candidate) => candidate.label === rootLabel);
    if (variable && propertyPath.length === 0) {
      return variable.type;
    }

    const rootObject = this.getObject(rootLabel);
    if (!rootObject) return "unknown";

    if (propertyPath.length === 0) return rootObject.type;

    return this.getPropertyFromPath(path)?.type ?? "unknown";
  }

  getObject(label: string): LiquidObject | undefined {
    return this.data.objects.find((object) => object.label === label);
  }

  getFilter(label: string): LiquidFilter | undefined {
    return this.data.filters.find((filter) => filter.label === label);
  }

  getPropertiesFromPath(path: string[]): LiquidProperty[] {
    const resolved = this.getPropertyContainer(path);
    return resolved?.properties ?? [];
  }

  getPropertyFromPath(path: string[]): LiquidProperty | undefined {
    const [, ...propertyPath] = path;
    let current: ResolvedLiquidProperty | undefined = this.getObject(path[0]);
    if (!current) return undefined;

    let currentProperty: LiquidProperty | undefined;

    for (const segment of propertyPath) {
      if (!current.properties) return undefined;
      currentProperty = current.properties.find((property) => property.label === segment);
      if (!currentProperty) return undefined;
      current = currentProperty;
    }

    return currentProperty;
  }

  getFiltersByValueType(valueType: LiquidValueType, prefix: string): LiquidFilter[] {
    return this.data.filters.filter((filter) => {
      const matchesType = valueType === "unknown" || filter.acceptedTypes.includes(valueType);
      const matchesPrefix = !prefix || filter.label.startsWith(prefix);
      return matchesType && matchesPrefix;
    });
  }

  private getPropertyContainer(path: string[]): ResolvedLiquidProperty | undefined {
    const [rootLabel, ...propertyPath] = path;
    let current: ResolvedLiquidProperty | undefined = this.getObject(rootLabel);

    for (const segment of propertyPath) {
      current = current?.properties?.find((property) => property.label === segment);
      if (!current) return undefined;
    }

    return current;
  }
}
