import React, { useState } from "react";
import { CheckSquare } from "lucide-react";
import { useSharedBucketList } from "../../hooks/useSharedBucketList";
import BucketListItem from "./BucketListItem";
import GalleryFilters from "../galleries/GalleryFilters";

const BUCKET_CATEGORIES = [
  "All",
  "BTS",
  "Night Stay",
  "Food",
  "Travel",
  "College",
  "Books",
  "Celebration",
  "Reunion",
  "Working Life",
  "Random Chaos",
];

export default function SharedBucketList() {
  const {
    items,
    completedCount,
    totalCount,
    toggleItemCompletion,
    addItem,
    deleteItem,
    activeCategory,
    setActiveCategory,
    userRole,
  } = useSharedBucketList();

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Random Chaos");
  const [newNote, setNewNote] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addItem({ title: newTitle, category: newCategory, note: newNote });
    setNewTitle("");
    setNewNote("");
    setShowAddForm(false);
  };

  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section id="bucket-list" className="shared-bucket-section page-grain">
      <div className="content-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-yellow)", justifyContent: "center" }}>
            📋 Shared Trio Bucket List
          </span>
          <h2 className="section-title" style={{ color: "white", marginBottom: "0.5rem" }}>
            The Things We Still Have to Do Together
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: 620, marginInline: "auto", fontSize: "1.05rem" }}>
            Plans we have discussed, postponed, redesigned, manifested, and still fully intend to complete.
          </p>
          <p className="handwritten-note" style={{ color: "var(--chaos-lavender)", fontSize: "1.3rem", marginTop: "0.5rem" }}>
            "Our future memories are currently under construction."
          </p>
        </div>

        {/* Progress Bar & Counter */}
        {totalCount > 0 && (
          <div className="bucket-progress-card">
            <div className="progress-header">
              <span className="progress-label">Future memories completed: {completedCount} of {totalCount}</span>
              <span className="progress-percent">{progressPercent}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        )}

        {/* Add Item Form / Trigger */}
        <div style={{ textAlign: "center", marginBlock: "1.5rem" }}>
          {!showAddForm ? (
            <button className="primary-button btn-chaos" onClick={() => setShowAddForm(true)}>
              ➕ Propose a New Bucket-List Idea
            </button>
          ) : (
            <form className="bucket-add-form" onSubmit={handleFormSubmit}>
              <h4 style={{ color: "white", marginBottom: "1rem" }}>Propose a Future Memory Idea</h4>

              <input
                type="text"
                className="bucket-input"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="What should we do together next?"
                required
              />

              <div style={{ display: "flex", gap: "0.75rem", marginBlock: "0.75rem" }}>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bucket-select"
                >
                  {BUCKET_CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  className="bucket-input"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Optional detail or note…"
                />
              </div>

              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setShowAddForm(false)} className="cancel-reply-btn" style={{ color: "white" }}>
                  Cancel
                </button>
                <button type="submit" className="primary-button btn-daisy">
                  Add Item
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Category Filters */}
        <div style={{ marginBottom: "2rem" }}>
          <GalleryFilters
            options={BUCKET_CATEGORIES}
            activeFilter={activeCategory}
            onSelectFilter={setActiveCategory}
          />
        </div>

        {/* Items List */}
        {items.length === 0 ? (
          <div className="premium-empty-state" style={{ color: "white" }}>
            <div className="premium-empty-state__icon">
              <CheckSquare size={44} style={{ color: "var(--chaos-yellow)" }} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
              The Future Is Waiting for a Plan
            </h3>
            <p style={{ opacity: 0.8, fontSize: "0.95rem", maxWidth: 440, marginInline: "auto" }}>
              Propose the first future memory idea for the trio using the button above.
            </p>
          </div>
        ) : (
          <div className="bucket-items-list">
            {items.map((item) => (
              <BucketListItem
                key={item.id}
                item={item}
                currentUserRole={userRole}
                onToggle={toggleItemCompletion}
                onDelete={deleteItem}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
