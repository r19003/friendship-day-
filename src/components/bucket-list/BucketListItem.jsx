import React from "react";
import { Trash2, CheckCircle2, Circle } from "lucide-react";
import { formatRelativeTime } from "../../lib/dateFormat";

export default function BucketListItem({ item, currentUserRole, onToggle, onDelete }) {
  const isOwner = item.author_name === currentUserRole;

  return (
    <div className={`bucket-list-card ${item.is_completed ? "completed" : ""}`}>
      <button
        className="bucket-checkbox-btn"
        onClick={() => onToggle(item.id)}
        aria-label={item.is_completed ? "Mark incomplete" : "Mark completed"}
      >
        {item.is_completed ? (
          <CheckCircle2 className="check-icon done" size={22} />
        ) : (
          <Circle className="check-icon to-do" size={22} />
        )}
      </button>

      <div className="bucket-card-body">
        <h4 className={`bucket-title ${item.is_completed ? "strikethrough" : ""}`}>
          {item.title}
        </h4>
        {item.note && <p className="bucket-note">{item.note}</p>}

        <div className="bucket-card-meta">
          {item.category && <span className="bucket-category-badge">{item.category}</span>}
          <span className="bucket-author">Proposed by {item.author_name}</span>

          {item.is_completed && item.completed_by_name && (
            <span className="bucket-completion-info">
              ✓ Completed by {item.completed_by_name} ({formatRelativeTime(item.completed_at)})
            </span>
          )}
        </div>
      </div>

      {isOwner && (
        <button className="bucket-delete-btn" onClick={() => onDelete(item.id)} title="Delete item">
          <Trash2 size={15} />
        </button>
      )}
    </div>
  );
}
