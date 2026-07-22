import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import { useSemesterGallery } from "../../hooks/useSemesterGallery";
import { useRealtimeMedia } from "../../hooks/useRealtimeMedia";
import SemesterTabs from "./SemesterTabs";
import SemesterMediaGrid from "./SemesterMediaGrid";
import GalleryFilters from "./GalleryFilters";
import MediaLightbox from "./MediaLightbox";
import TimelineScrubber from "./TimelineScrubber";
import MediaUploadModal from "./MediaUploadModal";

const FILTER_OPTIONS = [
  { value: "all", label: "All Media" },
  { value: "photos", label: "📷 Photos" },
  { value: "videos", label: "🎬 Videos" },
  { value: "College", label: "🏫 College" },
  { value: "BTS", label: "💜 BTS" },
  { value: "Night Stays", label: "🌙 Night Stays" },
  { value: "Food", label: "🍔 Food" },
  { value: "Events", label: "🎫 Events" },
  { value: "Celebrations", label: "🎂 Celebrations" },
];

export default function SemesterArchive() {
  const {
    semesters,
    activeSemIdx,
    setActiveSemIdx,
    activeSemester,
    activeFilter,
    setActiveFilter,
    filteredItems,
    prevSemester,
    nextSemester,
  } = useSemesterGallery();

  const { mediaList, uploadMemory } = useRealtimeMedia("semester", activeSemIdx + 1);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Combine bundled items with live user-uploaded items
  const allItems = [...mediaList, ...filteredItems];

  return (
    <section id="semester-archive" className="semester-archive-section page-grain">
      <div className="content-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-yellow)", justifyContent: "center" }}>
            📚 College Memory Archive (2023 – June 2026)
          </span>
          <h2 className="section-title" style={{ color: "white", marginBottom: "0.75rem" }}>
            Six Semesters of Us
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: 720, marginInline: "auto", fontSize: "1.05rem", lineHeight: 1.6 }}>
            From the first uncertain days of college to June 2026—six semesters of photographs, videos, events, food plans, sleepovers, BTS moments, jokes, celebrations, and growing up together.
          </p>
          <p className="handwritten-note" style={{ color: "var(--chaos-lavender)", fontSize: "1.3rem", marginTop: "0.5rem" }}>
            "We changed every semester. Somehow the chaos remained familiar."
          </p>
        </div>

        {/* Timeline Scrubber */}
        <TimelineScrubber activeIdx={activeSemIdx} onSelectIdx={setActiveSemIdx} />

        {/* Academic Timeline Semester Tabs */}
        <SemesterTabs
          semesters={semesters}
          activeIdx={activeSemIdx}
          onSelectTab={setActiveSemIdx}
        />

        {/* Active Semester Header & Upload Trigger */}
        <div className="semester-active-header">
          <button className="sem-nav-btn" onClick={prevSemester} aria-label="Previous semester">
            <ChevronLeft size={20} /> Prev Semester
          </button>

          <div className="sem-active-meta">
            <span className="sem-counter-badge">Semester {activeSemIdx + 1} of 6</span>
            <h3 className="sem-active-title">{activeSemester.title} ({activeSemester.dateLabel})</h3>
            <p className="sem-active-desc">{activeSemester.description}</p>
            <button
              className="primary-button btn-daisy"
              style={{ marginTop: "0.85rem", fontSize: "0.85rem", padding: "0.45rem 1rem" }}
              onClick={() => setIsUploadOpen(true)}
            >
              <PlusCircle size={16} /> Add a Semester Memory
            </button>
          </div>

          <button className="sem-nav-btn" onClick={nextSemester} aria-label="Next semester">
            Next Semester <ChevronRight size={20} />
          </button>
        </div>

        {/* Filter Chips */}
        <GalleryFilters
          options={FILTER_OPTIONS}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />

        {/* Media Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeSemester.id}-${activeFilter}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <SemesterMediaGrid
              items={allItems}
              onMediaClick={(item) => setSelectedMedia(item)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Shared Lightbox */}
      {selectedMedia && (
        <MediaLightbox
          item={selectedMedia}
          items={allItems}
          onClose={() => setSelectedMedia(null)}
          onNavigate={(nextItem) => setSelectedMedia(nextItem)}
        />
      )}

      {/* Upload Modal */}
      <MediaUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={uploadMemory}
        defaultGalleryType="semester"
        defaultSemester={activeSemIdx + 1}
      />
    </section>
  );
}
