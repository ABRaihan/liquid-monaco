import {
  getLiquidTagName,
  getLiquidRawLikeClosingTagName,
  isLiquidRawLikeOpeningTag,
} from "./liquid-expression.formatter";

export type LiquidFormatToken =
  | {
      type: "liquidOutput";
      value: string;
    }
  | {
      type: "liquidTag";
      value: string;
    }
  | {
      type: "liquidOpaqueBlock";
      open: string;
      body: string;
      close: string;
    }
  | {
      type: "htmlTag";
      value: string;
      tagName: string;
      role: "open" | "close" | "self";
    }
  | {
      type: "text";
      value: string;
    };

const VOID_HTML_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

export function tokenizeLiquidDocument(source: string): LiquidFormatToken[] {
  const tokens: LiquidFormatToken[] = [];
  let offset = 0;

  while (offset < source.length) {
    const nextSpecialOffset = findNextSpecialOffset(source, offset);

    if (nextSpecialOffset === -1) {
      pushTextToken(tokens, source.slice(offset));
      break;
    }

    if (nextSpecialOffset > offset) {
      pushTextToken(tokens, source.slice(offset, nextSpecialOffset));
      offset = nextSpecialOffset;
    }

    if (source.startsWith("{{", offset)) {
      const closeOffset = findLiquidDelimiterEnd(source, offset + 2, "}}");
      const endOffset = closeOffset === -1 ? source.length : closeOffset + 2;
      tokens.push({ type: "liquidOutput", value: source.slice(offset, endOffset) });
      offset = endOffset;
      continue;
    }

    if (source.startsWith("{%", offset)) {
      const closeOffset = findLiquidDelimiterEnd(source, offset + 2, "%}");
      const endOffset = closeOffset === -1 ? source.length : closeOffset + 2;
      const tagValue = source.slice(offset, endOffset);
      const tagName = getLiquidTagName(tagValue);

      if (tagName === "stylesheet") {
        const embeddedEnd = findClosingLiquidTag(source, endOffset, "endstylesheet");

        if (embeddedEnd) {
          tokens.push({ type: "liquidTag", value: tagValue });
          pushTextToken(tokens, source.slice(endOffset, embeddedEnd.start));
          tokens.push({ type: "liquidTag", value: source.slice(embeddedEnd.start, embeddedEnd.end) });
          offset = embeddedEnd.end;
          continue;
        }
      }

      if (isLiquidRawLikeOpeningTag(tagValue)) {
        const closingTagName = getLiquidRawLikeClosingTagName(tagValue);
        const opaqueEnd = closingTagName ? findClosingLiquidTag(source, endOffset, closingTagName) : undefined;

        if (opaqueEnd) {
          tokens.push({
            type: "liquidOpaqueBlock",
            open: tagValue,
            body: source.slice(endOffset, opaqueEnd.start),
            close: source.slice(opaqueEnd.start, opaqueEnd.end),
          });
          offset = opaqueEnd.end;
          continue;
        }
      }

      tokens.push({ type: "liquidTag", value: tagValue });
      offset = endOffset;
      continue;
    }

    const htmlTag = readHtmlTag(source, offset);
    if (htmlTag) {
      if (htmlTag.role === "open" && (htmlTag.tagName === "style" || htmlTag.tagName === "script")) {
        const embeddedEnd = findClosingHtmlTag(source, offset + htmlTag.value.length, htmlTag.tagName);

        if (embeddedEnd) {
          tokens.push(htmlTag);
          pushTextToken(tokens, source.slice(offset + htmlTag.value.length, embeddedEnd.start));
          tokens.push(embeddedEnd.token);
          offset = embeddedEnd.end;
          continue;
        }
      }

      tokens.push(htmlTag);
      offset += htmlTag.value.length;
      continue;
    }

    pushTextToken(tokens, source[offset] ?? "");
    offset += 1;
  }

  return tokens;
}

function pushTextToken(tokens: LiquidFormatToken[], value: string): void {
  if (!value) return;

  const previous = tokens[tokens.length - 1];
  if (previous?.type === "text") {
    previous.value += value;
    return;
  }

  tokens.push({ type: "text", value });
}

function findNextSpecialOffset(source: string, startOffset: number): number {
  const liquidOutputOffset = source.indexOf("{{", startOffset);
  const liquidTagOffset = source.indexOf("{%", startOffset);
  const htmlOffset = source.indexOf("<", startOffset);
  const offsets = [liquidOutputOffset, liquidTagOffset, htmlOffset].filter((offset) => offset !== -1);

  return offsets.length > 0 ? Math.min(...offsets) : -1;
}

function findLiquidDelimiterEnd(source: string, startOffset: number, delimiter: "}}" | "%}"): number {
  let quote: "'" | '"' | undefined;
  let escaped = false;

  for (let offset = startOffset; offset < source.length - 1; offset += 1) {
    const char = source[offset];

    if (!char) continue;

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = undefined;
      }

      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }

    if (source.startsWith(delimiter, offset)) return offset;
  }

  return -1;
}

function findClosingLiquidTag(
  source: string,
  startOffset: number,
  closingTagName: "endraw" | "endcomment" | "endstylesheet",
): { start: number; end: number } | undefined {
  const pattern = new RegExp(String.raw`\{%-?\s*${closingTagName}\b[\s\S]*?-?%\}`, "i");
  const match = pattern.exec(source.slice(startOffset));
  if (!match) return undefined;

  const start = startOffset + match.index;
  return { start, end: start + match[0].length };
}

function findClosingHtmlTag(
  source: string,
  startOffset: number,
  tagName: "style" | "script",
): { start: number; end: number; token: Extract<LiquidFormatToken, { type: "htmlTag" }> } | undefined {
  const pattern = new RegExp(String.raw`<\/${tagName}\s*>`, "i");
  const match = pattern.exec(source.slice(startOffset));
  if (!match) return undefined;

  const start = startOffset + match.index;
  const value = match[0];

  return {
    start,
    end: start + value.length,
    token: { type: "htmlTag", value, tagName, role: "close" },
  };
}

function readHtmlTag(source: string, startOffset: number): Extract<LiquidFormatToken, { type: "htmlTag" }> | undefined {
  const endOffset = findHtmlTagEnd(source, startOffset + 1);
  if (endOffset === -1) return undefined;

  const value = source.slice(startOffset, endOffset + 1);
  const tagName = value.match(/^<\/?\s*([a-zA-Z][\w:-]*)/)?.[1]?.toLowerCase();
  if (!tagName) return undefined;

  if (value.startsWith("</")) {
    return { type: "htmlTag", value, tagName, role: "close" };
  }

  const role = /\/\s*>$/.test(value) || VOID_HTML_TAGS.has(tagName) ? "self" : "open";
  return { type: "htmlTag", value, tagName, role };
}

function findHtmlTagEnd(source: string, startOffset: number): number {
  let quote: "'" | '"' | undefined;

  for (let offset = startOffset; offset < source.length; offset += 1) {
    const char = source[offset];

    if (!char) continue;

    if (quote) {
      if (char === quote) quote = undefined;
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }

    if (char === ">") return offset;
  }

  return -1;
}
