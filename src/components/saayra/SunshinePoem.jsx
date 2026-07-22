import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { saayraPoem } from "../../data/saayraData";

export default function SunshinePoem() {
  return (
    <section className="poem-section">
      <div className="poem-wrapper">
        <SectionHeading label="For Saayra" title="" center dividerColor="rgba(255,255,255,0.3)" />
        <div className="poem-text" aria-label="A poem for Saayra">
          {saayraPoem.map((line, i) =>
            line === "" ? (
              <motion.span key={i} className="stanza-break" aria-hidden="true" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} />
            ) : (
              <motion.span key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}>
                {line}
              </motion.span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
