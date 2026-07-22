import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { sharedChaosWallPosts } from "../../data/sharedData";

const rotations = [-1.5, 2, -1, 1.5, -2, 1, -1.5, 2];
const colors = [
  "rgba(141,106,216,0.18)",
  "rgba(247,197,104,0.22)",
  "rgba(141,106,216,0.14)",
  "rgba(247,197,104,0.18)",
  "rgba(141,106,216,0.20)",
  "rgba(247,197,104,0.14)",
  "rgba(141,106,216,0.16)",
];

export default function ChaosWall() {
  return (
    <section className="chaos-wall-section">
      <div className="content-container">
        <SectionHeading
          label="Observations"
          title="Things We Have Noticed About Us"
          center
          dividerColor="var(--shared-gold)"
        />
        <div className="chaos-wall-grid" role="list">
          {sharedChaosWallPosts.map((post, i) => (
            <motion.div
              key={i}
              className="chaos-wall-card"
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                transform: `rotate(${rotations[i % rotations.length]}deg)`,
                background: colors[i % colors.length],
              }}
            >
              <span className="chaos-wall-quote">"</span>
              {post}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
