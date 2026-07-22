// ══════════════════════════════════════════
// SPOTIFY HELPER UTILITIES
// ══════════════════════════════════════════

export function getSpotifyEmbedUrl(url) {
  if (!url || typeof url !== "string") {
    return "";
  }

  try {
    const trimmed = url.trim();

    // If it's already an embed URL, extract playlist ID and return clean embed URL
    if (trimmed.includes("open.spotify.com/embed/playlist/")) {
      const parsed = new URL(trimmed);
      const parts = parsed.pathname.split("/").filter(Boolean);
      const pIdx = parts.indexOf("playlist");
      if (pIdx !== -1 && parts[pIdx + 1]) {
        return `https://open.spotify.com/embed/playlist/${parts[pIdx + 1]}`;
      }
      return trimmed;
    }

    const parsedUrl = new URL(trimmed);

    if (
      parsedUrl.hostname !== "open.spotify.com" &&
      parsedUrl.hostname !== "www.open.spotify.com"
    ) {
      return "";
    }

    const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
    const playlistIndex = pathParts.indexOf("playlist");

    if (playlistIndex === -1 || !pathParts[playlistIndex + 1]) {
      return "";
    }

    const playlistId = pathParts[playlistIndex + 1];

    return `https://open.spotify.com/embed/playlist/${playlistId}`;
  } catch {
    return "";
  }
}
