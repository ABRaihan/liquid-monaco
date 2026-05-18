const LIQUID_OUTPUT_OPEN_PATTERN = /^\{\{-?/;
const LIQUID_OUTPUT_CLOSE_PATTERN = /-?\}\}$/;
const LIQUID_TAG_OPEN_PATTERN = /^\{%-?/;
const LIQUID_TAG_CLOSE_PATTERN = /-?%\}$/;

type LiquidDelimiter = {
  open: string;
  close: string;
  content: string;
};

export type LiquidTagRole = "opening" | "middle" | "closing" | "standalone";

const OPENING_TAGS = new Set([
  "if",
  "unless",
  "case",
  "for",
  "tablerow",
  "capture",
  "form",
  "paginate",
  "raw",
  "comment",
  "liquid",
  "stylesheet",
]);

const MIDDLE_TAGS = new Set(["else", "elsif", "when"]);

const CLOSING_TAGS = new Set([
  "endif",
  "endunless",
  "endcase",
  "endfor",
  "endtablerow",
  "endcapture",
  "endform",
  "endpaginate",
  "endraw",
  "endcomment",
  "endliquid",
  "endstylesheet",
]);

const STANDALONE_TAGS = new Set([
  "assign",
  "echo",
  "include",
  "render",
  "layout",
  "section",
  "sections",
  "break",
  "continue",
  "cycle",
  "increment",
  "decrement",
]);

export function formatLiquidOutput(source: string): string {
  const delimiter = parseLiquidDelimiter(source, "output");
  if (!delimiter) return source.trim();

  return `${delimiter.open} ${formatLiquidExpressionContent(delimiter.content)} ${delimiter.close}`;
}

export function formatLiquidTag(source: string): string {
  const delimiter = parseLiquidDelimiter(source, "tag");
  if (!delimiter) return source.trim();

  const content = formatLiquidTagContent(delimiter.content);
  return `${delimiter.open} ${content} ${delimiter.close}`;
}

export function getLiquidTagName(source: string): string | undefined {
  const delimiter = parseLiquidDelimiter(source, "tag");
  if (!delimiter) return undefined;

  return getLiquidTagNameFromContent(delimiter.content);
}

export function getLiquidTagRole(source: string): LiquidTagRole {
  const tagName = getLiquidTagName(source);
  if (!tagName) return "standalone";
  if (CLOSING_TAGS.has(tagName)) return "closing";
  if (MIDDLE_TAGS.has(tagName)) return "middle";
  if (OPENING_TAGS.has(tagName) && !STANDALONE_TAGS.has(tagName)) return "opening";

  return "standalone";
}

export function isLiquidRawLikeOpeningTag(source: string): boolean {
  const tagName = getLiquidTagName(source);
  return tagName === "raw" || tagName === "comment";
}

export function getLiquidRawLikeClosingTagName(source: string): "endraw" | "endcomment" | undefined {
  const tagName = getLiquidTagName(source);
  if (tagName === "raw") return "endraw";
  if (tagName === "comment") return "endcomment";

  return undefined;
}

export function formatLiquidExpressionContent(source: string): string {
  const segments = splitStringSafeSegments(source.trim());
  const formatted = segments
    .map((segment) => (segment.quoted ? segment.text : formatUnquotedLiquidSegment(segment.text)))
    .join("");

  return formatted.trim();
}

function formatLiquidTagContent(source: string): string {
  const trimmed = source.trim();
  if (/^liquid\b/.test(trimmed) && trimmed.includes("\n")) {
    const lines = trimmed.split(/\r?\n/);
    const [firstLine, ...bodyLines] = lines;
    const formattedFirstLine = formatLiquidExpressionContent(firstLine ?? "liquid");
    const formattedBody = bodyLines.map((line) => formatLiquidExpressionContent(line));

    return [formattedFirstLine, ...formattedBody].join("\n");
  }

  return formatLiquidExpressionContent(trimmed);
}

function parseLiquidDelimiter(source: string, kind: "output" | "tag"): LiquidDelimiter | undefined {
  const trimmed = source.trim();
  const openMatch = trimmed.match(kind === "output" ? LIQUID_OUTPUT_OPEN_PATTERN : LIQUID_TAG_OPEN_PATTERN);
  const closeMatch = trimmed.match(kind === "output" ? LIQUID_OUTPUT_CLOSE_PATTERN : LIQUID_TAG_CLOSE_PATTERN);

  if (!openMatch?.[0] || !closeMatch?.[0]) return undefined;

  return {
    open: openMatch[0],
    close: closeMatch[0],
    content: trimmed.slice(openMatch[0].length, trimmed.length - closeMatch[0].length),
  };
}

function getLiquidTagNameFromContent(content: string): string | undefined {
  return content.trim().match(/^([a-zA-Z_][\w-]*)/)?.[1]?.toLowerCase();
}

function formatUnquotedLiquidSegment(source: string): string {
  return source
    .replace(/\s+/g, " ")
    .replace(/\s*(==|!=|>=|<=|=|>|<)\s*/g, " $1 ")
    .replace(/\s*\|\s*/g, " | ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s*:\s*/g, ": ")
    .replace(/\s*\.\s*/g, ".")
    .replace(/\[\s+/g, "[")
    .replace(/\s+\]/g, "]")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\s+/g, " ");
}

function splitStringSafeSegments(source: string): Array<{ text: string; quoted: boolean }> {
  const segments: Array<{ text: string; quoted: boolean }> = [];
  let current = "";
  let quote: "'" | '"' | undefined;
  let escaped = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];

    if (!char) continue;

    if (quote) {
      current += char;

      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        segments.push({ text: current, quoted: true });
        current = "";
        quote = undefined;
      }

      continue;
    }

    if (char === "'" || char === '"') {
      if (current) {
        segments.push({ text: current, quoted: false });
      }

      quote = char;
      current = char;
      continue;
    }

    current += char;
  }

  if (current) {
    segments.push({ text: current, quoted: quote !== undefined });
  }

  return segments;
}
