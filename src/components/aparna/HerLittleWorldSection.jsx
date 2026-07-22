import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motionVariants";

const WORLD_STOPS = [
  {
    id: "books",
    icon: "📚",
    title: "Books",
    frameType: "book-page",
    desc: "Stories, characters, fictional worlds, and the joy of finding one more book worth loving.",
    detail: "Reading is your sanctuary. You get lost in worlds and come back with the softest perspective on ours.",
  },
  {
    id: "love-stories",
    icon: "💌",
    title: "Cute Love Stories",
    frameType: "candy-wrapper",
    desc: "Because softness, affection, and lovely stories deserve their own corner.",
    detail: "You get so genuinely happy when reading sweet romances. It is one of the cutest things about you.",
  },
  {
    id: "taylor-swift",
    icon: "🎤",
    title: "Taylor Swift",
    frameType: "music-ticket",
    desc: "Songs, eras, feelings, dramatic bridges, and the comfort of music that understands.",
    detail: "Screaming bridges, breaking down lyrics, and placing every mood into a Taylor Swift era.",
  },
  {
    id: "bts",
    icon: "💜",
    title: "BTS & ARMY",
    frameType: "friendship-bracelet",
    desc: "A question about being an ARMY became one of the earliest bridges between us.",
    detail: "Seven letters in 2022 that started a lifetime of bias-wrecker debates and purple hearts.",
  },
  {
    id: "sweets",
    icon: "🍬",
    title: "Sweets & Desserts",
    frameType: "flower-press",
    desc: "The quickest route to Literal Child Aparna mode.",
    detail: "One mention of cake or chocolate and your face lights up like a five-year-old on holiday.",
  },
  {
    id: "daisies",
    icon: "🌼",
    title: "Daisies",
    frameType: "tiny-letter",
    desc: "Soft, bright, warm, and stronger than they first appear.",
    detail: "You bring warmth without demanding attention. Softer, brighter, and quietly resilient.",
  },
];

export default function HerLittleWorldSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="her-little-world-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-kicker" style={{ color: "var(--daisy-blue-deep)", justifyContent: "center" }}>
            ✨ Storybook Journey
          </span>
          <h2 className="section-title" style={{ color: "var(--daisy-text)", marginBottom: "0.5rem" }}>
            A Little World That Feels Like You
          </h2>
          <p style={{ color: "var(--daisy-muted)", maxWidth: 540, marginInline: "auto" }}>
            The books, music, sweets, and quiet joy that make Aparna who she is.
          </p>
        </div>

        {/* Storybook Horizontal Scroll Snap Container */}
        <motion.div
          className="storybook-scroll-track"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {WORLD_STOPS.map((stop, index) => {
            const isActive = activeIdx === index;
            return (
              <div
                key={stop.id}
                className={`storybook-stop-card frame-${stop.frameType} ${isActive ? "active" : ""}`}
                onClick={() => setActiveIdx(index)}
                tabIndex={0}
              >
                <div className="stop-icon-wrapper">
                  <span className="stop-icon">{stop.icon}</span>
                </div>
                <div className="stop-frame-content">
                  <span className="stop-badge">Stop #{index + 1}</span>
                  <h3 className="stop-title">{stop.title}</h3>
                  <p className="stop-desc">{stop.desc}</p>
                  <p className="stop-detail">{stop.detail}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
