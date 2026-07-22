import React from "react";

export default function JokeFilters({ categories, activeCategory, onSelect, sort, onSort }) {
  return (
    <div className="joke-filters" role="group" aria-label="Filter posts">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`joke-filter-chip${activeCategory === cat ? " active" : ""}`}
          onClick={() => onSelect(cat)}
          aria-pressed={activeCategory === cat}
        >
          {cat}
        </button>
      ))}
      <select
        className="joke-sort-select"
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        aria-label="Sort posts"
      >
        <option value="newest">Newest</option>
        <option value="most-reacted">Most Reacted</option>
      </select>
    </div>
  );
}
