import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import { aparnaLetter } from "../../data/aparnaData";
import confetti from "canvas-confetti";

function fireConfetti() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ["#f7d866", "#cce8f5", "#f4cddd", "#ded3ee", "#8d6ad8"],
  });
}

export default function AparnaLetter() {
  const [open, setOpen] = useState(false);
  const [hugSent, setHugSent] = useState(false);

  function handleHug() {
    setHugSent(true);
    fireConfetti();
    setTimeout(() => setHugSent(false), 5000);
  }

  return (
    <section id="aparna-letter" className="letter-section page-grain">
      <div className="reading-container">
        <SectionHeading label="From Raina" title="A Letter to My Daisy" center dividerColor="var(--daisy-blue-deep)" />

        {!open && (
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <motion.div
              style={{ fontSize: "5rem", cursor: "pointer", display: "inline-block" }}
              onClick={() => setOpen(true)}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
              role="button"
              aria-label="Open the letter"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              ✉️
            </motion.div>
            <p style={{ opacity: 0.7, fontSize: "1rem", marginTop: "0.5rem", fontFamily: "var(--font-handwritten)" }}>
              Click to open the letter for Aparna 🌼
            </p>
          </div>
        )}

        <AnimatePresence>
          {open && (
            <motion.div
              className="daisy-letter-paper"
              initial={{ opacity: 0, y: 35, rotate: -2, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="letter-blue-ribbon" />
              <div className="letter-pressed-daisy">🌼</div>

              <p className="letter-salutation">{aparnaLetter.salutation}</p>

              {aparnaLetter.paragraphs.map((para, i) => (
                <p key={i} className="letter-paragraph">
                  {para}
                </p>
              ))}

              <p className="letter-signoff">{aparnaLetter.signOff}</p>

              <button className="letter-hug-btn" onClick={handleHug} disabled={hugSent}>
                <Sparkles size={16} />
                {hugSent ? "Hug delivered! 🌼" : "Send My Daisy a Hug"}
              </button>

              <AnimatePresence>
                {hugSent && (
                  <motion.div
                    className="letter-hug-result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                  >
                    Hug delivered with unlimited warmth. 🌼💜
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
