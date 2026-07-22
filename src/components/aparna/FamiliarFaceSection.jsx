import React from "react";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight, viewportOnce } from "../../lib/motionVariants";

export default function FamiliarFaceSection() {
  return (
    <section className="familiar-face-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-kicker" style={{ color: "var(--daisy-blue-deep)", justifyContent: "center" }}>
            📖 Coaching to College
          </span>
          <h2 className="section-title" style={{ color: "var(--daisy-text)", marginBottom: "0.75rem" }}>
            The Familiar Face in a New Chapter
          </h2>
          <p style={{ color: "var(--daisy-muted)", maxWidth: 620, marginInline: "auto" }}>
            College was a completely new chapter, but you were the person who made it feel less unfamiliar.
          </p>
        </div>

        {/* 2-Page Book Visual */}
        <div className="familiar-notebook-wrapper">
          <div className="familiar-notebook">
            {/* Left Page — Allen Coaching */}
            <motion.div
              className="familiar-page familiar-page-left"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="page-header">
                <span className="page-tag">Allen 2022</span>
                <span className="page-number">01</span>
              </div>
              <h3 className="page-title">Coaching Days</h3>
              <p className="page-text">
                Sitting in Allen coaching, figuring out entrance exams, wondering about what college life would look like. One simple question — <em>"Are you an ARMY?"</em> — planted the seed.
              </p>
              <div className="page-doodle">💜 BTS Army Chat</div>
            </motion.div>

            {/* Center Spine & Connecting SVG Thread */}
            <div className="familiar-spine">
              <svg className="familiar-thread-svg" viewBox="0 0 40 300" fill="none">
                <motion.path
                  d="M 20 0 Q 35 75 20 150 Q 5 225 20 300"
                  stroke="var(--chaos-violet)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </svg>
              <motion.div
                className="familiar-center-daisy"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
              >
                🌼
              </motion.div>
            </div>

            {/* Right Page — College Scrapbook */}
            <motion.div
              className="familiar-page familiar-page-right"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="page-header">
                <span className="page-tag">College 2023+</span>
                <span className="page-number">02</span>
              </div>
              <h3 className="page-title">College Constant</h3>
              <p className="page-text">
                I did not have to begin everything from zero because someone from my coaching days was already there—someone I could find, talk to, sit with, laugh with, complain to, and slowly build memories with.
              </p>
              <div className="page-tab-badge">Backup Form → Best Decision</div>
            </motion.div>
          </div>

          {/* Bottom handwritten quote */}
          <motion.div
            className="familiar-handwritten-footer"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 1 }}
          >
            <p className="handwritten-note" style={{ color: "var(--daisy-blue-deep)", textAlign: "center", margin: "1.5rem 0 0" }}>
              "Sometimes one familiar person is enough to make a new place feel possible."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
