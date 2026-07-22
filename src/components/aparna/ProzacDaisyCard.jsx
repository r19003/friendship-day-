import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { prozacCardData } from "../../data/aparnaData";
import { fadeUp, viewportOnce } from "../../lib/motionVariants";

export default function ProzacDaisyCard() {
  const [effectiveness, setEffectiveness] = useState(0);
  const [doseState, setDoseState] = useState("idle"); // 'idle' | 'taking' | 'completed'

  const handleTakeDose = () => {
    if (doseState !== "idle") return;
    setDoseState("taking");
    setEffectiveness(0);

    // 0% -> 24% (450ms)
    setTimeout(() => {
      setEffectiveness(24);
    }, 450);

    // 24% -> 48% (450ms)
    setTimeout(() => {
      setEffectiveness(48);
    }, 900);

    // 48% -> 73% (650ms)
    setTimeout(() => {
      setEffectiveness(73);
      setDoseState("completed");
    }, 1550);
  };

  const handleReset = () => {
    setEffectiveness(0);
    setDoseState("idle");
  };

  const rows = [
    { label: "Name", value: prozacCardData.name },
    { label: "Nickname", value: prozacCardData.nickname },
    { label: "Type", value: prozacCardData.type },
    { label: "Dosage", value: prozacCardData.dosage },
    { label: "Recommended for", value: prozacCardData.recommended },
    { label: "Active ingredients", value: prozacCardData.ingredients },
    { label: "Side effects", value: prozacCardData.sideEffects },
  ];

  return (
    <section className="prozac-section daisy-section page-grain" id="prozac-daisy">
      <div className="content-container">
        <SectionHeading label="Prescription" title="My Prozac Daisy" center dividerColor="var(--daisy-yellow)" />

        <motion.div
          className="prozac-card"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="prozac-label-tag">Friendship-use only 🌼</span>

          <div className="prozac-card-top">
            <div className="daisy-seal-icon" title="Daisy Seal" aria-hidden="true">🌼</div>
            <div style={{ textAlign: "left" }}>
              <div className="prozac-brand-title">PROZAC DAISY™</div>
              <div className="prozac-brand-sub">Happiness in human form · Rx #2022-2025</div>
            </div>
          </div>

          <dl className="prozac-rows-list">
            {rows.map((row, i) => (
              <div key={i} className="prozac-row">
                <dt className="prozac-field-name">{row.label}</dt>
                <dd className="prozac-field-val">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="prozac-dose-animation">
            <div className={`friendship-capsule ${doseState === "taking" ? "is-taking" : ""}`}>
              <span>🌼</span>
            </div>

            <div className="prozac-meter">
              <div className="prozac-meter__header">
                <span>Dosage effectiveness</span>
                <strong>{effectiveness}%</strong>
              </div>

              <div
                className="prozac-meter__track"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={effectiveness}
              >
                <div
                  className="prozac-meter__fill"
                  style={{ width: `${effectiveness}%` }}
                />

                <div className={`prozac-meter__flower ${effectiveness >= 73 ? "is-bloomed" : ""}`}>
                  🌼
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            {doseState === "idle" && (
              <button className="prozac-dose-btn" onClick={handleTakeDose}>
                💊 Take One Dose
              </button>
            )}

            {doseState === "taking" && (
              <button className="prozac-dose-btn" disabled style={{ opacity: 0.85 }}>
                ⏳ Absorbing Daisy Warmth... ({effectiveness}%)
              </button>
            )}

            {doseState === "completed" && (
              <button className="prozac-dose-btn prozac-dose-btn--reset" onClick={handleReset}>
                🔄 Take Another Dose Tomorrow
              </button>
            )}
          </div>

          <AnimatePresence>
            {doseState === "completed" && (
              <motion.div
                className="prozac-result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
              >
                <div className="prozac-result-text">
                  Dose received. The day now feels warmer, safer, and approximately 73% happier. 🌼
                </div>
                <div className="prozac-status-badge">
                  Active effect: Aparna warmth detected.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
