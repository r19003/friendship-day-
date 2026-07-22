import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { prozacCardData } from "../../data/aparnaData";
import { fadeUp, viewportOnce } from "../../lib/motionVariants";

export default function ProzacDaisyCard() {
  const [dosed, setDosed] = useState(false);
  const [meterProgress, setMeterProgress] = useState(0);
  const [floatingDaisies, setFloatingDaisies] = useState([]);

  function handleDose() {
    setDosed(true);
    setMeterProgress(73);
    setFloatingDaisies(Array.from({ length: 8 }, (_, i) => ({ id: Date.now() + i, left: `${20 + Math.random() * 60}%` })));
    setTimeout(() => setFloatingDaisies([]), 2500);
    setTimeout(() => {
      setDosed(false);
      setMeterProgress(0);
    }, 5000);
  }

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
    <section className="prozac-section page-grain">
      <div className="content-container">
        <SectionHeading label="Prescription" title="My Prozac Daisy" center dividerColor="var(--daisy-yellow)" />
        
        <motion.div
          className="prozac-card"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{ position: "relative" }}
        >
          {/* Friendship-use only label */}
          <span className="prozac-label-tag">Friendship-use only 🌼</span>

          {/* Header */}
          <div className="prozac-card-top">
            <div className="daisy-seal-icon" title="Daisy Seal">🌼</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>PROZAC DAISY™</div>
              <div style={{ fontSize: "0.78rem", opacity: 0.65, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Happiness in human form · Rx #2022-2025
              </div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div key={i} className="prozac-row">
              <span className="prozac-field-name">{row.label}</span>
              <span className="prozac-field-val">{row.value}</span>
            </div>
          ))}

          {/* Dosage meter bar */}
          <div className="dosage-meter-wrapper" style={{ margin: "1.25rem 0 0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 800, color: "var(--daisy-muted)", marginBottom: "0.3rem" }}>
              <span>DOSAGE EFFECTIVENESS METER</span>
              <span>{meterProgress}%</span>
            </div>
            <div className="dosage-meter-track" style={{ height: "8px", background: "rgba(0,0,0,0.06)", borderRadius: "4px", overflow: "hidden" }}>
              <motion.div
                className="dosage-meter-fill"
                animate={{ width: `${meterProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ height: "100%", background: "linear-gradient(90deg, var(--daisy-blue-dark), var(--daisy-yellow))" }}
              />
            </div>
          </div>

          {/* Dosage button */}
          <button className="prozac-dose-btn" onClick={handleDose} disabled={dosed}>
            {dosed ? "✓ Dose received!" : "💊 Take One Dose"}
          </button>

          {/* Result Banner */}
          <AnimatePresence>
            {dosed && (
              <motion.div
                className="prozac-result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
              >
                Dose received. The day now feels warmer, safer, and approximately 73% happier. 🌼
              </motion.div>
            )}
          </AnimatePresence>

          {floatingDaisies.map((d) => (
            <span
              key={d.id}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: d.left,
                bottom: "60px",
                fontSize: "1.5rem",
                animation: "daisyFloat 1.8s ease-out forwards",
                pointerEvents: "none",
              }}
            >
              🌼
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
