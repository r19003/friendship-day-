import React from "react";

export default function GalleryFilters({ options = [], activeFilter, onSelectFilter }) {
  return (
    <div className="gallery-filters-bar">
      {options.map((opt) => {
        const value = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        const isActive = activeFilter.toLowerCase() === value.toLowerCase();

        return (
          <button
            key={value}
            className={`gallery-filter-chip ${isActive ? "active" : ""}`}
            onClick={() => onSelectFilter(value)}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
