import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motionVariants";

const ACTIONS = [
  { id: "chocolate", label: "🍫 Offer Chocolate", response: "Anger reduced slightly. Additional action may be required." },
  { id: "cake", label: "🍰 Offer Cake", response: "Situation improving rapidly." },
  { id: "apology", label: "💌 Give a Proper Apology", response: "Emotional maturity detected. Good decision." },
  { id: "listen", label: "👂 Let Her Finish Speaking", response: "Correct. Listening is currently more important than defending yourself." },
  { id: "nolaugh", label: "😶 Do Not Laugh at How Cute She Looks", response: "Extremely difficult, but necessary for survival." },
];

export default function CuteAngerEmergency() {
  const [completedActions, setCompletedActions] = useState([]);
  const [lastResponse, setLastResponse] = useState("");

  const handleAction = (action) => {
    if (!completedActions.includes(action.id)) {
      setCompletedActions((prev) => [...prev, action.id]);
    }
    setLastResponse(action.response);
  };

  const isRestored = completedActions.length === ACTIONS.length;

  const resetMode = () => {
    setCompletedActions([]);
    setLastResponse("");
  };

  return (
    <section className="cute-anger-section page-grain">
      <div className="content-container">
        <div style={{ maxWidth: 680, marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className="section-kicker" style={{ color: "var(--danger)", justifyContent: "center" }}>
              ⚡ Protocol Alert
            </span>
            <h2 className="section-title" style={{ color: "var(--daisy-text)", marginBottom: "0.5rem" }}>
              Cute Anger Emergency
            </h2>
            <p style={{ color: "var(--daisy-muted)", fontSize: "1.05rem", fontWeight: 700 }}>
              Warning: Aparna is angry.
            </p>
            <p style={{ color: "var(--daisy-muted)", fontSize: "0.95rem", fontStyle: "italic" }}>
              Unfortunately, she is still extremely adorable.
            </p>
          </div>

          <motion.div
            className="cute-anger-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {/* Animated Daisy Character */}
            <div className="anger-daisy-visual">
              {isRestored ? (
                <motion.div
                  initial={{ scale: 0.5, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring" }}
                  className="daisy-avatar restored"
                >
                  ☀️🌼✨
                </motion.div>
              ) : (
                <div className="daisy-avatar angry">
                  <span className="storm-cloud">🌩️</span>
                  <span className="daisy-face">🌼</span>
                  <span className="blush-cheeks">😳</span>
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className="anger-status-bar">
              <div className="anger-meter">
                <div
                  className="anger-meter-fill"
                  style={{ width: `${((ACTIONS.length - completedActions.length) / ACTIONS.length) * 100}%` }}
                />
              </div>
              <span className="anger-percentage">
                {isRestored ? "0% Angry" : `${Math.round(((ACTIONS.length - completedActions.length) / ACTIONS.length) * 100)}% Angry`}
              </span>
            </div>

            {/* Victory or Response display */}
            <div className="anger-response-box">
              <AnimatePresence mode="wait">
                {isRestored ? (
                  <motion.div
                    key="restored"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="restored-banner"
                  >
                    <span style={{ fontSize: "2rem" }}>🎉</span>
                    <h3 style={{ color: "var(--success)", fontFamily: "var(--font-display)", fontSize: "1.8rem" }}>
                      Daisy Mode Restored!
                    </h3>
                    <p style={{ color: "var(--daisy-muted)", fontSize: "0.95rem" }}>
                      Aparna has forgiven you. Softness and sweetness are fully back in operation.
                    </p>
                  </motion.div>
                ) : (
                  <motion.p
                    key={lastResponse || "initial"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: "var(--daisy-text)", fontFamily: "var(--font-handwritten)", fontSize: "1.25rem" }}
                  >
                    {lastResponse || "Select mitigation protocol actions below:"}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive Action Buttons */}
            <div className="anger-buttons-grid">
              {ACTIONS.map((action) => {
                const done = completedActions.includes(action.id);
                return (
                  <button
                    key={action.id}
                    className={`anger-action-btn ${done ? "done" : ""}`}
                    onClick={() => handleAction(action)}
                    disabled={isRestored}
                  >
                    {action.label} {done && "✓"}
                  </button>
                );
              })}
            </div>

            {isRestored && (
              <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                <button className="primary-button btn-daisy-primary" onClick={resetMode}>
                  🔁 Reset Simulation
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
