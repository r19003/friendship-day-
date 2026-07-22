import React, { useState, useMemo } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { semesterArchive } from "../../data/semesterGalleryData";

export default function TodayMemory() {
  const allMemories = useMemo(() => {
    const list = [];
    semesterArchive.forEach((sem) => {
      sem.items.forEach((item) => {
        list.push({ ...item, semesterTitle: sem.title });
      });
    });
    return list;
  }, []);

  // Deterministic memory selection based on day of year
  const getDailyIndex = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % allMemories.length;
  };

  const [currentIndex, setCurrentIndex] = useState(getDailyIndex);

  const currentMemory = allMemories[currentIndex] || allMemories[0];

  const handleShowAnother = () => {
    setCurrentIndex((prev) => (prev + 1) % allMemories.length);
  };

  return (
    <section id="today-memory" className="today-memory-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-yellow)", justifyContent: "center" }}>
            ✨ Daily Memory Highlight
          </span>
          <h2 className="section-title" style={{ color: "white", marginBottom: "0.5rem" }}>
            Today's Memory
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 540, marginInline: "auto" }}>
            A single moment chosen from our archive for today.
          </p>
        </div>

        <div className="today-memory-card">
          <div className="today-memory-media">
            {currentMemory.type === "video" ? (
              <video src={currentMemory.src} poster={currentMemory.poster} controls className="today-media-element" />
            ) : (
              <img src={currentMemory.src} alt={currentMemory.caption} className="today-media-element" />
            )}
            <span className="today-badge">📅 Today's Pick · {currentMemory.semesterTitle}</span>
          </div>

          <div className="today-memory-body">
            <h3 className="today-caption">{currentMemory.caption}</h3>
            {currentMemory.handwrittenNote && (
              <p className="handwritten-note" style={{ color: "var(--chaos-yellow)", fontSize: "1.3rem", marginBlock: "0.5rem" }}>
                "{currentMemory.handwrittenNote}"
              </p>
            )}
            <div className="today-meta">
              <span>Category: {currentMemory.category}</span>
              {currentMemory.date && <span>Date: {currentMemory.date}</span>}
            </div>

            <button className="primary-button btn-chaos" onClick={handleShowAnother} style={{ marginTop: "1.25rem", width: "100%" }}>
              <RefreshCw size={16} /> Show Another Memory
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
