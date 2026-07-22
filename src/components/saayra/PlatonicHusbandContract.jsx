import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { platonicContractData } from "../../data/saayraData";
import confetti from "canvas-confetti";

export default function PlatonicHusbandContract() {
  const [stamped, setStamped] = useState(false);
  const [result, setResult] = useState(false);

  function handleRenew() {
    setStamped(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#7954a1", "#cdb5e8", "#f4c561", "#eee3fa"] });
    setResult(true);
    setTimeout(() => setStamped(false), 600);
    setTimeout(() => setResult(false), 5000);
  }

  return (
    <section className="contract-section">
      <div className="reading-container">
        <SectionHeading label="Official Document" title="Official Platonic Husband Contract" center dividerColor="var(--sunshine-gold)" />
        <motion.div className="contract-doc" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="contract-ornament-top">
            <div className="contract-ornament-line" />
            <span className="contract-ornament-star">✦</span>
            <span className="contract-ornament-star">✦</span>
            <span className="contract-ornament-star">✦</span>
            <div className="contract-ornament-line" />
          </div>
          <h3 className="contract-title">Platonic Husband Contract</h3>
          <p className="contract-subtitle">{platonicContractData.subtitle}</p>
          <p style={{ fontSize: "0.93rem", color: "var(--sunshine-text)", marginBottom: "0.5rem" }}>
            {platonicContractData.party1} is permanently appointed as {platonicContractData.party2}'s platonic husband.
          </p>
          <p className="contract-section-heading">Responsibilities</p>
          <ul className="contract-list" role="list">
            {platonicContractData.responsibilities.map((r, i) => <li key={i} className="contract-item">{r}</li>)}
          </ul>
          <p className="contract-section-heading">Vows</p>
          {platonicContractData.vows.map((vow, i) => <blockquote key={i} className="contract-vow">"{vow}"</blockquote>)}
          <div className="contract-signature-row">
            <div className="contract-sig-line">Saayra<br /><span style={{ fontFamily: "var(--font-handwritten)", fontSize: "1.3rem", opacity: 0.7 }}>Saayra ✦</span></div>
            <div className="contract-sig-line">Raina<br /><span style={{ fontFamily: "var(--font-handwritten)", fontSize: "1.3rem", opacity: 0.7 }}>Raina ✦</span></div>
          </div>
          <button className={`contract-seal${stamped ? " stamped" : ""}`} onClick={handleRenew} aria-label="Stamp the seal">
            <span className="contract-seal-emoji">💜</span>
            <span className="contract-seal-text">Valid<br />Forever</span>
          </button>
          <div className="contract-ornament-bottom" style={{ marginTop: "1.5rem" }}>
            <div className="contract-ornament-line" />
            <span className="contract-ornament-star">✦</span>
            <div className="contract-ornament-line" />
          </div>
          <div className="contract-btns">
            <button className="contract-btn-renew" onClick={handleRenew}>💜 Renew Contract</button>
            <button className="contract-btn-renew" onClick={handleRenew} style={{ background: "var(--sunshine-gold)", color: "#2a1a00" }}>✨ Add Another Lifetime</button>
          </div>
          <AnimatePresence>
            {result && (
              <motion.div className="contract-result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
                {platonicContractData.renewResult}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
