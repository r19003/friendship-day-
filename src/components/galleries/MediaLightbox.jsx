import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getMediaSrc, getPosterSrc } from "../../lib/mediaHelpers";
import { MediaComments, MediaReactions } from "./MediaComments";
import CaptionSuggestions from "./CaptionSuggestions";

export default function MediaLightbox({ item, items = [], onClose, onNavigate }) {
  const videoRef = useRef(null);

  const currentIdx = items.findIndex((i) => i.id === item.id);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx !== -1 && currentIdx < items.length - 1;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev && onNavigate) onNavigate(items[currentIdx - 1]);
      if (e.key === "ArrowRight" && hasNext && onNavigate) onNavigate(items[currentIdx + 1]);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIdx, hasPrev, hasNext, items, onClose, onNavigate]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [item]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="media-lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="media-lightbox-content expanded-panel-layout"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="lightbox-close-btn" onClick={onClose} aria-label="Close lightbox">
            <X size={24} />
          </button>

          {hasPrev && onNavigate && (
            <button
              className="lightbox-nav-btn prev"
              onClick={() => onNavigate(items[currentIdx - 1])}
              aria-label="Previous media"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {hasNext && onNavigate && (
            <button
              className="lightbox-nav-btn next"
              onClick={() => onNavigate(items[currentIdx + 1])}
              aria-label="Next media"
            >
              <ChevronRight size={28} />
            </button>
          )}

          <div className="lightbox-split-container">
            {/* Left Media Column */}
            <div className="lightbox-media-column">
              <div className="lightbox-media-container">
                {item.type === "video" || item.media_type === "video" ? (
                  <video
                    ref={videoRef}
                    src={item.src || item.media_url}
                    poster={getPosterSrc(item)}
                    controls
                    preload="metadata"
                    className="lightbox-video-player"
                  />
                ) : (
                  <img src={getMediaSrc(item) || item.media_url} alt={item.alt || item.alt_text || item.caption} className="lightbox-image" />
                )}
              </div>

              <div className="lightbox-info-bar">
                {item.category && <span className="lightbox-category">{item.category}</span>}
                <p className="lightbox-caption">{item.caption}</p>
                {item.handwrittenNote && <p className="handwritten-note">{item.handwrittenNote}</p>}
                {item.date && <span className="lightbox-date">{item.date}</span>}
              </div>

              {/* Direct Media Reactions Bar */}
              <MediaReactions mediaId={item.id} />
            </div>

            {/* Right Side Panel: Comments & Caption Suggestions */}
            <div className="lightbox-interactive-panel">
              <CaptionSuggestions mediaId={item.id} />
              <MediaComments mediaId={item.id} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
