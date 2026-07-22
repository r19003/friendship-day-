import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CityStars from "./CityStars";

const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// 20 static stars
const STATIC_STARS = Array.from({ length: 20 }, (_, i) => ({
  top: `${10 + (i * 4.2) % 80}%`,
  left: `${(i * 9.7) % 95}%`,
  size: (i % 3) + 1.5,
}));

export default function HomeHero() {
  return (
    <section className="home-hero">
      {/* Static Star Dots */}
      <div className="home-hero__stars" aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {STATIC_STARS.map((s, i) => (
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
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <motion.div
        className="content-container home-hero-inner"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="home-hero-label" variants={heroItem}>
          ✦ A personal digital gift from Raina ✦
        </motion.span>

        <motion.h1 className="home-hero__title" variants={heroItem}>
          <span className="gold">Daisy,</span> <span className="purple">Sunshine</span> &amp; Me
        </motion.h1>

        <motion.p className="home-hero__subtitle" variants={heroItem}>
          Three cities. Two beautiful friendships. One shared universe of BTS, college memories, night stays, and endless laughter.
        </motion.p>

        <motion.div className="home-hero-buttons" variants={heroItem}>
          <Link to="/aparna" className="primary-button btn-daisy">
            🌼 Explore Daisy
          </Link>
          <Link to="/saayra" className="primary-button btn-sunshine">
            ☀️ Explore Sunshine
          </Link>
          <Link to="/our-chaos" className="primary-button btn-chaos">
            📼 Our Chaos
          </Link>
        </motion.div>

        {/* Friendship Stars & Constellation */}
        <motion.div className="friendship-constellation-wrapper" variants={heroItem}>
          <svg viewBox="0 0 500 120" className="friendship-constellation-svg" aria-hidden="true">
            <path
              d="M 60 70 Q 250 20 440 70"
              className="friendship-constellation-path"
            />
          </svg>
          <div className="friendship-star" style={{ top: "64px", left: "54px" }} title="Chandigarh (Raina)" />
          <div className="friendship-star" style={{ top: "18px", left: "244px" }} title="Gurgaon (Aparna)" />
          <div className="friendship-star" style={{ top: "64px", left: "434px" }} title="Hyderabad (Saayra)" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <span className="scroll-indicator__line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
