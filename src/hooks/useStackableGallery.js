import { useState } from "react";

export function useStackableGallery(initialDeck = []) {
  const [deck, setDeck] = useState(initialDeck);
  const [activeIdx, setActiveIdx] = useState(0);
  const [fullModalOpen, setFullModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const total = deck.length;

  const nextCard = () => {
    setActiveIdx((prev) => (prev + 1) % total);
  };

  const prevCard = () => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  };

  const shuffleDeck = () => {
    setDeck((prev) => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
    setActiveIdx(0);
  };

  const filteredDeck = activeCategory === "All"
    ? deck
    : deck.filter((i) => (i.category || "").toLowerCase() === activeCategory.toLowerCase());

  return {
    deck,
    activeIdx,
    setActiveIdx,
    activeCard: deck[activeIdx] || deck[0],
    total,
    nextCard,
    prevCard,
    shuffleDeck,
    fullModalOpen,
    setFullModalOpen,
    activeCategory,
    setActiveCategory,
    filteredDeck,
  };
}
