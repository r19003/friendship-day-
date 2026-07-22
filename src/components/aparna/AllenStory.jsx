import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { allenCopy, allenTimeline } from "../../data/aparnaData";
import { fadeUp, viewportOnce } from "../../lib/motionVariants";

export default function AllenStory() {
  const [starsVisible, setStarsVisible] = useState(false);

  return (
    <section id="allen-story" className="allen-section page-grain">
      <div className="content-container">
        <div className="allen-inner">
          {/* Notebook Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <div className="allen-notebook">
              <div className="page-corner-fold" />
              <div className="allen-notebook-lines" aria-hidden="true" />
              <div className="allen-notebook-margin" aria-hidden="true" />
              
              {/* Coaching desk elements */}
              <div className="coaching-desk-props" aria-hidden="true">
                <span className="desk-pencil">✏️</span>
                <span className="desk-bts-doodle">💜 BTS</span>
              </div>

              <span className="allen-notebook-label">📓 Allen Coaching</span>
              
              {/* Animated Caveat Line */}
              <motion.div
                className="allen-notebook-date handwritten-note"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                style={{ color: "var(--daisy-blue-deep)", fontFamily: "var(--font-handwritten)" }}
              >
                Allen, 2022
                <div className="pencil-underline" />
              </motion.div>

              <button
                className="allen-chat-bubble"
                onClick={() => setStarsVisible((v) => !v)}
                aria-expanded={starsVisible}
              >
                “Are you an ARMY?” 💜
              </button>

              <AnimatePresence>
                {starsVisible && (
                  <motion.div
                    className="allen-stars"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="allen-star" style={{ animationDelay: `${i * 0.12}s` }} />
                    ))}
                    <span style={{ fontSize: "0.8rem", color: "var(--chaos-violet)", fontFamily: "var(--font-handwritten)", marginLeft: "0.5rem" }}>
                      7 stars for 7 members 💜
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="allen-timeline" role="list">
                {allenTimeline.map((item, i) => (
                  <motion.div
                    key={i}
                    className="allen-timeline-item"
                    role="listitem"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="allen-timeline-date">{item.date}</div>
                    <div className="allen-timeline-title">{item.title}</div>
                    <div className="allen-timeline-text">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <div className="allen-text-side">
            <SectionHeading
              label="2022 · Allen Coaching"
              title="Before College, There Was Allen"
              subtitle="One coaching class, one ARMY question, and one college form that changed more than we realised."
              dividerColor="var(--daisy-blue-deep)"
            />
            {allenCopy.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ delay: i * 0.12 }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
