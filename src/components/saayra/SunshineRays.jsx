import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { sunshineRays, sunshineFinalLine } from "../../data/saayraData";

export default function SunshineRays() {
  const [openRay, setOpenRay] = useState(null);
  return (
    <section className="rays-section">
      <div className="content-container">
        <SectionHeading label="Why You Are Sunshine" title="You Lift My Mood in Two Minutes" dividerColor="var(--sunshine-gold)" />
        <div className="sunshine-rays-accordion" role="list">
          {sunshineRays.map((ray, i) => (
            <motion.div key={ray.id} className="ray-item" role="listitem" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <button className="ray-btn" onClick={() => setOpenRay(openRay === ray.id ? null : ray.id)} aria-expanded={openRay === ray.id}>
                <span className="ray-icon" aria-hidden="true">{ray.emoji}</span>
                <span>{ray.title}</span>
                <span style={{ marginLeft: "auto", opacity: 0.5 }}>{openRay === ray.id ? "▲" : "▼"}</span>
              </button>
              <AnimatePresence>
                {openRay === ray.id && (
                  <motion.div className="ray-content" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }}>
                    <p style={{ margin: 0, fontStyle: "italic", marginBottom: "0.4rem", opacity: 0.75 }}>"{ray.desc}"</p>
                    <p style={{ margin: 0 }}>{ray.full}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <motion.p className="ray-final" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{sunshineFinalLine}</motion.p>
      </div>
    </section>
  );
}
