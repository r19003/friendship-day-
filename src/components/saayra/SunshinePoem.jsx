import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { saayraPoem } from "../../data/saayraData";

export default function SunshinePoem() {
  const poemContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.18,
      },
    },
  };

  const poemStanza = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="sunshine-poem-section sunshine-section sunshine-section--dark" id="sunshine-poem">
      <div className="content-container">
        <SectionHeading
          label="For Saayra"
          title="My Sunshine, in Words"
          subtitle="Some people become memories. Some become comfort. You became both."
          center
          dividerColor="var(--sunshine-gold)"
        />

        <motion.div
          className="sunshine-poem-paper"
          variants={poemContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
        >
          <div className="poem-margin-line" aria-hidden="true" />

          {saayraPoem.map((stanzaText, index) => (
            <motion.div key={index} className="sunshine-poem-stanza" variants={poemStanza}>
              <p>{stanzaText}</p>
              <span className="stanza-star" aria-hidden="true">✦</span>
            </motion.div>
          ))}

          <div className="poem-handwritten-underline" aria-hidden="true">
            <svg viewBox="0 0 300 15" fill="none">
              <motion.path
                d="M 5 10 Q 150 2 295 8"
                stroke="var(--sunshine-gold)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
