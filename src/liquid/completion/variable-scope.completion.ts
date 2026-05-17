import type { LiquidVariableSymbol } from "./completion.types";
import { LiquidTypeResolver } from "./type-inference.completion";

type AssignmentCandidate = {
  offset: number;
  name: string;
  valueExpression: string;
};

export class LiquidVariableScopeResolver {
  private readonly typeResolver: LiquidTypeResolver;

  constructor(typeResolver: LiquidTypeResolver) {
    this.typeResolver = typeResolver;
  }

  resolveVariables(textBeforeContext: string): LiquidVariableSymbol[] {
    const variables = new Map<string, LiquidVariableSymbol>();
    const assignments = this.collectAssignments(textBeforeContext);

    for (const assignment of assignments) {
      variables.set(assignment.name, {
        label: assignment.name,
        type: this.typeResolver.inferExpressionType(assignment.valueExpression, Array.from(variables.values())),
      });
    }

    return Array.from(variables.values());
  }

  private collectAssignments(text: string): AssignmentCandidate[] {
    const assignments: AssignmentCandidate[] = [];

    assignments.push(...this.collectDelimitedAssigns(text));
    assignments.push(...this.collectLiquidBlockAssigns(text));

    return assignments.sort((left, right) => left.offset - right.offset);
  }

  private collectDelimitedAssigns(text: string): AssignmentCandidate[] {
    const assignments: AssignmentCandidate[] = [];
    const tagPattern = /{%\s*assign\s+([A-Za-z_][\w-]*)\s*=\s*([\s\S]*?)%}/g;

    for (const match of text.matchAll(tagPattern)) {
      assignments.push({
        offset: match.index ?? 0,
        name: match[1],
        valueExpression: match[2].trim(),
      });
    }

    return assignments;
  }

  private collectLiquidBlockAssigns(text: string): AssignmentCandidate[] {
    const assignments: AssignmentCandidate[] = [];
    const liquidBlockPattern = /{%\s*liquid\b([\s\S]*?)(?:%}|$)/g;

    for (const blockMatch of text.matchAll(liquidBlockPattern)) {
      const blockOffset = blockMatch.index ?? 0;
      const blockBody = blockMatch[1];
      const lines = blockBody.split(/\r?\n/);
      let lineOffset = blockOffset + blockMatch[0].indexOf(blockBody);

      for (const line of lines) {
        const assignMatch = line.match(/^\s*assign\s+([A-Za-z_][\w-]*)\s*=\s*(.*?)\s*$/);
        if (assignMatch) {
          assignments.push({
            offset: lineOffset + (assignMatch.index ?? 0),
            name: assignMatch[1],
            valueExpression: assignMatch[2].trim(),
          });
        }

        lineOffset += line.length + 1;
      }
    }

    return assignments;
  }
}
