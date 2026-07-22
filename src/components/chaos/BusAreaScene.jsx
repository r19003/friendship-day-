import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BUS_STATES = [
  { label: "Aparna Has Reached", busText: "🚌", statusText: "Bus arriving at the area…", step: 1 },
  { step: 2, statusText: "Mini reunion successfully completed. 🎉", hearts: true },
  { step: 3, statusText: "Nobody is ready to leave." },
  { step: 4, statusText: "Bus timing has officially become the villain. 😤" },
];

export default function BusAreaScene() {
  const [phase, setPhase] = useState(0);

  const advance = () => setPhase((p) => Math.min(p + 1, BUS_STATES.length - 1));
  const reset = () => setPhase(0);

  const hearts = phase >= 2 ? ["❤️", "💜", "⭐", "💛", "🌼"] : [];

  return (
    <section className="bus-area-section page-grain">
      <div className="content-container">
        <div style={{ maxWidth: 680, marginInline: "auto" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-lavender)" }}>
            🚌 The Bus Area Chronicles
          </span>
          <h2 style={{ color: "white", marginBottom: "0.5rem" }}>
            Aparna at the Bus Area
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
            Whenever Aparna reached the bus area, even a short college meeting felt like a proper mini reunion.
          </p>

          {/* Scene */}
          <div className="bus-scene">
            {/* Sky gradient */}
            <div className="bus-scene__sky" style={{
              background: phase >= 2
                ? "linear-gradient(180deg, #1a0e3b 60%, #1a2a14 100%)"
                : "linear-gradient(180deg, #0d0928 60%, #0d1a14 100%)"
            }} />

            {/* Digital sign */}
            <div className="bus-sign">
              {phase === 0 ? "🚌 BUS AREA — WAITING" : phase === 1 ? "🚌 BUS ARRIVING..." : "🚌 ✓ ARRIVED"}
            </div>

            {/* Characters */}
            <div className="bus-character bus-char-raina" style={{ fontSize: "2.2rem" }}>
              <div title="Raina">👩</div>
              <div style={{ fontSize: "0.6rem", textAlign: "center", marginTop: 2, color: "rgba(255,255,255,0.5)" }}>Raina</div>
            </div>
            <div className="bus-character bus-char-saayra" style={{ fontSize: "2.2rem" }}>
              <div title="Saayra">👩</div>
              <div style={{ fontSize: "0.6rem", textAlign: "center", marginTop: 2, color: "rgba(255,255,255,0.5)" }}>Saayra</div>
            </div>

            {/* Aparna arrives */}
            <motion.div
              className="bus-character bus-char-aparna"
              initial={{ opacity: 0, x: 60 }}
              animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: "2.2rem", left: "52%" }}
            >
              <div title="Aparna">👩</div>
              <div style={{ fontSize: "0.6rem", textAlign: "center", marginTop: 2, color: "rgba(255,255,255,0.5)" }}>Aparna</div>
            </motion.div>

            {/* Bus vehicle */}
            <motion.div
              className="bus-vehicle"
              animate={phase >= 1 ? { x: 0 } : { x: "120%" }}
              initial={{ x: "120%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: "2.8rem", position: "absolute", bottom: "28%", right: "5%" }}
            >
              🚌
            </motion.div>

            {/* Road */}
            <div className="bus-scene__road">
              <div className="bus-scene__road-line" style={{ left: "10%" }} />
              <div className="bus-scene__road-line" style={{ left: "35%" }} />
              <div className="bus-scene__road-line" style={{ left: "60%" }} />
              <div className="bus-scene__road-line" style={{ left: "80%" }} />
            </div>

            {/* Floating hearts */}
            <AnimatePresence>
              {hearts.map((h, i) => (
                <motion.div
                  key={h + i}
                  style={{
                    position: "absolute",
                    left: `${40 + i * 8}%`,
                    bottom: "50%",
                    fontSize: "1.4rem",
                    pointerEvents: "none",
                  }}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -80, opacity: 0 }}
                  transition={{ delay: i * 0.15, duration: 1.8, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
                >
                  {h}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Status & buttons */}
          <div className="bus-area-text">
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                className="bus-status-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {phase === 0 && "Raina and Saayra are at the bus area. Waiting…"}
                {phase === 1 && "Bus arriving at the area…"}
                {phase === 2 && "Mini reunion successfully completed. 🎉"}
                {phase === 3 && "Nobody is ready to leave."}
                {phase === 4 && "Bus timing has officially become the villain. 😤"}
              </motion.p>
            </AnimatePresence>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              {phase < 4 && (
                <button className="glow-button" onClick={advance}>
                  {phase === 0 ? "🚌 Aparna Has Reached" : phase === 1 ? "✓ Arrived!" : phase === 2 ? "Still here…" : "Please no…"}
                </button>
              )}
              {phase === 4 && (
                <button className="glow-button" onClick={reset}>
                  🔁 Another Day, Another Bus Area
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
