const IDENTIFIER_PATTERN = "[A-Za-z_][\\w-]*";

export const IDENTIFIER_REGEXP = new RegExp(`^${IDENTIFIER_PATTERN}$`);

export function isIdentifier(value: string): boolean {
  return IDENTIFIER_REGEXP.test(value);
}

export function getIdentifierPrefix(value: string): string {
  const match = value.match(/[A-Za-z_][\w-]*$/);
  return match?.[0] ?? "";
}

export function splitOutsideQuotes(value: string, separator: string): string[] {
  const parts: string[] = [];
  let current = "";
  let quote: "'" | '"' | undefined;
  let escaped = false;

  for (const char of value) {
    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }

    if (char === "\\") {
      current += char;
      escaped = true;
      continue;
    }

    if (quote) {
      current += char;
      if (char === quote) {
        quote = undefined;
      }
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      current += char;
      continue;
    }

    if (char === separator) {
      parts.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  parts.push(current);
  return parts;
}

export function getLastSegmentOutsideQuotes(value: string, separator: string): string {
  const parts = splitOutsideQuotes(value, separator);
  return parts[parts.length - 1] ?? "";
}

export function getPropertyAccess(value: string): { path: string[]; prefix: string } | undefined {
  const match = value.match(new RegExp(`(${IDENTIFIER_PATTERN}(?:\\.${IDENTIFIER_PATTERN})*)\\.([\\w-]*)$`));
  if (!match) return undefined;

  return {
    path: match[1].split("."),
    prefix: match[2],
  };
}

export function getLeadingIdentifier(value: string): string | undefined {
  return value.trimStart().match(new RegExp(`^(${IDENTIFIER_PATTERN})\\b`))?.[1];
}

export function removeLeadingIdentifier(value: string): string {
  return value.trimStart().replace(new RegExp(`^${IDENTIFIER_PATTERN}\\b`), "");
}

export function getAssignmentValueExpression(value: string): string | undefined {
  const assignmentIndex = value.indexOf("=");
  if (assignmentIndex === -1) return undefined;

  return value.slice(assignmentIndex + 1);
}

export function isOnlyWhitespaceAndOptionalIdentifier(value: string): boolean {
  return /^\s*[A-Za-z_][\w-]*\s*$/.test(value) || /^\s*$/.test(value);
}
