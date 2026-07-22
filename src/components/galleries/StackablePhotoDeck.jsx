import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { getMediaSrc, PLACEHOLDER_IMAGES } from "../../lib/mediaHelpers";

export default function StackablePhotoDeck({
  deck = [],
  activeIdx,
  onNext,
  onPrev,
  onShuffle,
  onOpenFull,
  theme = "daisy",
}) {
  const currentItem = deck[activeIdx] || deck[0];
  const nextItem = deck[(activeIdx + 1) % deck.length];
  const thirdItem = deck[(activeIdx + 2) % deck.length];

  if (!currentItem) return null;

  return (
    <div className={`stack-gallery-wrapper theme-${theme}`}>
      {/* Controls Bar */}
      <div className="stack-gallery-controls-top">
        <span className="stack-counter-badge">
          Photo {activeIdx + 1} of {deck.length}
        </span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="stack-btn-icon" onClick={onShuffle} title="Shuffle the Stack">
            <Shuffle size={18} />
          </button>
          <button className="stack-btn-label" onClick={onOpenFull}>
            <Maximize2 size={16} /> View All {deck.length}
          </button>
        </div>
      </div>

      {/* Stack Container */}
      <div className="stack-gallery">
        {/* Third Card in Stack */}
        {thirdItem && (
          <div className="stack-gallery__card stack-gallery__card--third" aria-hidden="true">
            <img src={getMediaSrc(thirdItem)} alt="" loading="lazy" />
          </div>
        )}

        {/* Next Card in Stack */}
        {nextItem && (
          <div className="stack-gallery__card stack-gallery__card--next" aria-hidden="true">
            <img src={getMediaSrc(nextItem)} alt="" loading="lazy" />
          </div>
        )}

        {/* Active Top Card with Drag Support */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            className="stack-gallery__card stack-gallery__card--active"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, x: -180, rotate: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) onNext();
              if (info.offset.x > 80) onPrev();
            }}
          >
            {/* Theme Washi Tape & Stamp */}
            <div className="stack-washi-tape" />

            <div className="stack-card-img-container">
              <img
                src={getMediaSrc(currentItem)}
                alt={currentItem.alt || currentItem.caption}
                onError={(e) => (e.target.src = PLACEHOLDER_IMAGES.default)}
              />
            </div>

            <div className="stack-card-caption">
              {currentItem.handwrittenNote && (
                <p className="handwritten-note">{currentItem.handwrittenNote}</p>
              )}
              <p className="caption-text">{currentItem.caption}</p>
              <div className="stack-card-meta">
                <span className="meta-category">{currentItem.category}</span>
                <span className="meta-date">{currentItem.date}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next Bottom Nav */}
      <div className="stack-gallery-nav">
        <button className="stack-nav-btn" onClick={onPrev} aria-label="Previous photograph">
          <ChevronLeft size={20} /> Previous
        </button>
        <button className="stack-nav-btn" onClick={onNext} aria-label="Next photograph">
          Next <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
