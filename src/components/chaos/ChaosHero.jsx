import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { chaosHeroCopy } from "../../data/sharedData";

const BEAMS = [
  { left: "15%", height: "60%", dur: "3.5s", delay: "0s" },
  { left: "28%", height: "75%", dur: "4.5s", delay: "0.8s" },
  { left: "42%", height: "55%", dur: "3.2s", delay: "0.2s" },
  { left: "57%", height: "70%", dur: "4s",   delay: "1s" },
  { left: "70%", height: "65%", dur: "3.8s", delay: "0.5s" },
  { left: "85%", height: "80%", dur: "4.2s", delay: "1.3s" },
];

const STARS = Array.from({ length: 30 }, (_, i) => ({
  top: `${Math.random() * 75}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  dur: `${2 + Math.random() * 3}s`,
  delay: `${Math.random() * 4}s`,
}));

const COLLAGE_ITEMS = [
  { style: { top: "8%", right: "4%", "--rot": "-4deg", "--dur": "7s", "--delay": "0s" },
    type: "polaroid", emoji: "🌙", caption: "night stay vibes" },
  { style: { top: "22%", right: "18%", "--rot": "5deg", "--dur": "9s", "--delay": "1s" },
    type: "sticky", text: "we should plan\na trip 🌟" },
  { style: { top: "48%", right: "3%", "--rot": "-2deg", "--dur": "8s", "--delay": "0.5s" },
    type: "ticket", text: "ADMIT THREE — AMI" },
  { style: { top: "64%", right: "16%", "--rot": "3deg", "--dur": "6s", "--delay": "1.5s" },
    type: "bubble", text: "raina fell asleep 💀" },
];

export default function ChaosHero() {
  return (
    <section className="chaos-hero">
      {/* Concert light beams background */}
      <div className="chaos-hero__lights" aria-hidden="true">
        {BEAMS.map((b, i) => (
          <div
            key={i}
            className="chaos-light-beam"
            style={{
              left: b.left,
              height: b.height,
              "--dur": b.dur,
              "--delay": b.delay,
              transform: `rotate(${(i - 3) * 8}deg)`,
              transformOrigin: "bottom center",
            }}
          />
        ))}
      </div>

      {/* Stars */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {STARS.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "white",
              animation: `starTwinkle ${s.dur} ease-in-out infinite`,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Floating collage decorations (desktop only) */}
      <div className="chaos-collage" aria-hidden="true">
        {COLLAGE_ITEMS.map((item, i) => (
          <div key={i} className="collage-item" style={item.style}>
            {item.type === "polaroid" && (
              <div className="collage-polaroid" style={{ "--rot": item.style["--rot"] }}>
                <div className="collage-polaroid-img">{item.emoji}</div>
                {item.caption}
              </div>
            )}
            {item.type === "sticky" && (
              <div className="collage-sticky" style={{ "--rot": item.style["--rot"] }}>
                {item.text}
              </div>
            )}
            {item.type === "ticket" && (
              <div className="collage-ticket">{item.text}</div>
            )}
            {item.type === "bubble" && (
              <div className="collage-bubble">{item.text}</div>
            )}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="content-container chaos-hero__content">
        <motion.span
          className="chaos-hero__kicker"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          ✦ {chaosHeroCopy.label} ✦
        </motion.span>

        <motion.h1
          className="chaos-hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {chaosHeroCopy.title.split(" ").map((word, i) => (
            <span key={i}>
              {i === 1 ? <span className="highlight">{word}</span> : word}{" "}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="chaos-hero__sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {chaosHeroCopy.sub}
        </motion.p>

        <motion.div
          style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#bts-timeline" className="glow-button">💜 BTS Timeline</a>
          <a href="#awards" className="primary-button" style={{ background: "var(--chaos-yellow)", color: "#2a1800" }}>🏆 Awards</a>
          <Link to="/aparna" className="primary-button" style={{ background: "var(--daisy-yellow)", color: "#4a3800" }}>🌼 Daisy</Link>
          <Link to="/saayra" className="primary-button" style={{ background: "var(--sunshine-purple)", color: "white" }}>☀️ Sunshine</Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="home-scroll-indicator" aria-hidden="true">
        <span className="home-scroll-indicator__line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
