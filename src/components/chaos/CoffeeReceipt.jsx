import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COFFEE_ITEMS = [
  { item: "One life update", price: "long" },
  { item: "One rant (small)", price: "medium" },
  { item: "Two jokes", price: "free" },
  { item: "One trip plan that changed", price: "twice" },
  { item: "One BTS discussion", price: "entire hour" },
  { item: "One emotional conversation", price: "priceless" },
  { item: "No intention of leaving", price: "ongoing" },
];

export default function CoffeeReceipt() {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  const addLine = () => {
    if (done) return;
    const next = COFFEE_ITEMS[lines.length];
    if (!next) return;
    const newLines = [...lines, next];
    setLines(newLines);
    if (newLines.length === COFFEE_ITEMS.length) setDone(true);
  };

  const reset = () => { setLines([]); setDone(false); };

  return (
    <section className="coffee-section page-grain">
      <div className="content-container">
        <div style={{ maxWidth: 680, marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className="section-kicker" style={{ color: "var(--chaos-yellow)", justifyContent: "center" }}>
              ☕ College Coffee Memories
            </span>
            <h2 style={{ color: "white", marginBottom: "0.5rem" }}>Order One More Coffee</h2>
            <p style={{ color: "rgba(255,255,255,0.55)" }}>
              A simple coffee became much more than coffee.
            </p>
          </div>

          <div className="coffee-receipt-wrapper">
            <motion.div
              className="coffee-receipt"
              animate={lines.length > 0 ? { scale: [1, 1.01, 1] } : {}}
            >
              <div className="receipt-header">
                <div className="receipt-title">☕ COLLEGE COFFEE ORDER</div>
                <div className="receipt-sub">Actual purpose: spending more time together</div>
                <div className="receipt-sub" style={{ marginTop: 4 }}>
                  {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </div>

              <div className="receipt-lines">
                <AnimatePresence>
                  {lines.map((line, i) => (
                    <motion.div
                      key={i}
                      className="receipt-line"
                      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                    >
                      <span className="item">{line.item}</span>
                      <span className="price">{line.price}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {lines.length === 0 && (
                  <div style={{ color: "#aaa", fontStyle: "italic", fontSize: "0.75rem", textAlign: "center", padding: "1rem 0" }}>
                    Press the button to start ordering…
                  </div>
                )}
              </div>

              {done && (
                <motion.div
                  className="receipt-footer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Total: another memory we did not realise we were making.
                </motion.div>
              )}
            </motion.div>

            <div style={{ textAlign: "center" }}>
              {!done ? (
                <button className="glow-button" onClick={addLine}>
                  ☕ Order One More Coffee
                </button>
              ) : (
                <button className="glow-button" onClick={reset}>
                  🔁 Start a New Session
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
