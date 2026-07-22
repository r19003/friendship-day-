import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motionVariants";

const PETALS = [
  { id: "calmness", name: "Calmness", icon: "🍃", angle: -90, text: "You make stressful moments feel less frightening." },
  { id: "warmth", name: "Warmth", icon: "☀️", angle: -18, text: "Your welcoming nature makes people feel included without effort." },
  { id: "advice", name: "Advice", icon: "💡", angle: 54, text: "You listen carefully and give the kind of advice that stays in my mind." },
  { id: "happiness", name: "Happiness", icon: "✨", angle: 126, text: "Sometimes your presence alone can lift the mood of an entire day." },
  { id: "pureheart", name: "Pure Heart", icon: "🤍", angle: 198, text: "You care deeply, love people honestly, and carry softness without losing strength." },
];

export default function AparnaEffectSection() {
  const [selectedPetal, setSelectedPetal] = useState(PETALS[0]);

  return (
    <section className="aparna-effect-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-kicker" style={{ color: "var(--daisy-blue-deep)", justifyContent: "center" }}>
            🌼 Five Petals of Warmth
          </span>
          <h2 className="section-title" style={{ color: "var(--daisy-text)", marginBottom: "0.5rem" }}>
            The Aparna Effect
          </h2>
          <p style={{ color: "var(--daisy-muted)", maxWidth: 540, marginInline: "auto" }}>
            Small ways you make everything feel warmer.
          </p>
        </div>

        {/* Central summary text */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h3 className="handwritten-note" style={{ color: "var(--daisy-blue-deep)", fontSize: "1.8rem" }}>
            "A little calmer. A little happier. A lot more loved."
          </h3>
        </motion.div>

        {/* Interactive Daisy Flower (Desktop + Mobile) */}
        <div className="aparna-effect-container">
          {/* Desktop Interactive Radial Flower */}
          <div className="aparna-flower-desktop">
            <div className="aparna-flower-radial">
              <div className="aparna-flower-center">
                <span>🌼</span>
              </div>
              {PETALS.map((petal) => {
                const isSelected = selectedPetal.id === petal.id;
                return (
                  <button
                    key={petal.id}
                    className={`aparna-petal-btn ${isSelected ? "selected" : ""}`}
                    style={{ "--angle": `${petal.angle}deg` }}
                    onClick={() => setSelectedPetal(petal)}
                    aria-label={petal.name}
                  >
                    <span className="petal-icon">{petal.icon}</span>
                    <span className="petal-name">{petal.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Petal Card Beside Flower */}
            <div className="aparna-petal-display-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPetal.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{selectedPetal.icon}</div>
                  <h4 style={{ fontSize: "1.5rem", color: "var(--daisy-text)", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
                    {selectedPetal.name}
                  </h4>
                  <p style={{ color: "var(--daisy-muted)", fontSize: "1.05rem", lineHeight: 1.6 }}>
                    {selectedPetal.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Accordion */}
          <div className="aparna-flower-mobile">
            {PETALS.map((petal) => {
              const isOpen = selectedPetal.id === petal.id;
              return (
                <div key={petal.id} className={`aparna-mobile-accordion-item ${isOpen ? "open" : ""}`}>
                  <button
                    className="aparna-mobile-accordion-header"
                    onClick={() => setSelectedPetal(isOpen ? null : petal)}
                  >
                    <span>{petal.icon} {petal.name}</span>
                    <span>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="aparna-mobile-accordion-body">
                      <p>{petal.text}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
