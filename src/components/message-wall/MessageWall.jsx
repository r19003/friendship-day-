import React from "react";
import { Pin } from "lucide-react";
import { useMessageWall } from "../../hooks/useMessageWall";
import MessageWallForm from "./MessageWallForm";
import MessageNote from "./MessageNote";
import GalleryFilters from "../galleries/GalleryFilters";
import { messageWallCategories } from "../../data/sharedChaosData";

export default function MessageWall() {
  const {
    notes,
    addNote,
    deleteNote,
    toggleReaction,
    activeCategory,
    setActiveCategory,
    userRole,
  } = useMessageWall();

  return (
    <section id="message-wall" className="message-wall-section page-grain">
      <div className="content-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-yellow)", justifyContent: "center" }}>
            📌 Permanent Trio Pinboard
          </span>
          <h2 className="section-title" style={{ color: "white", marginBottom: "0.5rem" }}>
            Leave Something Here for Us
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: 620, marginInline: "auto", fontSize: "1.05rem" }}>
            A permanent wall for love, gratitude, jokes, future reminders, encouragement, and messages we may need on difficult days.
          </p>
          <p className="handwritten-note" style={{ color: "var(--chaos-lavender)", fontSize: "1.25rem", marginTop: "0.5rem" }}>
            "Some messages deserve to stay longer than a chat notification."
          </p>
        </div>

        {/* Note Form Trigger */}
        <MessageWallForm onSubmit={addNote} currentUserRole={userRole} />

        {/* Category Filters */}
        <div style={{ marginBlock: "2rem" }}>
          <GalleryFilters
            options={messageWallCategories}
            activeFilter={activeCategory}
            onSelectFilter={setActiveCategory}
          />
        </div>

        {/* Layered Pinboard Grid */}
        {notes.length === 0 ? (
          <div className="premium-empty-state" style={{ color: "white" }}>
            <div className="premium-empty-state__icon">
              <Pin size={44} style={{ color: "var(--chaos-yellow)" }} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
              The Wall Is Ready for Something Worth Keeping
            </h3>
            <p style={{ opacity: 0.8, fontSize: "0.95rem", maxWidth: 440, marginInline: "auto" }}>
              Leave the first note above for Raina, Aparna, or Saayra.
            </p>
          </div>
        ) : (
          <div className="message-wall-grid">
            {notes.map((note) => (
              <MessageNote
                key={note.id}
                note={note}
                currentUserRole={userRole}
                onDelete={deleteNote}
                onReact={toggleReaction}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
