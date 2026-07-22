import React, { useState } from "react";
import { messageWallCategories, messageWallColors } from "../../data/sharedChaosData";
import { validateMessageLength } from "../../lib/messageValidation";

export default function MessageWallForm({ onSubmit, currentUserRole }) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("For All Three");
  const [noteColor, setNoteColor] = useState("lavender");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateMessageLength(content, 3, 1500)) return;

    onSubmit({ content, category, noteColor });
    setContent("");
    setIsOpen(false);
  };

  return (
    <div className="message-wall-form-wrapper">
      {!isOpen ? (
        <button className="primary-button btn-chaos" onClick={() => setIsOpen(true)}>
          ✍️ Leave a Message on the Wall
        </button>
      ) : (
        <form className="message-wall-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3 style={{ color: "white", fontSize: "1.3rem" }}>Leave Something Here for Us</h3>
            <button type="button" onClick={() => setIsOpen(false)} className="close-form-btn">
              ✕
            </button>
          </div>

          {/* Note color picker */}
          <div className="color-picker-row">
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>Note Color:</span>
            {messageWallColors.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`color-dot ${noteColor === c.id ? "selected" : ""}`}
                style={{ background: c.bg }}
                onClick={() => setNoteColor(c.id)}
                title={c.label}
              />
            ))}
          </div>

          {/* Category selector */}
          <div className="category-select-row">
            <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="wall-category-select"
            >
              {messageWallCategories.filter((cat) => cat !== "All").map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <textarea
            className="wall-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Write a note to the trio as ${currentUserRole}…`}
            rows={4}
            maxLength={1500}
            required
          />

          <div className="wall-form-footer">
            <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>{content.length} / 1500</span>
            <button
              type="submit"
              className="primary-button btn-daisy"
              disabled={!validateMessageLength(content, 3, 1500)}
            >
              📌 Pin Note to Wall
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
