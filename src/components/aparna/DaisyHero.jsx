import React from "react";
import { motion } from "framer-motion";

const petals = [
  { left: "8%", animDur: "7s", delay: "0s", fontSize: "1.4rem" },
  { left: "18%", animDur: "9s", delay: "1.5s", fontSize: "1rem" },
  { left: "72%", animDur: "8s", delay: "0.8s", fontSize: "1.3rem" },
  { left: "85%", animDur: "6.5s", delay: "2s", fontSize: "1.1rem" },
  { left: "55%", animDur: "10s", delay: "0.3s", fontSize: "0.9rem" },
];

export default function DaisyHero() {
  return (
    <section className="daisy-hero">
      {/* Sky morning-to-sunlight gradient layer */}
      <div className="daisy-hero-sky-bg" aria-hidden="true" />

      {/* Falling petals */}
      {petals.map((p, i) => (
        <span
          key={i}
          className="daisy-petal"
          aria-hidden="true"
          style={{
            left: p.left,
            top: "-5%",
            fontSize: p.fontSize,
            animationDuration: p.animDur,
            animationDelay: p.delay,
          }}
        >
          🌼
        </span>
      ))}

      <div className="content-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="daisy-hero-inner">
          <div>
            <motion.span
              className="daisy-hero-label"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              🌼 Aparna's corner
            </motion.span>

            <motion.h1
              className="daisy-hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Aparna —{" "}
              <span className="accent-wrapper">
                <span className="accent">My Daisy</span>
                {/* SVG Animated Handwritten Underline */}
                <svg className="handwritten-underline-svg" viewBox="0 0 200 20" fill="none">
                  <motion.path
                    d="M 5 15 Q 100 5 195 12"
                    stroke="var(--daisy-yellow)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              className="daisy-hero-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              My happiness pill, my elder sister, the friend I met during Allen coaching, and the familiar face who made college feel like somewhere I could belong.
            </motion.p>

            <motion.p
              className="daisy-hero-sub2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              You began as an ARMY conversation, became my best backup-plan decision, and turned into one of the most important people in my life.
            </motion.p>

            <motion.div
              className="daisy-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a href="#allen-story" className="primary-button btn-daisy-primary">
                📓 Our Allen Story
              </a>
              <a href="#college-form" className="primary-button btn-daisy-primary">
                📋 The College Form
              </a>
              <a href="#aparna-letter" className="primary-button ghost-button btn-daisy-ghost">
                💌 Open My Letter
              </a>
              <a href="#joke-garden" className="primary-button ghost-button btn-daisy-ghost">
                🌸 Joke Garden
              </a>
            </motion.div>
          </div>

          {/* Elevated Storybook & Decorative Stack */}
          <motion.div
            className="daisy-hero-illustration"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="daisy-sky-glow" aria-hidden="true" />

            {/* Slowly Opening Storybook */}
            <motion.div
              className="daisy-storybook opening-storybook"
              initial={{ rotateY: -25 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="daisy-storybook-inner">
                <div className="daisy-storybook-emoji">📖</div>
                <p className="daisy-storybook-text">
                  Allen, 2022<br />
                  <em>The story begins here</em>
                </p>
                {/* Small floating items inside */}
                <div className="hero-storybook-props">
                  <span>📚</span> <span>🍬</span> <span>💜</span> <span>📿</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Chat Bubble */}
            <motion.div
              className="army-bubble"
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            >
              “Are you an ARMY?” 💜
            </motion.div>

            {/* Peeking College Form */}
            <motion.div
              className="form-card-bg"
              initial={{ opacity: 0, y: 25, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className="form-card-bg-inner">
                College Form<br />
                B option ✓<br />
                Best decision 🌼
              </div>
            </motion.div>

            {/* Growing Daisy Stems from bottom */}
            <div className="daisy-growing-stems" aria-hidden="true">
              <span className="stem stem-1">🌼</span>
              <span className="stem stem-2">🌸</span>
              <span className="stem stem-3">🌼</span>
            </div>

            <div className="daisy-grass" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
