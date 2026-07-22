import React, { useState } from "react";
import { getMediaSrc, PLACEHOLDER_IMAGES } from "../../lib/mediaHelpers";

export default function MediaCard({ item, onClick, frameStyle = "classic" }) {
  const [imgError, setImgError] = useState(false);

  const imgSrc = imgError
    ? PLACEHOLDER_IMAGES[item.category?.toLowerCase()] || PLACEHOLDER_IMAGES.default
    : getMediaSrc(item);

  return (
    <div
      className={`media-card frame-${frameStyle}`}
      style={{ "--card-rotation": `${item.rotation || 0}deg` }}
      onClick={() => onClick(item)}
      tabIndex={0}
      role="button"
      aria-label={`View media: ${item.caption || item.alt || "Memory"}`}
      onKeyDown={(e) => e.key === "Enter" && onClick(item)}
    >
      <div className="media-card-img-wrapper">
        <img
          src={imgSrc}
          alt={item.alt || item.caption || "Friendship memory"}
          loading="lazy"
          style={{ objectPosition: item.objectPosition || "center" }}
          onError={() => setImgError(true)}
        />
        {item.category && <span className="media-category-badge">{item.category}</span>}
      </div>

      {(item.caption || item.handwrittenNote) && (
        <div className="media-card-caption">
          {item.handwrittenNote ? (
            <p className="handwritten-note">{item.handwrittenNote}</p>
          ) : (
            <p className="caption-text">{item.caption}</p>
          )}
          {item.date && <span className="media-date">{item.date}</span>}
        </div>
      )}
    </div>
  );
}
