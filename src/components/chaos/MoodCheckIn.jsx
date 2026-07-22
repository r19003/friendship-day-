import React, { useState } from "react";
import { Smile } from "lucide-react";
import { useMoodCheckins } from "../../hooks/useMoodCheckins";

const MOOD_OPTIONS = [
  { label: "Happy", emoji: "😊" },
  { label: "Tired", emoji: "😴" },
  { label: "Excited", emoji: "🥳" },
  { label: "Missing You Both", emoji: "🥹" },
  { label: "Stressed", emoji: "🤯" },
  { label: "Proud", emoji: "🌟" },
  { label: "Chaotic", emoji: "🤪" },
  { label: "Need a Night Stay", emoji: "🌙" },
  { label: "Need Food", emoji: "🍜" },
  { label: "Need BTS", emoji: "💜" },
];

export default function MoodCheckIn() {
  const { currentMoods, updateMood, currentUserRole } = useMoodCheckins();
  const [selectedMood, setSelectedMood] = useState("Happy");
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMood(selectedMood, note);
    setNote("");
    setShowModal(false);
  };

  const friends = [
    { name: "Raina", colorClass: "tag-raina" },
    { name: "Aparna", colorClass: "tag-aparna" },
    { name: "Saayra", colorClass: "tag-saayra" },
  ];

  const activeMoodCount = Object.keys(currentMoods).length;

  return (
    <section id="mood-checkin" className="mood-checkin-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-yellow)", justifyContent: "center" }}>
            💖 Live Friend Check-In
          </span>
          <h2 className="section-title" style={{ color: "white", marginBottom: "0.5rem" }}>
            How Are We Doing Today?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 540, marginInline: "auto" }}>
            Share your current vibe and a short note with the trio.
          </p>
          <button
            className="primary-button btn-daisy"
            style={{ marginTop: "1rem", fontSize: "0.88rem" }}
            onClick={() => setShowModal(true)}
          >
            ✏️ Update My Mood ({currentUserRole})
          </button>
        </div>

        {/* Hanging Trio Tags */}
        {activeMoodCount === 0 ? (
          <div className="premium-empty-state" style={{ color: "white" }}>
            <div className="premium-empty-state__icon">
              <Smile size={44} style={{ color: "var(--chaos-yellow)" }} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
              Nobody Has Checked In Yet Today
            </h3>
            <p style={{ opacity: 0.8, fontSize: "0.95rem", maxWidth: 440, marginInline: "auto" }}>
              Be the first to check in as {currentUserRole} using the button above.
            </p>
          </div>
        ) : (
          <div className="mood-tags-container">
            {friends.map((friend) => {
              const data = currentMoods[friend.name];
              if (!data) return null;

              const moodObj = MOOD_OPTIONS.find((m) => m.label === data.mood) || MOOD_OPTIONS[0];

              return (
                <div key={friend.name} className={`mood-hanging-tag ${friend.colorClass}`}>
                  <div className="tag-string" />
                  <div className="tag-hole" />
                  <div className="tag-body">
                    <span className="tag-author">{friend.name}</span>
                    <div className="tag-emoji">{moodObj.emoji}</div>
                    <span className="tag-mood-name">{data.mood || "Happy"}</span>
                    {data.note && <p className="tag-note">"{data.note}"</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mood Selector Modal */}
      {showModal && (
        <div className="upload-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="upload-modal-container" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: "white", fontSize: "1.3rem", marginBottom: "1rem" }}>
              Update Mood as {currentUserRole}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mood-picker-grid">
                {MOOD_OPTIONS.map((m) => (
                  <button
                    key={m.label}
                    type="button"
                    className={`mood-chip ${selectedMood === m.label ? "selected" : ""}`}
                    onClick={() => setSelectedMood(m.label)}
                  >
                    {m.emoji} {m.label}
                  </button>
                ))}
              </div>

              <input
                type="text"
                className="upload-input"
                style={{ marginTop: "1rem" }}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional short note (max 200 chars)..."
                maxLength={200}
              />

              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginTop: "1.25rem" }}>
                <button type="button" className="cancel-reply-btn" onClick={() => setShowModal(false)} style={{ color: "white" }}>
                  Cancel
                </button>
                <button type="submit" className="primary-button btn-daisy">
                  Save Mood Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
