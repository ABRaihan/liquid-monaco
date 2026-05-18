import { indentText, type LiquidFormatterOptions } from "./liquid-format.types";

type EmbeddedRegion = {
  startLineIndex: number;
  endLineIndex: number;
  language: "css" | "javascript";
};

export function formatEmbeddedRegions(source: string, options: LiquidFormatterOptions): string {
  const lines = source.split("\n");
  const regions = collectEmbeddedRegions(lines);

  for (let index = regions.length - 1; index >= 0; index -= 1) {
    const region = regions[index];
    if (!region) continue;

    const body = lines.slice(region.startLineIndex + 1, region.endLineIndex).join("\n");
    const baseIndentLevel = getIndentLevel(lines[region.startLineIndex] ?? "", options);
    const formattedBody = region.language === "css" ? formatCss(body, options) : formatJavaScript(body, options);
    const indentedBody = indentFormattedBody(formattedBody, baseIndentLevel + 1, options);

    lines.splice(region.startLineIndex + 1, region.endLineIndex - region.startLineIndex - 1, ...indentedBody);
  }

  return lines.join("\n");
}

function collectEmbeddedRegions(lines: string[]): EmbeddedRegion[] {
  const regions: EmbeddedRegion[] = [];
  const stack: Array<{ startLineIndex: number; language: "css" | "javascript" }> = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const current = stack[stack.length - 1];

    if (current) {
      if (
        (current.language === "css" && (isLiquidStylesheetClose(trimmed) || isHtmlCloseTag(trimmed, "style"))) ||
        (current.language === "javascript" && isHtmlCloseTag(trimmed, "script"))
      ) {
        regions.push({ ...current, endLineIndex: index });
        stack.pop();
      }

      return;
    }

    if (isLiquidStylesheetOpen(trimmed) || isHtmlOpenTag(trimmed, "style")) {
      stack.push({ startLineIndex: index, language: "css" });
      return;
    }

    if (isHtmlOpenTag(trimmed, "script")) {
      stack.push({ startLineIndex: index, language: "javascript" });
    }
  });

  return regions;
}

function isLiquidStylesheetOpen(line: string): boolean {
  return /^\{%-?\s*stylesheet\b.*-?%\}$/.test(line);
}

function isLiquidStylesheetClose(line: string): boolean {
  return /^\{%-?\s*endstylesheet\b.*-?%\}$/.test(line);
}

function isHtmlOpenTag(line: string, tagName: "style" | "script"): boolean {
  return new RegExp(String.raw`^<${tagName}\b[^>]*>$`, "i").test(line);
}

function isHtmlCloseTag(line: string, tagName: "style" | "script"): boolean {
  return new RegExp(String.raw`^<\/${tagName}\s*>$`, "i").test(line);
}

function indentFormattedBody(source: string, indentLevel: number, options: LiquidFormatterOptions): string[] {
  const indent = indentText(indentLevel, options);
  const lines = source.split("\n").filter((line) => line.trim().length > 0);

  return lines.map((line) => `${indent}${line}`);
}

function getIndentLevel(line: string, options: LiquidFormatterOptions): number {
  const leadingWhitespace = line.match(/^\s*/)?.[0] ?? "";
  if (!leadingWhitespace) return 0;
  if (!options.insertSpaces) return leadingWhitespace.replace(/ /g, "").length;

  return Math.floor(leadingWhitespace.length / options.tabSize);
}

function formatCss(source: string, options: LiquidFormatterOptions): string {
  const lines: string[] = [];
  let current = "";
  let indentLevel = 0;
  let insideBlock = false;
  let quote: "'" | '"' | undefined;
  let inComment = false;

  const pushCurrent = (): void => {
    const value = current.trim();
    if (!value) {
      current = "";
      return;
    }

    lines.push(`${indentText(indentLevel, options)}${value}`);
    current = "";
  };

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (!char) continue;

    if (inComment) {
      current += char;
      if (char === "*" && next === "/") {
        current += next;
        index += 1;
        inComment = false;
        pushCurrent();
      }
      continue;
    }

    if (quote) {
      current += char;
      if (char === "\\") {
        current += next ?? "";
        index += next ? 1 : 0;
      } else if (char === quote) {
        quote = undefined;
      }
      continue;
    }

    if (char === "/" && next === "*") {
      pushCurrent();
      current = "/*";
      index += 1;
      inComment = true;
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      current += char;
      continue;
    }

    if (char === "{") {
      current = `${current.trim()} {`;
      pushCurrent();
      indentLevel += 1;
      insideBlock = true;
      continue;
    }

    if (char === "}") {
      pushCurrent();
      indentLevel = Math.max(indentLevel - 1, 0);
      lines.push(`${indentText(indentLevel, options)}}`);
      insideBlock = false;
      continue;
    }

    if (char === ";") {
      current = `${current.trim()};`;
      pushCurrent();
      continue;
    }

    if (char === ":" && insideBlock) {
      current = `${current.trimEnd()}: `;
      continue;
    }

    if (!/\s/.test(char) || (current && !/\s$/.test(current))) {
      current += char;
    }
  }

  pushCurrent();
  return lines.join("\n");
}

