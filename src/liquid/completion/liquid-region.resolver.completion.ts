import type { ResolvedLiquidExpression } from "./completion.types";

export class LiquidRegionResolver {
  resolve(text: string, offset: number): ResolvedLiquidExpression | undefined {
    const outputStartOffset = text.lastIndexOf("{{", offset);
    const outputEndOffset = text.lastIndexOf("}}", offset);
    const isInsideOutput = outputStartOffset !== -1 && outputStartOffset > outputEndOffset;

    const tagStartOffset = text.lastIndexOf("{%", offset);
    const tagEndOffset = text.lastIndexOf("%}", offset);
    const isInsideTag = tagStartOffset !== -1 && tagStartOffset > tagEndOffset;

    if (!isInsideOutput && !isInsideTag) return undefined;

    if (isInsideOutput && (!isInsideTag || outputStartOffset > tagStartOffset)) {
      const expressionStartOffset = outputStartOffset + 2;
      return {
        mode: "output",
        expression: text.slice(expressionStartOffset, offset),
        expressionStartOffset,
      };
    }

    const expressionStartOffset = tagStartOffset + 2;
    const tagExpression = text.slice(expressionStartOffset, offset);
    const liquidBlockExpression = this.resolveLiquidBlockExpression(text, offset, expressionStartOffset, tagExpression);

    if (liquidBlockExpression) return liquidBlockExpression;

    return {
      mode: "tag",
      expression: tagExpression,
      expressionStartOffset,
    };
  }

  private resolveLiquidBlockExpression(
    text: string,
    offset: number,
    expressionStartOffset: number,
    tagExpression: string,
  ): ResolvedLiquidExpression | undefined {
    if (!/^\s*liquid\b/.test(tagExpression)) return undefined;

    const firstLineBreakOffset = tagExpression.indexOf("\n");
    if (firstLineBreakOffset === -1) return undefined;

    const firstLiquidStatementOffset = expressionStartOffset + firstLineBreakOffset + 1;
    if (offset < firstLiquidStatementOffset) return undefined;

    const currentLineStartOffset = text.lastIndexOf("\n", offset - 1) + 1;

    return {
      mode: "liquid-block",
      expression: text.slice(currentLineStartOffset, offset),
      expressionStartOffset: currentLineStartOffset,
    };
  }
}
