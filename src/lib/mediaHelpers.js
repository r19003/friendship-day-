// Safe image and video fallback helpers

export function getMediaSrc(item) {
  if (!item) return "/images/placeholder.webp";
  return item.src || item.fallbackSrc || "/images/placeholder.webp";
}

export function getPosterSrc(item) {
  if (!item) return "";
  return item.poster || item.fallbackPoster || "";
}

export function normalizeMemoryItem(item) {
  if (!item || typeof item !== "object") {
    return null;
  }

  const src = item.media_url || item.src || "";
  const poster = item.poster_url || item.poster || item.thumbnail_url || "";

  let type = item.media_type || item.type || "";

  if (type !== "image" && type !== "video") {
    if (/\.(mp4|webm|mov)$/i.test(src)) {
      type = "video";
    } else if (src) {
      type = "image";
    } else {
      type = "";
    }
  }

  if (!type || (!src && !poster)) {
    return null;
  }

  return {
    ...item,
    type,
    src,
    poster,
  };
}

export const PLACEHOLDER_IMAGES = {
  college: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  bts: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
  food: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
  night: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
  default: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
};
