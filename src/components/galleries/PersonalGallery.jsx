import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlusCircle } from "lucide-react";
import { useStackableGallery } from "../../hooks/useStackableGallery";
import { useRealtimeMedia } from "../../hooks/useRealtimeMedia";
import StackablePhotoDeck from "./StackablePhotoDeck";
import MediaCard from "./MediaCard";
import MediaLightbox from "./MediaLightbox";
import GalleryFilters from "./GalleryFilters";
import MediaUploadModal from "./MediaUploadModal";

export default function PersonalGallery({
  initialDeck = [],
  title,
  subtitle,
  handwrittenLine,
  kicker,
  theme = "daisy",
}) {
  const {
    deck,
    activeIdx,
    nextCard,
    prevCard,
    shuffleDeck,
    fullModalOpen,
    setFullModalOpen,
    activeCategory,
    setActiveCategory,
    filteredDeck,
  } = useStackableGallery(initialDeck);

  const { mediaList, uploadMemory } = useRealtimeMedia(theme);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const combinedDeck = [...mediaList, ...deck];
  const categories = ["All", ...new Set(combinedDeck.map((i) => i.category || "General"))];
  const activeFiltered = activeCategory === "All"
    ? combinedDeck
    : combinedDeck.filter((i) => (i.category || "").toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className={`personal-gallery-section page-grain theme-${theme}`}>
      <div className="content-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span className="section-kicker" style={{ color: theme === "daisy" ? "var(--daisy-blue-dark)" : "var(--sunshine-purple)", justifyContent: "center" }}>
            {kicker || "📸 Personal Photo Deck"}
          </span>
          <h2 className="section-title" style={{ color: theme === "daisy" ? "var(--daisy-text)" : "var(--sunshine-deep)", marginBottom: "0.5rem" }}>
            {title}
          </h2>
          <p style={{ color: theme === "daisy" ? "var(--daisy-muted)" : "var(--sunshine-muted)", maxWidth: 580, marginInline: "auto", fontSize: "1.05rem" }}>
            {subtitle}
          </p>
          {handwrittenLine && (
            <p className="handwritten-note" style={{ color: theme === "daisy" ? "var(--daisy-blue-dark)" : "var(--sunshine-purple)", fontSize: "1.3rem", marginTop: "0.5rem" }}>
              "{handwrittenLine}"
            </p>
          )}
          <button
            className={`primary-button ${theme === "daisy" ? "btn-daisy" : "btn-sunshine"}`}
            style={{ marginTop: "1rem", fontSize: "0.9rem" }}
            onClick={() => setIsUploadOpen(true)}
          >
            <PlusCircle size={16} /> Add a {theme === "daisy" ? "Daisy" : "Sunshine"} Memory
          </button>
        </div>

        {/* Stackable Deck */}
        <StackablePhotoDeck
          deck={combinedDeck}
          activeIdx={activeIdx}
          onNext={nextCard}
          onPrev={prevCard}
          onShuffle={shuffleDeck}
          onOpenFull={() => setFullModalOpen(true)}
          theme={theme}
        />
      </div>

      {/* Full-Screen Gallery Modal ("View All Twenty") */}
      <AnimatePresence>
        {fullModalOpen && (
          <motion.div
            className="full-gallery-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="full-gallery-modal-container">
              <div className="full-gallery-header">
                <div>
                  <h3 style={{ fontSize: "1.8rem", fontFamily: "var(--font-display)" }}>{title} — Full Collection</h3>
                  <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>Viewing all {activeFiltered.length} memories</p>
                </div>
                <button className="lightbox-close-btn" onClick={() => setFullModalOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* Category Filter Chips */}
              <GalleryFilters
                options={categories}
                activeFilter={activeCategory}
                onSelectFilter={setActiveCategory}
              />

              {/* Scrapbook Grid */}
              <div className="full-gallery-grid">
                {activeFiltered.map((item) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    onClick={(i) => setSelectedMedia(i)}
                    frameStyle={theme === "daisy" ? "polaroid" : "classic"}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for Full Modal item */}
      {selectedMedia && (
        <MediaLightbox
          item={selectedMedia}
          items={activeFiltered}
          onClose={() => setSelectedMedia(null)}
          onNavigate={(nextItem) => setSelectedMedia(nextItem)}
        />
      )}

      {/* Upload Modal */}
      <MediaUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={uploadMemory}
        defaultGalleryType={theme}
      />
    </section>
  );
}
