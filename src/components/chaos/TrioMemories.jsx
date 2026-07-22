import React from "react";
import { motion } from "framer-motion";
import { trioMemories } from "../../data/sharedData";
import { staggerContainer, fadeUp, viewportOnce } from "../../lib/motionVariants";

export default function TrioMemories() {
  return (
    <section className="chaos-page page-grain" style={{ background: "linear-gradient(180deg, var(--chaos-night), var(--chaos-purple))", paddingBlock: "var(--space-section)" }}>
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-lavender)", justifyContent: "center" }}>
            📼 Our Archive
          </span>
          <h2 style={{ color: "white", marginBottom: "0.75rem" }}>
            Shared Memories, All Three of Us
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 520, marginInline: "auto" }}>
            The moments that built this friendship, one ordinary extraordinary day at a time.
          </p>
        </div>

        <motion.div
          className="trio-memories-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {trioMemories.map((memory) => (
            <motion.div
              key={memory.id}
              className="trio-memory-card"
              variants={fadeUp}
            >
              <span className={`trio-memory-type-badge type-${memory.type}`}>
                {memory.type}
              </span>
              <h3 className="trio-memory-title">{memory.title}</h3>
              <p className="trio-memory-desc">{memory.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
