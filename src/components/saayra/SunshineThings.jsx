import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";

const COSY_ITEMS = [
  { id: "lamp", name: "Purple Lamp", emoji: "💡", desc: "Click to turn on the warm lamp light", activeText: "The room fills with a warm, soft purple glow." },
  { id: "books", name: "Book Stack", emoji: "📚", desc: "Click to open a favorite storybook", activeText: "The pages open to a gentle chapter full of comfort." },
  { id: "notebook", name: "Poetry Notebook", emoji: "📖", desc: "Click to view a handwritten note", activeText: "'Some friendships feel like a warm cup of tea on a cold evening.'" },
  { id: "ramen", name: "Ramen Bowl", emoji: "🍜", desc: "Click to start the warm steam", activeText: "Steam rises from a hot bowl of ramen. Instant happiness." },
  { id: "baking", name: "Baking Tray", emoji: "🧁", desc: "Click to warm up the oven glow", activeText: "The aroma of fresh baking fills the cosy room." },
  { id: "window", name: "Small Window", emoji: "🪟", desc: "Click to look out at the purple sunset sky", activeText: "Out the window, the sky turns a soft lavender and gold." },
  { id: "cushion", name: "Soft Cushion", emoji: "🛋️", desc: "Click to sit back and rest", activeText: "The softest spot in the room, reserved for quiet rants and laughs." },
];

export default function SunshineThings() {
  const [activeItemId, setActiveItemId] = useState("lamp");

  const activeItem = COSY_ITEMS.find((i) => i.id === activeItemId) || COSY_ITEMS[0];

  return (
    <section className="cosy-corner-section sunshine-section sunshine-section--journal" id="cosy-corner">
      <div className="content-container">
        <SectionHeading
          label="Cosy Sanctuary"
          title="Saayra’s Sunshine Comfort Corner"
          center
          dividerColor="var(--sunshine-gold)"
        />

        {/* Cosy Composition Stage */}
        <div className="cosy-composition-stage">
          <div className="cosy-room-grid" role="group" aria-label="Cosy room items">
            {COSY_ITEMS.map((item) => {
              const isActive = activeItemId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`cosy-item-btn cosy-item--${item.id} ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveItemId(item.id)}
                  title={item.desc}
                  aria-pressed={isActive}
                >
                  <span className="cosy-item-emoji" aria-hidden="true">{item.emoji}</span>
                  <span className="cosy-item-label">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Item Description Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              className="cosy-active-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="cosy-card-icon">{activeItem.emoji}</div>
              <h3>{activeItem.name}</h3>
              <p className="cosy-active-text">{activeItem.activeText}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
