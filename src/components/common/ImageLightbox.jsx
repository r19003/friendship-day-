import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function ImageLightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Viewing: ${item.caption}`}
      >
        <motion.div
          className="lightbox-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.32 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="lightbox-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
          <div className="lightbox-main">
            {item.src ? (
              <img src={item.src} alt={item.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span>{item.emoji}</span>
            )}
          </div>
          <p className="lightbox-caption">{item.caption}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
