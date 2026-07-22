import React from "react";
import { motion } from "framer-motion";

const floatingWords = [
  { word: "poetry", top: "22%", left: "68%", dur: "6s", delay: "0s" },
  { word: "ramen", top: "38%", left: "72%", dur: "7s", delay: "1s" },
  { word: "comfort", top: "55%", left: "65%", dur: "8s", delay: "0.5s" },
  { word: "laughter", top: "68%", left: "70%", dur: "6.5s", delay: "1.5s" },
  { word: "purple", top: "14%", left: "60%", dur: "9s", delay: "0.3s" },
];

const fireflies = [
  { top: "20%", left: "62%", dur: "5s", delay: "0s" },
  { top: "45%", left: "75%", dur: "7s", delay: "1.2s" },
  { top: "60%", left: "58%", dur: "6s", delay: "0.8s" },
];

export default function SunshineHero() {
  return (
    <section className="sunshine-hero">
      {floatingWords.map((fw, i) => (
        <span key={i} className="floating-word" aria-hidden="true" style={{ top: fw.top, left: fw.left, animationDuration: fw.dur, animationDelay: fw.delay }}>
          {fw.word}
        </span>
      ))}
      {fireflies.map((ff, i) => (
        <span key={i} className="firefly" aria-hidden="true" style={{ top: ff.top, left: ff.left, animationDuration: ff.dur, animationDelay: ff.delay }} />
      ))}
      <div className="content-container">
        <div className="sunshine-hero-inner">
          <div>
            <motion.span className="sunshine-hero-label" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              ☀️ Saayra's corner
            </motion.span>
            <motion.h1 className="sunshine-hero-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              Saayra — <span className="gold-accent">My Sunshine</span>
            </motion.h1>
            <motion.p className="sunshine-hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              My poet, my favourite weirdo, my safest listener, my roasting partner, and my officially appointed platonic husband.
            </motion.p>
            <motion.p className="sunshine-hero-sub2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              Mature enough to solve my problems, but still a cute little child at heart.
            </motion.p>
            <motion.div className="sunshine-hero-buttons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <a href="#nb107" className="primary-button btn-sunshine-primary">📍 Where It Began</a>
              <a href="#cake" className="primary-button btn-sunshine-primary">🎂 The Cake Memory</a>
              <a href="#saayra-letter" className="primary-button ghost-button btn-sunshine-ghost">💌 Open My Letter</a>
              <a href="#roast-room" className="primary-button ghost-button btn-sunshine-ghost">🔥 Roast Room</a>
            </motion.div>
          </div>
          <motion.div className="sunshine-hero-illustration" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5 }}>
            <div className="sunshine-sun-circle" aria-hidden="true" />
            <div className="sunshine-diary">
              {[...Array(6)].map((_, i) => <div key={i} className="sunshine-diary-line" aria-hidden="true" />)}
              <div className="sunshine-diary-text">
                <p style={{ margin: 0 }}>21 August 2023</p>
                <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.7 }}>Near NB-107</p>
                <p style={{ margin: "0.5rem 0 0", fontSize: "0.85rem", opacity: 0.6 }}>💜 The beginning</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
