import React from "react";
import { AnimatePresence } from "framer-motion";
import JokeCard from "./JokeCard";

export default function JokeFeed({ jokes, loading, onReact, onDelete, sessionId, reactions, boardClass }) {
  if (loading) {
    return (
      <div className="joke-loading">
        {[1, 2, 3].map((i) => <div key={i} className="joke-loading-dot" />)}
      </div>
    );
  }

  if (!jokes || jokes.length === 0) {
    return (
      <div className="joke-empty">
        <div className="joke-empty-icon">🌱</div>
        <p className="joke-empty-text">Nothing here yet. Be the first to post!</p>
      </div>
    );
  }

  return (
    <div className="joke-feed">
      <AnimatePresence mode="popLayout">
        {jokes.map((joke) => (
          <JokeCard
            key={joke.id}
            joke={joke}
            onReact={onReact}
            onDelete={onDelete}
            canDelete={joke.id?.startsWith("local-") || joke.session_id === sessionId}
            reactions={reactions}
            boardClass={boardClass}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
