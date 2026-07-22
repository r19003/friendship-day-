import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { foodItems, feedMilestones } from "../../data/saayraData";
import confetti from "canvas-confetti";

export default function FeedSunshine() {
  const [count, setCount] = useState(0);
  const [plateItems, setPlateItems] = useState([]);
  const [milestone, setMilestone] = useState("");

  function handleFeed(food) {
    const next = count + 1;
    setCount(next);
    setPlateItems(prev => [...prev.slice(-8), food.emoji]);
    const msg = feedMilestones[next];
    if (msg) {
      setMilestone(msg);
      if (next === 8) confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 }, colors: ["#7954a1", "#f4c561", "#cdb5e8"] });
    } else {
      setMilestone("");
    }
  }

  return (
    <section className="feed-section">
      <div className="content-container">
        <SectionHeading label="Interactive" title="Feed My Sunshine 🍜" center dividerColor="var(--sunshine-gold)" />
        <div className="feed-plate-wrapper">
          <div className="feed-plate" aria-label={`Plate with ${count} items`} aria-live="polite">
            <span className="feed-counter">{count}</span>
            {plateItems.length === 0
              ? <span style={{ opacity: 0.3, fontSize: "1rem" }}>empty plate 🍽️</span>
              : plateItems.map((e, i) => <span key={i}>{e}</span>)
            }
          </div>
          <div className="feed-food-grid" role="group" aria-label="Choose food">
            {foodItems.map(food => (
              <button key={food.label} className="feed-food-btn" onClick={() => handleFeed(food)} aria-label={`Feed ${food.label}`}>
                <span aria-hidden="true">{food.emoji}</span>
                <span className="feed-food-label">{food.label}</span>
              </button>
            ))}
          </div>
          <AnimatePresence>
            {milestone && (
              <motion.div className="feed-milestone" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
                {milestone}
              </motion.div>
            )}
          </AnimatePresence>
          {count > 0 && (
            <button className="feed-reset-btn" onClick={() => { setCount(0); setPlateItems([]); setMilestone(""); }}>
              Reset plate
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
