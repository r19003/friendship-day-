import React from "react";
import { Camera } from "lucide-react";

export default function GalleryEmptyState({
  title = "This Memory Has Not Been Added Yet",
  message = "Upload a real photograph or video to place it in this chapter.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="premium-empty-state">
      <div className="premium-empty-state__icon">
        <Camera size={44} style={{ color: "var(--chaos-violet)", opacity: 0.8 }} />
      </div>
      <h3 style={{ color: "var(--chaos-text-dark)", fontSize: "1.4rem", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
        {title}
      </h3>
      <p style={{ color: "var(--chaos-text-muted)", fontSize: "0.95rem", maxWidth: 460, marginInline: "auto", lineHeight: 1.6 }}>
        {message}
      </p>
      {actionLabel && onAction && (
        <button className="primary-button btn-daisy" onClick={onAction} style={{ marginTop: "1.25rem", fontSize: "0.88rem" }}>
          ✨ {actionLabel}
        </button>
      )}
    </div>
  );
}
