import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { saayraThankYouNotes } from "../../data/saayraData";

const noteRotations = [-0.6, 0.4, -0.3, 0.7, -0.5, 0.3, -0.7, 0.5, -0.4, 0.6, -0.5, 0.4];
const pastelColors = [
  "#f0e8ff", // Lavender
  "#fff8e0", // Pale yellow
  "#e8f0ff", // Soft blue
  "#f8ffe8", // Pale sage
  "#fff0f8", // Blush pink
  "#fff8f0", // Warm cream
];

export default function SaayraThankYouWall() {
  const visibleNotes = saayraThankYouNotes.filter(
    (note) => typeof note?.text === "string" && note.text.trim().length > 0
  );

  return (
    <section className="saayra-thankyou-section sunshine-section sunshine-section--dark" id="thankyou-wall">
      <div className="content-container">
        <SectionHeading
          label="Shukriya"
          title="Itne Shukriya Hain Ki Poori Umar Kam Padegi"
          center
          dividerColor="var(--sunshine-gold)"
        />

        <div className="sunshine-thankyou-grid" role="list">
          {visibleNotes.map((note, i) => {
            const rot = noteRotations[i % noteRotations.length];
            const bg = pastelColors[i % pastelColors.length];

            return (
              <motion.div
                key={i}
                className="sunshine-thankyou-note"
                role="listitem"
                initial={{ opacity: 0, y: 24, rotate: -2, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, rotate: rot, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                style={{
                  backgroundColor: bg,
                  "--note-rotation": `${rot}deg`,
                }}
              >
                <span className="sunshine-thankyou-note__number" aria-hidden="true">
                  {i + 1}
                </span>

                <p className="sunshine-thankyou-note__text">{note.text}</p>

                <span className="sunshine-thankyou-note__sparkle" aria-hidden="true">
                  ✦
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="sunshine-big-note"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="sunshine-big-note-title">Sabse Bada Shukriya</h3>
          <p className="sunshine-big-note-text">
            Meri zindagi mein aane ke liye aur mujhe apni dosti ke layak samajhne ke liye shukriya.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
