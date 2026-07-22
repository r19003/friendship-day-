import React from "react";
import MediaCard from "./MediaCard";
import VideoMemoryCard from "./VideoMemoryCard";
import GalleryEmptyState from "./GalleryEmptyState";

export default function SemesterMediaGrid({ items = [], onMediaClick }) {
  if (items.length === 0) {
    return <GalleryEmptyState />;
  }

  return (
    <div className="semester-media-grid">
      {items.map((item) => {
        if (item.type === "video") {
          return <VideoMemoryCard key={item.id} item={item} onClick={onMediaClick} />;
        }
        return <MediaCard key={item.id} item={item} onClick={onMediaClick} frameStyle={item.frame || "classic"} />;
      })}
    </div>
  );
}
