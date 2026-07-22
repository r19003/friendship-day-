import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { cakeCopy, cakeHandnote, cakeRevealNotes, cakeFinalLine } from "../../data/saayraData";

export default function CakeMemory() {
  const [revealCount, setRevealCount] = useState(0);
  const allRevealed = revealCount >= cakeRevealNotes.length;

  return (
    <section id="cake" className="cake-section">
      <div className="reading-container">
        <SectionHeading label="1 September 2023" title="The Cake I Will Never Forget" center dividerColor="var(--sunshine-purple)" />
        <motion.div className="cake-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="cake-glow" aria-hidden="true" />
          <div className="cake-photo-placeholder" aria-label="Placeholder for cake photo">
            <div className="cake-candle-glow" aria-hidden="true" />
            🎂
          </div>
          <p className="cake-date">1 September 2023</p>
          {cakeCopy.map((para, i) => (
            <motion.p key={i} className="cake-copy" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              {para}
            </motion.p>
          ))}
          <blockquote className="cake-handnote">"{cakeHandnote}"</blockquote>
          {!allRevealed && (
            <button className="cake-reveal-btn" onClick={() => setRevealCount(c => c + 1)}>
              {revealCount === 0 ? "Why Did This Mean So Much?" : "Reveal Another Reason"}
            </button>
          )}
          <div className="cake-reveal-notes" aria-live="polite">
            {cakeRevealNotes.slice(0, revealCount).map((note, i) => (
              <motion.div key={i} className="cake-reveal-note" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                ✦ {note}
              </motion.div>
            ))}
          </div>
          {allRevealed && (
            <motion.p className="cake-final-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {cakeFinalLine}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
