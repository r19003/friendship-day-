import { useMemo } from "react";
import { normalizeMemoryItem } from "../../lib/mediaHelpers";

function getDailyIndex(length) {
  if (!Number.isInteger(length) || length <= 0) {
    return 0;
  }

  const today = new Date();
  const dateKey = Number(
    `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`
  );

  return dateKey % length;
}

export default function TodayMemory({ memories = [], isLoading = false, onAddMemory }) {
  const validMemories = useMemo(() => {
    if (!Array.isArray(memories)) {
      return [];
    }

    return memories.map(normalizeMemoryItem).filter(Boolean);
  }, [memories]);

  if (isLoading) {
    return (
      <section className="today-memory today-memory--loading">
        <div className="today-memory__skeleton" />
        <p>Looking through our memories…</p>
      </section>
    );
  }

  if (validMemories.length === 0) {
    return (
      <section className="today-memory today-memory--empty">
        <div className="today-memory__empty-icon" aria-hidden="true">
          📷
        </div>

        <p className="section-kicker">Today’s Memory</p>
        <h2>No memory has been added yet</h2>
        <p>
          Add a real photograph or video to the semester archive, Daisy,
          Sunshine, or Our Chaos gallery. One of those memories will appear
          here each day.
        </p>

        {typeof onAddMemory === "function" && (
          <button type="button" className="button button--chaos" onClick={onAddMemory}>
            Add Our First Memory
          </button>
        )}
      </section>
    );
  }

  const selectedIndex = getDailyIndex(validMemories.length);
  const selectedMemory = validMemories[selectedIndex];
  const isVideo = selectedMemory.type === "video";

  return (
    <section className="today-memory">
      <div className="today-memory__media">
        {isVideo ? (
          <video controls preload="metadata" poster={selectedMemory.poster || undefined}>
            <source src={selectedMemory.src} type={selectedMemory.mime_type || "video/mp4"} />
            Your browser does not support this video.
          </video>
        ) : (
          <img
            src={selectedMemory.src}
            alt={selectedMemory.alt_text || selectedMemory.alt || "A friendship memory"}
            loading="lazy"
          />
        )}
      </div>

      <div className="today-memory__content">
        <p className="section-kicker">Today’s Memory</p>
        <h2>{selectedMemory.caption?.trim() || "A memory from our archive"}</h2>

        {selectedMemory.handwritten_note && <p className="handwritten-note">{selectedMemory.handwritten_note}</p>}
        {selectedMemory.date_label && <time>{selectedMemory.date_label}</time>}
      </div>
    </section>
  );
}
