export function isValidMediaType(type) {
  return type === "image" || type === "video";
}

export function sanitizeCaption(caption) {
  if (!caption || typeof caption !== "string") return "";
  return caption.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}
