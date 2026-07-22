import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RESULTS = [
  "🏆 Victory. Barely. Rematch demanded immediately.",
  "🔁 Rematch requested. Again. This is the third one.",
  "🤔 Excessive confidence detected. Investigation ongoing.",
  "🎉 Someone celebrated too early. Score still disputed.",
  "🔬 Skill level under investigation. Results inconclusive.",
  "📋 Result will be discussed for three business days.",
  "🌀 Scoreboard corrupted. Starting over.",
  "🎭 Everyone claims they won. This is now a diplomatic issue.",
];

const SCORES = () => {
  const base = Math.floor(Math.random() * 6) + 2;
  return {
    Raina: base + Math.floor(Math.random() * 3),
    Aparna: base + Math.floor(Math.random() * 3),
    Saayra: base + Math.floor(Math.random() * 3),
  };
};

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export default function SmashGame() {
  const [scores, setScores] = useState(null);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const play = () => {
    setSpinning(true);
    setTimeout(() => {
      setScores(SCORES());
      setResult(pick(RESULTS));
      setSpinning(false);
    }, 800);
  };

  return (
    <section className="smash-section page-grain">
      <div className="content-container">
        <div style={{ maxWidth: 680, marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className="section-kicker" style={{ color: "var(--chaos-lavender)", justifyContent: "center" }}>
              🎮 Smash Outings
            </span>
            <h2 style={{ color: "white", marginBottom: "0.5rem" }}>Start Game</h2>
            <p style={{ color: "rgba(255,255,255,0.55)" }}>
              Games, unnecessary confidence, dramatic competition, and rematches.
            </p>
          </div>

          <div className="smash-arcade">
            <div className="smash-screen-header">
              <div className="smash-title-text">SMASH ★ ARENA</div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0.5rem 0 0" }}>
                Season: College Memories Edition
              </p>
            </div>

            {/* Score display */}
            <div className="smash-score-display">
              {["Raina", "Aparna", "Saayra"].map((name) => (
                <div key={name} className="smash-score-box">
                  <div className="smash-player">{name}</div>
                  <motion.div
                    className="smash-score"
                    key={scores?.[name] ?? 0}
                    initial={{ scale: 1.4, color: "#ff79c6" }}
                    animate={{ scale: 1, color: "#bd93f9" }}
                    transition={{ duration: 0.4 }}
                  >
                    {scores?.[name] ?? "--"}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Result */}
            <div className="smash-result-area">
              <AnimatePresence mode="wait">
                {!result && !spinning ? (
                  <motion.span key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Press Start Game to play
                  </motion.span>
                ) : spinning ? (
                  <motion.span key="spinning" initial={{ opacity: 0 }} animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>
                    Loading results…
                  </motion.span>
                ) : (
                  <motion.span
                    key={result}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "block" }}
                  >
                    {result}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button className="glow-button" onClick={play} disabled={spinning}>
                {spinning ? "⏳ Calculating…" : result ? "🔁 Rematch" : "🎮 Start Game"}
              </button>
            </div>
          </div>

          {result && (
            <p style={{ textAlign: "center", marginTop: "1rem", color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>
              The result is not final until all three parties agree. This may take a while.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
