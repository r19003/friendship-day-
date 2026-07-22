import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FOOD_ITEMS = [
  { id: "ramen", label: "Ramen", emoji: "🍜", animClass: "anim-ramen" },
  { id: "brownie", label: "Brownie", emoji: "🍫", animClass: "anim-brownie" },
  { id: "cake", label: "Cake", emoji: "🎂", animClass: "anim-cake" },
  { id: "momos", label: "Momos", emoji: "🥟", animClass: "anim-momos" },
  { id: "pasta", label: "Pasta", emoji: "🍝", animClass: "anim-pasta" },
  { id: "garlic_bread", label: "Garlic Bread", emoji: "🥖", animClass: "anim-garlic-bread" },
  { id: "cookies", label: "Cookies", emoji: "🍪", animClass: "anim-cookies" },
  { id: "cupcake", label: "Purple Cupcake", emoji: "🧁", animClass: "anim-cupcake" },
  { id: "comfort_meal", label: "Comfort Meal", emoji: "🍲", animClass: "anim-comfort-meal" },
  { id: "midnight_snack", label: "Midnight Snack", emoji: "🌙", animClass: "anim-midnight-snack" },
];

export default function FeedSunshine() {
  const [selectedFoods, setSelectedFoods] = useState([]);

  const addFood = (food) => {
    if (selectedFoods.some((item) => item.id === food.id)) {
      // Toggle off
      setSelectedFoods((prev) => prev.filter((item) => item.id !== food.id));
    } else {
      // Add food
      setSelectedFoods((prev) => [...prev, food]);
    }
  };

  const clearTable = () => {
    setSelectedFoods([]);
  };

  const count = selectedFoods.length;

  const getMilestoneMessage = () => {
    if (count === 0) return "The plate is waiting.";
    if (count <= 2) return "A small beginning. Sunshine may require more.";
    if (count <= 4) return "Saayra is considering whether this qualifies as enough food.";
    if (count <= 7) return "Sunshine is temporarily satisfied. This condition may not last.";
    if (count <= 9) return "Achievement unlocked: food has officially become emotional communication.";
    return "The table is full. Saayra may now consider sharing one bite.";
  };

  return (
    <section className="feed-sunshine sunshine-section sunshine-section--food" id="feed-sunshine">
      <div className="sunshine-section__inner content-container">
        <header className="feed-sunshine__header">
          <p className="section-kicker">Interactive</p>
          <h2>Feed My Sunshine 🍜</h2>
          <p>Food is not the only love language, but it is definitely one of ours.</p>
        </header>

        {/* Animated Food Table */}
        <div className="sunshine-food-table">
          <div className="sunshine-table-details" aria-hidden="true">
            <div className="sunshine-cutlery cutlery-left">🍴</div>
            <div className="sunshine-cutlery cutlery-right">🥄</div>
            <div className="sunshine-napkin" />
            <div className="sunshine-book" />
          </div>

          {/* Central Plate */}
          <div className={`sunshine-plate ${count === 10 ? "plate-full-glow" : ""}`} aria-live="polite">
            <AnimatePresence>
              {selectedFoods.map((food) => (
                <motion.div
                  key={food.id}
                  className={`sunshine-food-visual ${food.animClass}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="food-visual-emoji">{food.emoji}</span>
                  {food.id === "ramen" && <span className="ramen-steam">♨️</span>}
                  {food.id === "cake" && <span className="candle-glow">🕯️</span>}
                  {food.id === "midnight_snack" && <span className="moon-icon">🌙</span>}
                </motion.div>
              ))}
            </AnimatePresence>

            {count === 0 && (
              <p className="sunshine-plate__empty">The plate is waiting.</p>
            )}

            {count === 10 && (
              <div className="full-plate-stars">✦ ✦ ✦ ✦ ✦</div>
            )}
          </div>

          {/* Counter & Milestone */}
          <div className="sunshine-food-status">
            <strong>{count} items served</strong>
            <p>{getMilestoneMessage()}</p>
          </div>
        </div>

        {/* 10 Food Cards Grid */}
        <div className="sunshine-food-menu" role="group" aria-label="Select foods">
          {FOOD_ITEMS.map((food) => {
            const isSelected = selectedFoods.some((item) => item.id === food.id);
            return (
              <button
                key={food.id}
                type="button"
                className={`sunshine-food-option ${isSelected ? "is-selected" : ""}`}
                onClick={() => addFood(food)}
                aria-pressed={isSelected}
              >
                <span className="sunshine-food-option__emoji" aria-hidden="true">
                  {food.emoji}
                </span>
                <span className="sunshine-food-option__label">{food.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button
            type="button"
            className="button button--sunshine-secondary"
            onClick={clearTable}
            disabled={count === 0}
            style={{ opacity: count === 0 ? 0.5 : 1 }}
          >
            🧹 Clear the Table
          </button>
        </div>
      </div>
    </section>
  );
}
