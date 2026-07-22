import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGETS = ["Aparna", "Saayra", "Raina"];
const INSTIGATORS = ["Raina", "Aparna", "Saayra"];
const LAUGHERS = ["Aparna (loudest)", "Saayra (longest)", "All three equally", "Whoever started it"];
const EVIDENCE = [
  "An old photo nobody meant to resurface",
  "A message sent at 2 AM",
  "A dramatic reaction to something minor",
  "A failed game attempt at Smash",
  "A food order that defied logic",
  "A trip plan that changed four times",
  "Something said during a night stay",
  "A voice note from the AMI chat",
  "A very confident opinion that aged poorly",
];
const RESULTS = [
  "Target laughed hardest despite being roasted",
  "A rematch was immediately demanded",
  "This will be referenced for the next two weeks",
  "Nobody won but nobody lost either",
  "Peace was restored with snacks",
  "Evidence was archived for future use",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function TeasingGenerator() {
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const generate = () => {
    setSpinning(true);
    setTimeout(() => {
      setResult({
        target: pick(TARGETS),
        instigator: pick(INSTIGATORS),
        laugher: pick(LAUGHERS),
        evidence: pick(EVIDENCE),
        final: pick(RESULTS),
      });
      setSpinning(false);
    }, 600);
  };

  return (
    <section className="teasing-section page-grain">
      <div className="content-container">
        <div style={{ maxWidth: 720, marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className="section-kicker" style={{ color: "var(--chaos-yellow)", justifyContent: "center" }}>
              😂 The Teasing Department
            </span>
            <h2 style={{ color: "white", marginBottom: "0.5rem" }}>Today's Report</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 480, marginInline: "auto" }}>
              Every harmless statement could become a joke, and every joke could remain active for several days.
            </p>
          </div>

          <motion.div
            className="teasing-card"
            animate={spinning ? { scale: [1, 0.97, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: "center" }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎲</div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-handwritten)", fontSize: "1.2rem", margin: 0 }}>
                    Generate today's teasing report
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  className="teasing-result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {[
                    ["🎯 Today's target", result.target],
                    ["😈 Instigator", result.instigator],
                    ["😂 Laughed loudest", result.laugher],
                    ["🔍 Evidence used", result.evidence],
                    ["📋 Final result", result.final],
                  ].map(([label, value]) => (
                    <div key={label} className="teasing-item">
                      <div className="teasing-item-label">{label}</div>
                      <div className="teasing-item-value">{value}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button className="glow-button" onClick={generate} disabled={spinning}>
              {spinning ? "⏳ Generating..." : result ? "🔄 New Report" : "🎲 Generate Report"}
            </button>
          </div>

          {result && (
            <p style={{ textAlign: "center", marginTop: "1rem", color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", fontStyle: "italic" }}>
              All content is affectionate. No evidence was harmed in the making of this report.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
