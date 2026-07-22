import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";

const ACTIONS = [
  { id: "chocolate", label: "🍫 Offer Chocolate", reduction: 15, response: "Anger reduced slightly. Additional action may be required." },
  { id: "cake", label: "🍰 Offer Cake", reduction: 20, response: "Situation improving rapidly. Dessert diplomacy is working." },
  { id: "apology", label: "💌 Give a Proper Apology", reduction: 30, response: "Emotional maturity detected. Very good decision." },
  { id: "listen", label: "👂 Let Her Finish Speaking", reduction: 25, response: "Correct choice. Listening is currently more useful than defending yourself." },
  { id: "dont_laugh", label: "🤐 Do Not Laugh Yet", reduction: 10, response: "Extremely difficult, but necessary for survival." },
];

export default function CuteAngerEmergency() {
  const [anger, setAnger] = useState(100);
  const [selectedActions, setSelectedActions] = useState([]);
  const [lastResponse, setLastResponse] = useState("");

  const handleAction = (action) => {
    if (selectedActions.includes(action.id)) return;
    const newSelected = [...selectedActions, action.id];
    setSelectedActions(newSelected);
    const newAnger = Math.max(0, anger - action.reduction);
    setAnger(newAnger);
    setLastResponse(action.response);
  };

  const handleReset = () => {
    setAnger(100);
    setSelectedActions([]);
    setLastResponse("");
  };

  // Determine stage visuals based on anger level
  const getStageVisuals = () => {
    if (anger > 75) return { emojis: ["🌩️", "🌼", "😤"], bgClass: "stage-angry-high" };
    if (anger > 50) return { emojis: ["☁️", "🌼", "😒"], bgClass: "stage-angry-med" };
    if (anger > 25) return { emojis: ["🌤️", "🌼", "🙂"], bgClass: "stage-angry-low" };
    if (anger > 0) return { emojis: ["☀️", "🌼", "😊"], bgClass: "stage-angry-min" };
    return { emojis: ["☀️", "🌼", "🥰"], bgClass: "stage-restored" };
  };

  const { emojis, bgClass } = getStageVisuals();
  const isRestored = anger === 0;

  return (
    <section className="daisy-section cute-anger-section" id="cute-anger">
      <div className="content-container">
        <SectionHeading
          label="Emergency Protocol"
          title="Cute Anger Emergency"
          center
          dividerColor="var(--daisy-yellow)"
        />

        <div className={`cute-anger-card ${bgClass}`}>
          {/* Emotion Stage */}
          <div className="anger-emotion-stage">
            {emojis.map((emoji, index) => (
              <span key={index} className="anger-emoji-box">
                {emoji}
              </span>
            ))}
          </div>

          <div className="anger-meter-container">
            <div className="anger-meter-label">
              <span>{isRestored ? "Daisy Mode Restored" : "Anger Level"}</span>
              <strong>{anger}%</strong>
            </div>
            <div className="anger-meter-track" role="progressbar" aria-valuenow={anger} aria-valuemin="0" aria-valuemax="100">
              <div
                className="anger-meter-fill"
                style={{ width: `${anger}%` }}
              />
            </div>
          </div>

          <p className="cute-anger-response">
            {isRestored
              ? "Emergency resolved. Proper care, food, and listening remain recommended."
              : lastResponse || "Select mitigation protocol actions below:"}
          </p>

          <div className="anger-actions" role="group" aria-label="Anger mitigation actions">
            {ACTIONS.map((action) => {
              const isSelected = selectedActions.includes(action.id);
              return (
                <button
                  key={action.id}
                  type="button"
                  className={`anger-action ${isSelected ? "is-selected" : ""}`}
                  onClick={() => handleAction(action)}
                  disabled={isSelected || isRestored}
                  aria-pressed={isSelected}
                >
                  {action.label} {isSelected && " ✓"}
                </button>
              );
            })}
          </div>

          {isRestored && (
            <motion.div
              className="restored-banner"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="sparkles-row">✨ 🌼 ✨ 🌼 ✨</div>
              <h3>🌼 Daisy Mode Restored</h3>
              <p>Everything is safe, warm, and happy again.</p>
              <button type="button" className="button button--daisy" onClick={handleReset} style={{ marginTop: "1rem" }}>
                🔁 Reset Emergency Protocol
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
