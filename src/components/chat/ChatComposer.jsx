import React, { useState } from "react";
import { Send, X } from "lucide-react";
import { validateMessageLength } from "../../lib/messageValidation";

export default function ChatComposer({
  onSend,
  onTyping,
  replyingTo,
  onCancelReply,
  currentUserRole,
}) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
    if (onTyping) onTyping();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateMessageLength(text) || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onSend(text);
    if (success) {
      setText("");
    }
    setIsSubmitting(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const charCount = text.trim().length;

  return (
    <form className="chat-composer" onSubmit={handleSubmit}>
      {/* Reply Banner */}
      {replyingTo && (
        <div className="composer-reply-banner">
          <div className="reply-banner-info">
            <span>Replying to <strong>{replyingTo.author_name}</strong>:</span>
            <p>{replyingTo.content}</p>
          </div>
          <button type="button" onClick={onCancelReply} className="cancel-reply-btn">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="composer-input-row">
        <textarea
          className="composer-textarea"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={`Type a message as ${currentUserRole}… (Shift+Enter for new line)`}
          rows={1}
          maxLength={1000}
        />

        <button
          type="submit"
          className="composer-send-btn"
          disabled={!validateMessageLength(text) || isSubmitting}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>

      {charCount > 800 && (
        <div className="composer-char-count">{charCount} / 1000</div>
      )}
    </form>
  );
}
