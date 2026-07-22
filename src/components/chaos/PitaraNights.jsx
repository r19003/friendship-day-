import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PITARA_ARTISTS = ["Our BTS Playlist 💜", "Indie Night Set 🎵", "College Chaos Mix 🎉", "Feel Good Hits ⭐"];
const CONFETTI_ITEMS = [
  { color: "var(--chaos-lavender)", size: 10, x: "20%", delay: 0 },
  { color: "var(--chaos-yellow)", size: 8, x: "40%", delay: 0.3 },
  { color: "var(--chaos-pink)", size: 12, x: "65%", delay: 0.1 },
  { color: "var(--chaos-blue)", size: 9, x: "80%", delay: 0.5 },
  { color: "var(--chaos-green)", size: 11, x: "55%", delay: 0.2 },
  { color: "var(--chaos-lavender)", size: 8, x: "30%", delay: 0.7 },
  { color: "var(--chaos-yellow)", size: 10, x: "75%", delay: 0.4 },
];

export default function PitaraNights() {
  const [concertMode, setConcertMode] = useState(false);
  const [artist, setArtist] = useState(PITARA_ARTISTS[0]);

  useEffect(() => {
    if (!concertMode) return;
    const id = setInterval(() => {
      setArtist(PITARA_ARTISTS[Math.floor(Math.random() * PITARA_ARTISTS.length)]);
    }, 3000);
    return () => clearInterval(id);
  }, [concertMode]);

  return (
    <section className={`pitara-section page-grain${concertMode ? " pitara-mode-active" : ""}`}>
      <div className="pitara-mode-bg" />
      <div className="content-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 600, marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="section-kicker" style={{ color: "var(--chaos-lavender)", justifyContent: "center" }}>
              🎫 Pitara Nights
            </span>
            <h2 style={{ color: "white", marginBottom: "0.5rem" }}>Our First Pitara</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 460, marginInline: "auto" }}>
              Music, lights, college energy, photographs, laughter — and the people beside us made it special.
            </p>
          </div>

          {/* Concert ticket */}
          <div className="pitara-ticket">
            <div className="pitara-ticket-top">
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6, fontFamily: "var(--font-body)" }}>
                  ADMIT THREE
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={concertMode ? artist : "pitara"}
                  className="pitara-event-name"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {concertMode ? artist : "Pitara Night"}
                </motion.div>
              </AnimatePresence>
              <div className="pitara-event-sub">Raina × Aparna × Saayra</div>
            </div>

            <div className="pitara-ticket-dashed" />

            <div className="pitara-ticket-bottom">
              <div className="pitara-ticket-meta">
                <span>🎟️ FRONT SECTION</span>
                <span>💜 ARMY ZONE</span>
                <span>📸 MEMORIES INCLUDED</span>
              </div>
            </div>

            {/* Confetti when active */}
            <AnimatePresence>
              {concertMode && CONFETTI_ITEMS.map((c, i) => (
                <motion.div
                  key={i}
                  className="pitara-confetti-dot"
                  style={{ left: c.x, background: c.color, width: c.size, height: c.size }}
                  initial={{ y: "-10%", opacity: 1 }}
                  animate={{ y: "110%", opacity: [1, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: c.delay,
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeIn",
                  }}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Concert mode lights */}
          {concertMode && (
            <div className="concert-crowd-dots">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="crowd-dot"
                  style={{
                    "--dur": `${1.5 + Math.random() * 2}s`,
                    "--delay": `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              className="glow-button"
              onClick={() => setConcertMode(!concertMode)}
            >
              {concertMode ? "🔇 Exit Concert Mode" : "🎫 Enter Concert Mode"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
