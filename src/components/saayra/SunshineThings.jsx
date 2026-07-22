import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { sunshineThings } from "../../data/saayraData";

export default function SunshineThings() {
  const [expanded, setExpanded] = useState(null);
  return (
    <section className="things-section">
      <div className="content-container">
        <SectionHeading label="Her World" title="Things That Feel Like Sunshine" center dividerColor="var(--sunshine-gold)" />
        <div className="things-grid" role="list">
          {sunshineThings.map((thing, i) => (
            <motion.div
              key={thing.title}
              className="thing-card"
              role="listitem"
              tabIndex={0}
              onClick={() => setExpanded(expanded === thing.title ? null : thing.title)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(expanded === thing.title ? null : thing.title); }}}
              aria-expanded={expanded === thing.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
            >
              <div className="thing-card-icon" aria-hidden="true">{thing.emoji}</div>
              <h3 className="thing-card-title">{thing.title}</h3>
              <p className="thing-card-desc">{thing.desc}</p>
              <AnimatePresence>
                {expanded === thing.title && (
                  <motion.p className="thing-card-expanded" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.32 }}>
                    {thing.expanded}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
