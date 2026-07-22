import React, { useState } from "react";
import { Send, Trash2 } from "lucide-react";
import { useMediaComments } from "../../hooks/useMediaComments";
import { formatTime } from "../../lib/dateFormat";

export function MediaComments({ mediaId }) {
  const { comments, addComment, deleteComment, userRole } = useMediaComments(mediaId);
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const ok = await addComment(text);
    if (ok) setText("");
  };

  return (
    <div className="media-comments-panel">
      <h4 style={{ color: "var(--chaos-yellow)", fontSize: "1rem", marginBottom: "0.75rem" }}>
        💬 Memory Comments ({comments.length})
      </h4>

      <div className="comments-list">
        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <div className="comment-header">
              <span className="comment-author">{c.author_name}</span>
              <span className="comment-time">{formatTime(c.created_at)}</span>
            </div>
            <p className="comment-body">{c.content}</p>
            {c.author_name === userRole && (
              <button className="comment-delete-btn" onClick={() => deleteComment(c.id)} title="Delete comment">
                <Trash2 size={12} />
              </button>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          className="comment-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Add a comment as ${userRole}…`}
          maxLength={500}
        />
        <button type="submit" className="comment-submit-btn" disabled={!text.trim()}>
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}

export function MediaReactions({ mediaId }) {
  const [reactions, setReactions] = useState({ "💜": 3, "🌼": 2, "☀️": 4, "🥹": 1 });

  const EMOJIS = ["💜", "🌼", "☀️", "😂", "🥹", "⭐", "🫂"];

  const handleReact = (emoji) => {
    setReactions((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));
  };

  return (
    <div className="media-reactions-bar">
      {EMOJIS.map((emoji) => {
        const count = reactions[emoji] || 0;
        return (
          <button
            key={emoji}
            className={`media-reaction-chip ${count > 0 ? "active" : ""}`}
            onClick={() => handleReact(emoji)}
          >
            {emoji} {count > 0 && <span className="chip-count">{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
