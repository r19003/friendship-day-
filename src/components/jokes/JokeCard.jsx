import React from "react";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import ReactionButton from "./ReactionButton";
import { formatRelativeTime } from "../../lib/dateFormat";

export default function JokeCard({ joke, onReact, onDelete, canDelete, reactions, boardClass = "daisy-board" }) {
  return (
    <motion.div
      className="joke-card"
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="joke-card-meta">
        <span className="joke-card-author">{joke.display_name}</span>
        <span className="joke-card-category">{joke.category}</span>
      </div>
      <p className="joke-card-content">{joke.content}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div className="joke-reactions">
          {reactions.map((emoji) => (
            <ReactionButton
              key={emoji}
              emoji={emoji}
              count={joke.reactions?.[emoji] || 0}
              onReact={(e) => onReact(joke.id, e)}
              reacted={false}
            />
          ))}
        </div>
        {canDelete && (
          <button
            className="joke-delete-btn"
            onClick={() => onDelete(joke.id)}
            aria-label="Delete this post"
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>
      <span className="joke-card-time">{formatRelativeTime(joke.created_at)}</span>
    </motion.div>
  );
}
