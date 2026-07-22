import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { bucketList } from "../../data/sharedData";
import confetti from "canvas-confetti";

export default function BucketList() {
  const [checked, setChecked] = useState({});

  function handleCheck(i) {
    const wasChecked = checked[i];
    setChecked(prev => ({ ...prev, [i]: !prev[i] }));
    if (!wasChecked) {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#f7d866", "#cdb5e8", "#cce8f5", "#8d6ad8"],
      });
    }
  }

  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <section id="bucket-list" className="bucket-section">
      <div className="content-container">
        <SectionHeading
          label="Plans"
          title="Things We Still Have to Do"
          subtitle={`${doneCount} of ${bucketList.length} planned adventures. The chaos has only just begun.`}
          center
          dividerColor="var(--shared-purple-light)"
        />
        <ul className="bucket-list" role="list">
          {bucketList.map((item, i) => (
            <motion.li
              key={i}
              className={`bucket-item${checked[i] ? " done" : ""}`}
              role="listitem"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <button
                className="bucket-checkbox"
                onClick={() => handleCheck(i)}
                aria-pressed={!!checked[i]}
                aria-label={checked[i] ? `Mark as undone: ${item.text}` : `Mark as done: ${item.text}`}
              >
                {checked[i] ? "✓" : ""}
              </button>
              <span className="bucket-emoji" aria-hidden="true">{item.emoji}</span>
              <span className={`bucket-text${checked[i] ? " strikethrough" : ""}`}>{item.text}</span>
            </motion.li>
          ))}
        </ul>
        <motion.p
          style={{ textAlign: "center", marginTop: "2.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Three cities. One to-do list that keeps growing. The chaos is the point.
        </motion.p>
      </div>
    </section>
  );
}
