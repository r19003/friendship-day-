import React from "react";
import { motion } from "framer-motion";

export default function SunshineHero() {
  const floatingWords = ["poetry", "ramen", "comfort", "laughter"];

  return (
    <section className="sunshine-hero page-first-section">
      <div className="sunshine-purple-sun" aria-hidden="true" />
      <div className="sunshine-horizon-glow" aria-hidden="true" />

      <div className="sunshine-hero__layout">
        {/* Left: Copy */}
        <motion.div
          className="sunshine-hero__copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="sunshine-hero-label">☀️ Saayra’s Corner</span>
          <h1 className="sunshine-hero-title">
            Saayra — <span className="gold-accent">My Sunshine</span>
          </h1>
          <p className="sunshine-hero-sub">
            My poet, my favourite weirdo, my safest listener, my roasting partner, and my officially appointed platonic husband.
          </p>
          <p className="sunshine-hero-sub2">
            Mature enough to solve my problems with calm advice, but still a cute little child at heart who loves sweets, books, baking, and ramen.
          </p>

          <div className="sunshine-hero-buttons">
            <a href="#nb107" className="button button--sunshine">
              📖 Our Meeting Story
            </a>
            <a href="#roast-room" className="button button--sunshine-secondary">
              🔥 Visit the Roast Room
            </a>
            <a href="#saayra-letter" className="button button--sunshine-secondary">
              💌 Open My Letter
            </a>
          </div>

          <div className="sunshine-hero-date-tag">
            <span>📍 21 August 2023 · Near NB-107</span>
            <small>The day sunshine walked into my college life</small>
          </div>
        </motion.div>

        {/* Right: Journal & Visual Composition */}
        <motion.div
          className="sunshine-hero__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="sunshine-floating-words" aria-hidden="true">
            {floatingWords.map((word, i) => (
              <span key={word} className={`floating-word floating-word--${i + 1}`}>
                ✦ {word}
              </span>
            ))}
          </div>

          <div className="sunshine-journal-card">
            <div className="sunshine-journal-header">
              <span className="journal-star">✦</span> Poetry Journal · Aug 2023
            </div>
            <div className="sunshine-journal-content">
              <p className="sunshine-journal-line">"Some people do not bring noise."</p>
              <p className="sunshine-journal-line">"They bring light, warmth, and purple skies."</p>
            </div>
            <div className="sunshine-journal-props">
              <span title="Stack of books">📚</span>
              <span title="Ramen bowl">🍜</span>
              <span title="Baking whisk">🥣</span>
              <span title="Cake note">🎂</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
