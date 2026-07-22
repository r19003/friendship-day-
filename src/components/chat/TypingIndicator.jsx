import React from "react";

export function TypingIndicator({ typingUsers = [] }) {
  if (typingUsers.length === 0) return null;

  const text = typingUsers.length === 1
    ? `${typingUsers[0]} is typing…`
    : `${typingUsers.join(" and ")} are typing…`;

  return (
    <div className="chat-typing-indicator">
      <div className="typing-dots">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
      <span className="typing-text">{text}</span>
    </div>
  );
}

export function ChatDateDivider({ label }) {
  return (
    <div className="chat-date-divider">
      <span className="date-label">{label}</span>
    </div>
  );
}

export function NewMessageIndicator({ onClick }) {
  return (
    <button className="new-message-indicator" onClick={onClick}>
      ⬇️ New messages
    </button>
  );
}
