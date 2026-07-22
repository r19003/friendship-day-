import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motionVariants";

const THINGS = [
  "Your softness is not weakness.",
  "Your shy nature does not make your presence small.",
  "You are stronger than you sometimes realise.",
  "You deserve the same care you give other people.",
  "You do not need to carry everyone’s emotions alone.",
  "Your mature side deserves rest too.",
  "Your childlike happiness is something worth protecting.",
  "Your heart is one of the most beautiful things about you.",
  "You are deeply loved.",
  "You make life warmer simply by being part of it.",
];

export default function ThingsToRememberSection() {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <section className="things-remember-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-kicker" style={{ color: "var(--daisy-blue-deep)", justifyContent: "center" }}>
            💌 Reminders For Your Heart
          </span>
          <h2 className="section-title" style={{ color: "var(--daisy-text)", marginBottom: "0.5rem" }}>
            Things I Hope You Never Forget
          </h2>
          <p style={{ color: "var(--daisy-muted)", maxWidth: 540, marginInline: "auto" }}>
            Ten quiet truths I want you to carry with you wherever life goes.
          </p>
        </div>

        {/* Elegant Cream Paper Cards Grid */}
        <motion.div
          className="things-cards-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {THINGS.map((text, idx) => {
            const isExpanded = expandedIdx === idx;
            const rotation = (idx % 4 - 1.5) * 1.8;

            return (
              <motion.div
                key={idx}
                className={`thing-paper-card ${isExpanded ? "expanded" : ""}`}
                style={{ "--card-rotation": `${rotation}deg` }}
                variants={fadeUp}
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                tabIndex={0}
              >
                <div className="card-top-ribbon">
                  <span className="card-number">#0{idx + 1}</span>
                  <span className="card-pressed-daisy">🌼</span>
                </div>
                <p className="card-text handwritten-note">
                  "{text}"
                </p>
                <div className="card-gold-edge" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
