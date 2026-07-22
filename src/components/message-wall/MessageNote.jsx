import React from "react";
import { Trash2 } from "lucide-react";
import { formatRelativeTime } from "../../lib/dateFormat";
import { messageWallColors } from "../../data/sharedChaosData";

const REACTION_EMOJIS = ["💜", "🌼", "☀️", "🫂", "🥹", "😂", "⭐"];

export default function MessageNote({ note, currentUserRole, onDelete, onReact }) {
  const isOwner = note.author_name === currentUserRole;
  const colorObj = messageWallColors.find((c) => c.id === note.note_color) || messageWallColors[0];

  return (
    <div
      className={`message-wall-note ${note.is_pinned ? "pinned" : ""}`}
      style={{
        backgroundColor: colorObj.bg,
        color: colorObj.text,
        "--note-rotation": `${(Math.random() * 4 - 2).toFixed(1)}deg`,
      }}
    >
      {/* Decorative Washi Tape or Pin */}
      {note.is_pinned ? <span className="note-pushpin">📌</span> : <div className="note-washi-tape" />}

      <div className="note-header">
        <span className="note-author">From: <strong>{note.author_name}</strong></span>
        <span className="note-time">{formatRelativeTime(note.created_at)}</span>
      </div>

      {note.category && <span className="note-category-badge">{note.category}</span>}

      <p className="note-content handwritten-note">{note.content}</p>

      {/* Reactions Bar */}
      <div className="note-footer">
        <div className="note-reactions">
          {REACTION_EMOJIS.map((emoji) => {
            const count = (note.reactions || {})[emoji] || 0;
            return (
              <button
                key={emoji}
                className={`note-reaction-btn ${count > 0 ? "active" : ""}`}
                onClick={() => onReact(note.id, emoji)}
              >
                {emoji} {count > 0 && count}
              </button>
            );
          })}
        </div>

        {isOwner && (
          <button className="note-delete-btn" onClick={() => onDelete(note.id)} title="Delete note">
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
