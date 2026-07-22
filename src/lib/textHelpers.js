// ══════════════════════════════════════════
// TEXT HELPERS — Safe Text Processing
// ══════════════════════════════════════════

/**
 * Safely split a string or filter an array into clean string tokens.
 * Prevents runtime errors when value is undefined, null, number, object, or array.
 * @param {any} value - Input string or array
 * @param {string} separator - Separator for string splitting (default " ")
 * @returns {string[]} Array of non-empty string parts
 */
export function safeSplit(value, separator = " ") {
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean);
  }

  if (typeof value !== "string" || !value) {
    return [];
  }

  return value
    .split(separator)
    .map((part) => part.trim())
    .filter(Boolean);
}
