import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { saayraThankYouNotes } from "../../data/saayraData";

const rotations = [2, -1.5, 1, -2, 1.5, -1, 2.5, -2, 1, -1.5, 2, -0.5, 1.5, -2, 1, -1];

export default function SaayraThankYouWall() {
  return (
    <section className="sunshine-thankyou-section">
      <div className="content-container">
        <SectionHeading label="Shukriya" title="Itne Shukriya Hain Ki Poori Umar Kam Padegi" center dividerColor="var(--sunshine-gold)" />
        <div className="sunshine-notes-grid" role="list">
          {saayraThankYouNotes.map((note, i) => (
            <motion.div
              key={i}
              className={`sunshine-note${note.recipeStyle ? " recipe-style" : ""}`}
              role="listitem"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 4) * 0.08 }}
              style={{ background: note.recipeStyle ? undefined : note.color, transform: `rotate(${rotations[i % rotations.length]}deg)` }}
            >
              {note.text}
            </motion.div>
          ))}
        </div>
        <motion.div className="sunshine-big-note" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="sunshine-big-note-title">Sabse Bada Shukriya</h3>
          <p className="sunshine-big-note-text">Meri zindagi mein aane ke liye aur mujhe apni dosti ke layak samajhne ke liye shukriya.</p>
        </motion.div>
      </div>
    </section>
  );
}
