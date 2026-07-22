import React, { useState } from "react";
import { Send } from "lucide-react";
import { MAX_LENGTH } from "../../lib/jokeValidation";

export default function JokeForm({ onSubmit, displayNames, categories, boardClass, submitClass, placeholder, warning }) {
  const [displayName, setDisplayName] = useState(displayNames[0]);
  const [category, setCategory] = useState(categories[1]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    setLocalError("");
    const result = await onSubmit({ content, display_name: displayName, category });
    setSubmitting(false);
    if (result?.error) {
      setLocalError(result.error);
    } else {
      setContent("");
    }
  }

  return (
    <form className={`joke-form-card ${boardClass}`} onSubmit={handleSubmit} noValidate>
      {warning && (
        <div className="joke-warning" role="note">
          <span>⚠️</span> {warning}
        </div>
      )}
      <div className="joke-form-row">
        <select
          className="joke-form-select"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          aria-label="Your name"
        >
          {displayNames.map((n) => <option key={n}>{n}</option>)}
        </select>
        <select
          className="joke-form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Category"
        >
          {categories.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <textarea
        className="joke-form-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder || "Write something..."}
        maxLength={MAX_LENGTH}
        aria-label="Message content"
        required
      />
      <div className="joke-char-count">
        {content.length}/{MAX_LENGTH}
      </div>
      {localError && <p style={{ color: "var(--danger)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{localError}</p>}
      <button
        type="submit"
        className={`joke-form-submit ${submitClass}`}
        disabled={submitting || !content.trim()}
        aria-busy={submitting}
      >
        <Send size={14} />
        {submitting ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
