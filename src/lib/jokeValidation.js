// Joke validation and sanitization
const MAX_CONTENT_LENGTH = 280;
const MIN_CONTENT_LENGTH = 3;

export function validateJokeContent(content) {
  const trimmed = content.trim();
  if (trimmed.length < MIN_CONTENT_LENGTH) {
    return { valid: false, error: "Message is too short." };
  }
  if (trimmed.length > MAX_CONTENT_LENGTH) {
    return { valid: false, error: `Message must be ${MAX_CONTENT_LENGTH} characters or less.` };
  }
  return { valid: true, error: null };
}

export function sanitizeContent(content) {
  return content
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .slice(0, MAX_CONTENT_LENGTH);
}

export const MAX_LENGTH = MAX_CONTENT_LENGTH;
