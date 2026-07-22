// Plain text sanitization to prevent XSS without dangerouslySetInnerHTML

export function sanitizeText(text) {
  if (typeof text !== "string") return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function validateMessageLength(text, min = 1, max = 1000) {
  const trimmed = (text || "").trim();
  return trimmed.length >= min && trimmed.length <= max;
}

export const AUTHOR_OPTIONS = ["Raina", "Aparna", "Saayra"];
