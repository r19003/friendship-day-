import React, { useState } from "react";
import { Lock, Unlock, Mail, PlusCircle } from "lucide-react";
import { useMemoryCapsules } from "../../hooks/useMemoryCapsules";
import { formatDateDivider } from "../../lib/dateFormat";

export default function MemoryCapsules() {
  const { capsules, addCapsule, deleteCapsule, userRole } = useMemoryCapsules();
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [recipient, setRecipient] = useState("All Three");
  const [unlockAt, setUnlockAt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !unlockAt) return;

    addCapsule({
      title,
      content,
      recipient,
      unlockAt: new Date(unlockAt).toISOString(),
    });

    setTitle("");
    setContent("");
    setUnlockAt("");
    setShowAddForm(false);
  };

  return (
    <section id="memory-capsules" className="memory-capsules-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-yellow)", justifyContent: "center" }}>
            ✉️ Time Capsules
          </span>
          <h2 className="section-title" style={{ color: "white", marginBottom: "0.5rem" }}>
            Open This Later
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 580, marginInline: "auto" }}>
            Sealed messages and memories set to unlock on future dates, reunions, or celebrations.
          </p>
          <button
            className="primary-button btn-chaos"
            style={{ marginTop: "1rem", fontSize: "0.88rem" }}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <PlusCircle size={16} /> Seal a New Capsule
          </button>
        </div>

        {/* Add Capsule Form */}
        {showAddForm && (
          <form className="capsule-form" onSubmit={handleSubmit}>
            <h3 style={{ color: "white", marginBottom: "1rem", fontSize: "1.2rem" }}>Seal a Memory Capsule</h3>
            <input
              type="text"
              className="upload-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Capsule Title (e.g. Next Friendship Day 2027)..."
              required
            />
            <div style={{ display: "flex", gap: "0.75rem", marginBlock: "0.75rem" }}>
              <select value={recipient} onChange={(e) => setRecipient(e.target.value)} className="upload-input">
                <option value="All Three">Target: All Three</option>
                <option value="Raina">Target: Raina</option>
                <option value="Aparna">Target: Aparna</option>
                <option value="Saayra">Target: Saayra</option>
              </select>
              <input
                type="date"
                className="upload-input"
                value={unlockAt}
                onChange={(e) => setUnlockAt(e.target.value)}
                required
              />
            </div>
            <textarea
              className="upload-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the hidden message inside..."
              rows={4}
              maxLength={3000}
              required
            />
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginTop: "1rem" }}>
              <button type="button" className="cancel-reply-btn" onClick={() => setShowAddForm(false)} style={{ color: "white" }}>
                Cancel
              </button>
              <button type="submit" className="primary-button btn-daisy">
                ✉️ Seal Capsule
              </button>
            </div>
          </form>
        )}

        {/* Capsule Grid */}
        {capsules.length === 0 ? (
          <div className="premium-empty-state" style={{ color: "white" }}>
            <div className="premium-empty-state__icon">
              <Mail size={44} style={{ color: "var(--chaos-yellow)" }} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
              The Future Currently Has No Mail
            </h3>
            <p style={{ opacity: 0.8, fontSize: "0.95rem", maxWidth: 440, marginInline: "auto" }}>
              Seal a message to be unlocked on a future birthday, graduation, or reunion date.
            </p>
          </div>
        ) : (
          <div className="capsules-grid">
            {capsules.map((cap) => {
              const isUnlocked = new Date(cap.unlock_at) <= new Date();

              return (
                <div
                  key={cap.id}
                  className={`memory-capsule ${isUnlocked ? "unlocked" : "memory-capsule--locked"}`}
                >
                  <div className="capsule-header">
                    <span className="capsule-icon">{isUnlocked ? <Unlock size={20} /> : <Lock size={20} />}</span>
                    <span className="capsule-recipient">To: {cap.recipient}</span>
                  </div>

                  <h3 className="capsule-title">{cap.title}</h3>
                  <p className="capsule-creator">Sealed by {cap.author_name}</p>

                  {isUnlocked ? (
                    <div className="capsule-content-unlocked">
                      <p>{cap.content}</p>
                      <span className="capsule-date-tag">Unlocked on {formatDateDivider(cap.unlock_at)}</span>
                    </div>
                  ) : (
                    <div className="capsule-content-locked">
                      <Mail size={32} style={{ opacity: 0.5, marginBlock: "0.5rem" }} />
                      <p className="locked-notice">🔒 Unlocks on {formatDateDivider(cap.unlock_at)}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
