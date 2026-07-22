import React, { useState } from "react";
import { Play } from "lucide-react";
import { getPosterSrc, PLACEHOLDER_IMAGES } from "../../lib/mediaHelpers";

export default function VideoMemoryCard({ item, onClick }) {
  const [posterError, setPosterError] = useState(false);

  const posterSrc = posterError
    ? PLACEHOLDER_IMAGES.bts
    : getPosterSrc(item) || PLACEHOLDER_IMAGES.bts;

  return (
    <div
      className="video-memory-card"
      onClick={() => onClick(item)}
      tabIndex={0}
      role="button"
      aria-label={`Play video memory: ${item.caption || item.alt || "Video memory"}`}
      onKeyDown={(e) => e.key === "Enter" && onClick(item)}
    >
      <div className="film-strip-top" aria-hidden="true" />

      <div className="video-memory-card__poster">
        <img
          src={posterSrc}
          alt={item.alt || item.caption || "Video poster"}
          loading="lazy"
          onError={() => setPosterError(true)}
          style={{ "--object-position": item.objectPosition || "center" }}
        />

        <div className="video-memory-card__play">
          <Play size={24} fill="currentColor" />
        </div>

        <span className="video-tag">🎬 Video</span>
      </div>

      <div className="video-card-info">
        <p className="video-caption">{item.caption}</p>
        {item.handwrittenNote && <p className="handwritten-note">{item.handwrittenNote}</p>}
        {item.date && <span className="video-date">{item.date}</span>}
      </div>

      <div className="film-strip-bottom" aria-hidden="true" />
    </div>
  );
}
