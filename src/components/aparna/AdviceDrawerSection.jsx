import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motionVariants";

const DRAWERS = [
  { id: "overthinking", label: "Overthinking", icon: "🌀", note: "Pause. Separate what actually happened from what your mind is imagining." },
  { id: "college-stress", label: "College Stress", icon: "📚", note: "Do one thing first. The complete problem does not need to be solved in one minute." },
  { id: "people-problems", label: "People Problems", icon: "🤝", note: "Being kind does not mean accepting behaviour that hurts you." },
  { id: "self-doubt", label: "Self-Doubt", icon: "✨", note: "You are allowed to trust yourself before everything is perfect." },
  { id: "bad-decision", label: "Bad Decision", icon: "📱", note: "Do not send the message yet. Sleep first." },
  { id: "late-night", label: "Late-Night Crisis", icon: "🌙", note: "Drink water. Breathe. Tell me the complete story from the beginning." },
  { id: "sweet", label: "Need Something Sweet", icon: "🍬", note: "This may not solve the problem, but it is still a reasonable first step." },
];

export default function AdviceDrawerSection() {
  const [activeDrawer, setActiveDrawer] = useState(null);

  return (
    <section className="advice-drawer-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-kicker" style={{ color: "var(--daisy-blue-deep)", justifyContent: "center" }}>
            🗄️ Elder Sister Wisdom
          </span>
          <h2 className="section-title" style={{ color: "var(--daisy-text)", marginBottom: "0.5rem" }}>
            Ask Elder Sister Aparna
          </h2>
          <p style={{ color: "var(--daisy-muted)", maxWidth: 540, marginInline: "auto" }}>
            Open a drawer whenever you need mature advice, calm thinking, or a quiet reminder.
          </p>
        </div>

        <motion.div
          className="desk-drawers-container"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Desk Visual */}
          <div className="illustrated-desk">
            <div className="desk-top-surface">
              <span className="desk-prop">☕</span>
              <span className="desk-prop">📖</span>
              <span className="desk-prop">🌼</span>
            </div>

            {/* Drawers Grid */}
            <div className="drawers-grid">
              {DRAWERS.map((drawer) => {
                const isOpen = activeDrawer?.id === drawer.id;
                return (
                  <button
                    key={drawer.id}
                    className={`desk-drawer-item ${isOpen ? "open" : ""}`}
                    onClick={() => setActiveDrawer(drawer)}
                    aria-label={`Open ${drawer.label} drawer`}
                  >
                    <div className="drawer-handle" />
                    <span className="drawer-icon">{drawer.icon}</span>
                    <span className="drawer-label">{drawer.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Unfolded Note Overlay / Modal */}
          <AnimatePresence>
            {activeDrawer && (
              <motion.div
                className="advice-note-modal"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="advice-note-paper">
                  <span className="note-pin">📌</span>
                  <span className="note-category">{activeDrawer.icon} {activeDrawer.label}</span>
                  <p className="note-text handwritten-note">
                    "{activeDrawer.note}"
                  </p>
                  <div className="note-signoff">— Elder Sister Aparna 🌼</div>
                  <button className="primary-button btn-daisy-primary" style={{ marginTop: "1.25rem" }} onClick={() => setActiveDrawer(null)}>
                    Pick another note
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