function formatJavaScript(source: string, options: LiquidFormatterOptions): string {
  const lines: string[] = [];
  let current = "";
  let indentLevel = 0;
  let quote: "'" | '"' | "`" | undefined;
  let inLineComment = false;
  let inBlockComment = false;

  const pushCurrent = (): void => {
    const value = normalizeJavaScriptStatement(current);
    if (!value) {
      current = "";
      return;
    }

    lines.push(`${indentText(indentLevel, options)}${value}`);
    current = "";
  };

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (!char) continue;

    if (inLineComment) {
      current += char;
      if (char === "\n") {
        inLineComment = false;
        pushCurrent();
      }
      continue;
    }

    if (inBlockComment) {
      current += char;
      if (char === "*" && next === "/") {
        current += next;
        index += 1;
        inBlockComment = false;
        pushCurrent();
      }
      continue;
    }

    if (quote) {
      current += char;
      if (char === "\\") {
        current += next ?? "";
        index += next ? 1 : 0;
      } else if (char === quote) {
        quote = undefined;
      }
      continue;
    }

    if (char === "/" && next === "/") {
      pushCurrent();
      current = "//";
      index += 1;
      inLineComment = true;
      continue;
    }

    if (char === "/" && next === "*") {
      pushCurrent();
      current = "/*";
      index += 1;
      inBlockComment = true;
      continue;
    }

    if (char === "'" || char === '"' || char === "`") {
      quote = char;
      current += char;
      continue;
    }

    if (char === "{") {
      current = `${current.trim()} {`;
      pushCurrent();
      indentLevel += 1;
      continue;
    }

    if (char === "}") {
      pushCurrent();
      indentLevel = Math.max(indentLevel - 1, 0);
      current = "}";
      continue;
    }

    if (char === ";") {
      current = `${current.trim()};`;
      pushCurrent();
      continue;
    }

    if (char === "\n") {
      pushCurrent();
      continue;
    }

    current += char;
  }

  pushCurrent();
  return lines.map(ensureJavaScriptSemicolon).join("\n");
}

function normalizeJavaScriptStatement(source: string): string {
  const segments = splitQuotedJavaScriptSegments(source.trim());

  return segments
    .map((segment) =>
      segment.quoted
        ? segment.text
        : segment.text
            .replace(/\s+/g, " ")
            .replace(/\s*(===|!==|==|!=|>=|<=|\+=|-=|\*=|\/=|%=|=|>|<)\s*/g, " $1 ")
            .replace(/\s*,\s*/g, ", ")
            .replace(/\s+\)/g, ")")
            .replace(/\(\s+/g, "(")
            .replace(/\s+/g, " "),
    )
    .join("")
    .trim();
}

function ensureJavaScriptSemicolon(line: string): string {
  const trimmed = line.trim();
  if (!trimmed || /[;{}:]$/.test(trimmed) || trimmed.startsWith("//") || trimmed.startsWith("/*")) return line;
  if (/^(const|let|var)\b/.test(trimmed) || /^[\w$.]+\s*\(/.test(trimmed)) return `${line};`;

  return line;
}

function splitQuotedJavaScriptSegments(source: string): Array<{ text: string; quoted: boolean }> {
  const segments: Array<{ text: string; quoted: boolean }> = [];
  let current = "";
  let quote: "'" | '"' | "`" | undefined;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];

    if (!char) continue;

    if (quote) {
      current += char;
      if (char === "\\") {
        current += source[index + 1] ?? "";
        index += source[index + 1] ? 1 : 0;
      } else if (char === quote) {
        segments.push({ text: current, quoted: true });
        current = "";
        quote = undefined;
      }
      continue;
    }

    if (char === "'" || char === '"' || char === "`") {
      if (current) {
        segments.push({ text: current, quoted: false });
        // current = "";
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
