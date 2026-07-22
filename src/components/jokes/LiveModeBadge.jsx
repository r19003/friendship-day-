import React from "react";

export default function LiveModeBadge({ isLive }) {
  if (isLive) {
    return (
      <span className="live-badge" aria-label="Live updates enabled">
        <span className="live-dot" aria-hidden="true" />
        Live
      </span>
    );
  }
  return (
    <span className="offline-badge" aria-label="Showing saved posts">
      📦 Saved Posts
    </span>
  );
}
