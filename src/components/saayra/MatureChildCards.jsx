import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { matureSaayraTraits, matureSaayraDesc, childSaayraTraits, childSaayraDesc } from "../../data/saayraData";

export default function MatureChildCards() {
  return (
    <section className="mature-child-section">
      <div className="content-container">
        <SectionHeading label="Both at Once" title="Mature Mind, Tiny Child Heart" center dividerColor="var(--sunshine-gold)" />
        <div className="mature-child-grid">
          <motion.div className="mature-card mature-card-mature" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="mature-card-title">🌙 Mature Saayra</h3>
            <p className="mature-card-desc">{matureSaayraDesc}</p>
            <ul className="mature-traits" role="list">
              {matureSaayraTraits.map((t, i) => <li key={i} className="mature-trait"><span className="mature-trait-dot" aria-hidden="true" />{t}</li>)}
            </ul>
          </motion.div>
          <motion.div className="mature-card mature-card-child" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="mature-card-title">🌟 Child-at-Heart Saayra</h3>
            <p className="mature-card-desc">{childSaayraDesc}</p>
            <ul className="mature-traits" role="list">
              {childSaayraTraits.map((t, i) => <li key={i} className="mature-trait"><span className="mature-trait-dot" aria-hidden="true" />{t}</li>)}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
