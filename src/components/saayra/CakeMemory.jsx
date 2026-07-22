import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { cakeCopy, cakeHandnote, cakeRevealNotes, cakeFinalLine } from "../../data/saayraData";

export default function CakeMemory() {
  const [unfolded, setUnfolded] = useState(false);
  const [revealCount, setRevealCount] = useState(0);

  const handleReveal = () => {
    setUnfolded(true);
    setRevealCount((prev) => Math.min(prev + 1, cakeRevealNotes.length));
  };

  const ingredients = [
    { label: "Time & Effort", icon: "⏳" },
    { label: "Thoughtful Planning", icon: "💭" },
    { label: "Unconditional Care", icon: "🫂" },
    { label: "Pure Warmth", icon: "☀️" },
    { label: "A feeling too large for words", icon: "💜" },
  ];

  return (
    <section id="cake" className="cake-section sunshine-section sunshine-section--gold">
      <div className="content-container">
        <SectionHeading
          label="1 September 2023"
          title="The Cake I Will Never Forget"
          center
          dividerColor="var(--sunshine-purple)"
        />

        <div className="cake-memory-layout">
          {/* Left: Cake Photo Card */}
          <motion.div
            className="cake-photo-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="cake-candle-glow" aria-hidden="true" />
            <div className="cake-emoji-hero">🎂</div>
            <div className="cake-date-badge">📅 1 September 2023</div>
            <p className="cake-photo-caption">Baked with love & endless care</p>
          </motion.div>

          {/* Right: Recipe Card & Reveal */}
          <motion.div
            className="cake-recipe-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="recipe-title">What the Cake Was Really Made Of</h3>
            <p className="recipe-sub">An unofficial recipe of true friendship</p>

            <ul className="recipe-ingredients-list" role="list">
              {ingredients.map((ing, i) => (
                <li key={i} className={`recipe-ingredient ${unfolded ? "is-revealed" : ""}`}>
                  <span className="ingredient-icon">{ing.icon}</span>
                  <span className="ingredient-label">{ing.label}</span>
                </li>
              ))}
            </ul>

            {cakeCopy.map((para, i) => (
              <p key={i} className="cake-copy-text">{para}</p>
            ))}

            <blockquote className="cake-handnote">"{cakeHandnote}"</blockquote>

            <div style={{ marginTop: "1.5rem" }}>
              <button type="button" className="button button--sunshine" onClick={handleReveal}>
                {unfolded ? "✦ Reveal More Warmth" : "🍰 Reveal the Real Ingredients"}
              </button>
            </div>

            <AnimatePresence>
              {unfolded && (
                <motion.div
                  className="cake-unfold-box"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="cake-reveal-notes">
                    {cakeRevealNotes.slice(0, revealCount).map((note, i) => (
                      <div key={i} className="cake-reveal-note">
                        ✦ {note}
                      </div>
                    ))}
                  </div>
                  <p className="cake-final-message">
                    "It was not only a cake. It was proof that I mattered to you."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
