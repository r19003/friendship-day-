import React from "react";
import { motion } from "framer-motion";
import { memoryRibbonItems } from "../../data/sharedData";
import { fadeUp, viewportOnce } from "../../lib/motionVariants";

export default function MemoryRibbon() {
  return (
    <section id="memory-ribbon" className="memory-ribbon-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-yellow)", justifyContent: "center" }}>
            🎀 Repeated Habits &amp; Shared Phrases
          </span>
          <h2 style={{ color: "white", marginBottom: "0.75rem" }}>
            The Little Things That Became Our Things
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 540, marginInline: "auto" }}>
            The ordinary moments, unwritten rules, and repeated jokes that quietly hold our trio together.
          </p>
        </div>

        <motion.div
          className="memory-ribbon-container"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="memory-ribbon-track">
            {memoryRibbonItems.map((text, i) => {
              const rotation = (i % 5 - 2) * 2.2;
              return (
                <div
                  key={i}
                  className="memory-ribbon-card"
                  style={{ "--rotation": `${rotation}deg` }}
                  tabIndex={0}
                >
                  <span className="memory-ribbon-number">#0{i + 1}</span>
                  <p className="memory-ribbon-text">{text}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
