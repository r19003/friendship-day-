import React, { useState } from "react";
import { useRealtime } from "../realtime/RealtimeProvider";

const INITIAL_SUGGESTIONS = [
  { id: "cs-1", author_name: "Saayra", caption_type: "funny", content: "We spent 20 minutes getting the angle right and 2 seconds eating." },
  { id: "cs-2", author_name: "Aparna", caption_type: "emotional", content: "One of those quiet days where everything felt right." },
];

export default function CaptionSuggestions({ mediaId }) {
  const { userRole } = useRealtime();
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
  const [captionType, setCaptionType] = useState("funny");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newSuggestion = {
      id: "cs_" + Math.random().toString(36).substring(2, 9),
      author_name: userRole,
      caption_type: captionType,
      content: content.trim(),
    };

    setSuggestions((prev) => [...prev, newSuggestion]);
    setContent("");
    setShowForm(false);
  };

  return (
    <div className="caption-suggestions-panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <h4 style={{ color: "var(--chaos-yellow)", fontSize: "0.95rem" }}>
          📜 Three Versions of This Memory
        </h4>
        <button className="text-link-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Suggest Caption"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="caption-suggest-form">
          <select value={captionType} onChange={(e) => setCaptionType(e.target.value)} className="upload-input">
            <option value="funny">😂 Funny Version</option>
            <option value="emotional">🥹 Emotional Version</option>
            <option value="context">📌 Context Note</option>
            <option value="what-really-happened">🤫 What Really Happened</option>
          </select>
          <input
            type="text"
            className="upload-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your alternative perspective..."
            maxLength={500}
            required
          />
          <button type="submit" className="primary-button btn-daisy" style={{ width: "100%", marginTop: "0.5rem" }}>
            Submit Suggestion
          </button>
        </form>
      )}

      <div className="suggestions-list">
        {suggestions.map((s) => (
          <div key={s.id} className="suggestion-item">
            <span className="sug-author">{s.author_name} ({s.caption_type}):</span>
            <p className="sug-text">"{s.content}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
