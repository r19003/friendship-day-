import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import { saayraLetter } from "../../data/saayraData";
import confetti from "canvas-confetti";

export default function SaayraLetter() {
  const [open, setOpen] = useState(false);
  const [hugSent, setHugSent] = useState(false);

  function handleHug() {
    setHugSent(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#7954a1", "#cdb5e8", "#f4c561", "#eee3fa"] });
    setTimeout(() => setHugSent(false), 5000);
  }

  return (
    <section id="saayra-letter" className="sunshine-letter-section">
      <div className="reading-container">
        <SectionHeading label="From Raina" title="A Letter to My Sunshine" center dividerColor="var(--sunshine-purple)" />
        {!open && (
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <motion.div
              style={{ fontSize: "4rem", cursor: "pointer", display: "inline-block" }}
              onClick={() => setOpen(true)}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
              role="button"
              aria-label="Open the letter"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              💌
            </motion.div>
            <p style={{ opacity: 0.6, fontSize: "0.95rem", marginTop: "0.5rem" }}>Click to open the letter</p>
          </div>
        )}
        <AnimatePresence>
          {open && (
            <motion.div className="sunshine-letter-paper" initial={{ opacity: 0, y: 28, rotate: 1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "1rem", textAlign: "center" }}>☀️</div>
              <p className="sunshine-letter-salutation">{saayraLetter.salutation}</p>
              {saayraLetter.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
              <p className="sunshine-letter-sign-off" style={{ whiteSpace: "pre-line" }}>{saayraLetter.signOff}</p>
              <button className="sunshine-hug-btn" onClick={handleHug} disabled={hugSent}>
                <Sparkles size={16} />
                {hugSent ? "Sunshine delivered! ☀️" : "Send My Sunshine a Hug"}
              </button>
              <AnimatePresence>
                {hugSent && (
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ textAlign: "center", marginTop: "1rem", fontFamily: "var(--font-handwritten)", fontSize: "1.1rem", color: "var(--sunshine-purple)" }} role="status">
                    {saayraLetter.hugResult}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
