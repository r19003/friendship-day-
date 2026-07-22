import React from "react";

export default function ReactionButton({ emoji, count, onReact, reacted }) {
  return (
    <button
      className={`reaction-btn${reacted ? " reacted" : ""}`}
      onClick={() => onReact(emoji)}
      aria-label={`React with ${emoji}, ${count || 0} reactions`}
      aria-pressed={reacted}
    >
      <span aria-hidden="true">{emoji}</span>
      {count > 0 && <span className="reaction-count">{count}</span>}
    </button>
  );
}
