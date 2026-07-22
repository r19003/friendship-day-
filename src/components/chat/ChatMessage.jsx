import React, { useState } from "react";
import { Trash2, Reply } from "lucide-react";
import { formatTime } from "../../lib/dateFormat";

const SENDER_CLASS_MAP = {
  Raina: "chat-message--raina",
  Aparna: "chat-message--aparna",
  Saayra: "chat-message--saayra",
};

const SENDER_EMOJI_MAP = {
  Raina: "⭐",
  Aparna: "🌼",
  Saayra: "☀️",
};

const CHAT_REACTIONS = ["💜", "😂", "🥹", "🍔", "🍜", "☕"];

export default function ChatMessage({
  message,
  currentUserRole,
  onDelete,
  onReply,
}) {
  const [reactions, setReactions] = useState(message.reactions || {});

  const isOwner = message.author_name === currentUserRole;
  const senderClass = SENDER_CLASS_MAP[message.author_name] || "chat-message--raina";
  const avatarEmoji = SENDER_EMOJI_MAP[message.author_name] || "⭐";

  const handleAddReaction = (emoji) => {
    setReactions((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));
  };

  return (
    <div className={`chat-message ${senderClass}`}>
      <div className="chat-message__avatar" title={message.author_name}>
        {avatarEmoji}
      </div>

      <div className="chat-message__content">
        <div className="chat-message__header">
          <span className="chat-author">{message.author_name}</span>
          <span className="chat-time">{formatTime(message.created_at)}</span>
        </div>

        {/* Reply preview if replying to another message */}
        {message.reply_author && (
          <div className="chat-reply-preview">
            <span className="reply-author">Replying to {message.reply_author}:</span>
            <span className="reply-text">{message.reply_content}</span>
          </div>
        )}

        <div className="chat-message__bubble">
          <p>{message.content}</p>

          {/* Reaction chips */}
          {Object.keys(reactions).length > 0 && (
            <div className="chat-reactions-list">
              {Object.entries(reactions).map(([emoji, count]) => (
                <span key={emoji} className="chat-reaction-chip">
                  {emoji} {count}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Message Actions */}
        <div className="chat-message-actions">
          <div className="reaction-picker">
            {CHAT_REACTIONS.map((emoji) => (
              <button key={emoji} onClick={() => handleAddReaction(emoji)} className="picker-btn">
                {emoji}
              </button>
            ))}
          </div>

          <button className="action-btn" onClick={() => onReply(message)} title="Reply">
            <Reply size={13} />
          </button>

          {isOwner && (
            <button className="action-btn delete" onClick={() => onDelete(message.id)} title="Delete message">
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
