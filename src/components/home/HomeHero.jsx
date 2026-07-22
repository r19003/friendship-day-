import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CityStars from "./CityStars";

/* Ghost background words that appear faintly behind the title */
const GHOST_WORDS = [
  { text: "friendship", style: { top: "12%", left: "-2%", fontSize: "clamp(5rem,10vw,11rem)", transform: "rotate(-6deg)" } },
  { text: "memory", style: { bottom: "20%", right: "-3%", fontSize: "clamp(4rem,8vw,9rem)", transform: "rotate(5deg)" } },
  { text: "home", style: { top: "55%", left: "5%", fontSize: "clamp(3rem,6vw,7rem)", transform: "rotate(-3deg)" } },
];

/* Simple star dots for background */
const STARS = Array.from({ length: 55 }, (_, i) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 0.5,
  dur: `${2 + Math.random() * 4}s`,
  delay: `${Math.random() * 5}s`,
}));

export default function HomeHero() {
  return (
    <section className="home-hero">
      {/* Nebula blobs */}
      <div className="home-hero__nebula home-hero__nebula--one" aria-hidden="true" />
      <div className="home-hero__nebula home-hero__nebula--two" aria-hidden="true" />
      <div className="home-hero__nebula home-hero__nebula--three" aria-hidden="true" />

      {/* Stars */}
      <div className="home-hero__stars" aria-hidden="true">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="home-hero__star"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              "--dur": s.dur,
              "--delay": s.delay,
              animationDuration: s.dur,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Ghost background words */}
      <div className="home-hero__ghost-words" aria-hidden="true">
        {GHOST_WORDS.map((w) => (
          <span key={w.text} className="home-hero__ghost-word" style={w.style}>
            {w.text}
          </span>
        ))}
      </div>

      {/* Main content — centred */}
      <div className="content-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="home-hero__content" style={{ margin: "0 auto" }}>
          {/* Kicker */}
          <motion.div
            className="home-hero__kicker"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="home-hero__kicker-dot" />
            A personal digital gift from Raina
            <span className="home-hero__kicker-dot" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="home-hero__title"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="word-daisy">Daisy,</span>{" "}
            <span className="word-sunshine">Sunshine</span>{" "}
            &amp; Me
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="home-hero__sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Three cities. Two beautiful friendships. One little home made of memories.
          </motion.p>

          <motion.p
            className="home-hero__sub2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            One is my Daisy. One is my Sunshine. Both are pieces of home that life placed
            in different corners of the world.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="home-hero__buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/aparna" className="primary-button btn-daisy" id="home-daisy-cta">
              🌼 Meet My Daisy
            </Link>
            <Link to="/saayra" className="primary-button btn-sunshine" id="home-sunshine-cta">
              ☀️ Meet My Sunshine
            </Link>
            <Link to="/our-chaos" className="primary-button btn-chaos" id="home-chaos-cta">
              💜 Enter Our Chaos
            </Link>
          </motion.div>

          {/* Constellation map */}
          <motion.div
            className="home-hero__constellation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <CityStars />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="home-scroll-indicator" aria-hidden="true">
        <div className="home-scroll-indicator__line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
