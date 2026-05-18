import {
  formatLiquidOutput,
  formatLiquidTag,
  getLiquidTagRole,
} from "./liquid-expression.formatter";
import { indentText, type LiquidFormatterOptions } from "./liquid-format.types";
import { tokenizeLiquidDocument, type LiquidFormatToken } from "./liquid-tokenizer.formatter";
import { formatEmbeddedRegions } from "./embedded.formatter";

export function formatLiquidDocument(source: string, options: LiquidFormatterOptions): string {
  const normalizedSource = source.replace(/\r\n?/g, "\n");
  const tokens = tokenizeLiquidDocument(normalizedSource);
  const lines = renderTokens(tokens, options);
  const formatted = formatEmbeddedRegions(lines.join("\n"), options);

  return source.endsWith("\n") ? `${formatted}\n` : formatted;
}

function renderTokens(tokens: LiquidFormatToken[], options: LiquidFormatterOptions): string[] {
  const lines: string[] = [];
  let indentLevel = 0;

  const pushLine = (value: string, level = indentLevel): void => {
    const trimmed = value.trim();
    if (!trimmed) return;

    lines.push(`${indentText(level, options)}${trimmed}`);
  };

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (!token) continue;

    if (token.type === "text") {
      pushTextLines(token.value, indentLevel, options, lines);
      continue;
    }

    if (token.type === "liquidOutput") {
      pushLine(formatLiquidOutput(token.value));
      continue;
    }

    if (token.type === "liquidOpaqueBlock") {
      pushLine(formatLiquidTag(token.open));
      indentLevel += 1;
      pushPreservedLines(token.body, indentLevel, options, lines);
      indentLevel = Math.max(indentLevel - 1, 0);
      pushLine(formatLiquidTag(token.close));
      continue;
    }

    if (token.type === "liquidTag") {
      const role = getLiquidTagRole(token.value);

      if (role === "closing") {
        indentLevel = Math.max(indentLevel - 1, 0);
        pushLine(formatLiquidTag(token.value));
        continue;
      }

      if (role === "middle") {
        indentLevel = Math.max(indentLevel - 1, 0);
        pushLine(formatLiquidTag(token.value));
        indentLevel += 1;
        continue;
      }

      pushLine(formatLiquidTag(token.value));
      if (role === "opening") indentLevel += 1;
      continue;
    }

    if (token.type === "htmlTag") {
      if (token.role === "close") {
        indentLevel = Math.max(indentLevel - 1, 0);
        pushLine(token.value);
        continue;
      }

      const collapsed = collapseInlineHtml(tokens, index);
      if (collapsed) {
        pushLine(collapsed.value);
        index = collapsed.nextIndex;
        continue;
      }

      pushLine(token.value);
      if (token.role === "open") indentLevel += 1;
    }
  }

  return lines;
}

function pushTextLines(
  source: string,
  indentLevel: number,
  options: LiquidFormatterOptions,
  lines: string[],
): void {
  source
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0)
    .forEach((line) => {
      lines.push(`${indentText(indentLevel, options)}${line}`);
    });
}

function pushPreservedLines(
  source: string,
  indentLevel: number,
  options: LiquidFormatterOptions,
  lines: string[],
): void {
  const bodyLines = source.replace(/^\n/, "").replace(/\n$/, "").split("\n");

  bodyLines.forEach((line) => {
    if (!line.trim()) {
      lines.push("");
      return;
    }

    lines.push(`${indentText(indentLevel, options)}${line.trimEnd()}`);
  });
}

function collapseInlineHtml(
  tokens: LiquidFormatToken[],
  startIndex: number,
): { value: string; nextIndex: number } | undefined {
  const openToken = tokens[startIndex];
  if (!openToken || openToken.type !== "htmlTag" || openToken.role !== "open") return undefined;
  if (openToken.tagName === "style" || openToken.tagName === "script") return undefined;

  const contentToken = tokens[startIndex + 1];
  const closeToken = tokens[startIndex + 2];

  if (!contentToken || !closeToken || closeToken.type !== "htmlTag") return undefined;
  if (closeToken.role !== "close" || closeToken.tagName !== openToken.tagName) return undefined;

  if (contentToken.type === "text") {
    const text = contentToken.value.replace(/\s+/g, " ").trim();
    if (!text) return undefined;

    return { value: `${openToken.value}${text}${closeToken.value}`, nextIndex: startIndex + 2 };
  }

  if (contentToken.type === "liquidOutput") {
    return {
      value: `${openToken.value}${formatLiquidOutput(contentToken.value)}${closeToken.value}`,
      nextIndex: startIndex + 2,
    };
  }

  return undefined;
}
