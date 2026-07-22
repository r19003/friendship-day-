import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import JokeForm from "../jokes/JokeForm";
import JokeFeed from "../jokes/JokeFeed";
import JokeFilters from "../jokes/JokeFilters";
import LiveModeBadge from "../jokes/LiveModeBadge";
import { useJokes } from "../../hooks/useJokes";
import { roastRoomSeeds, roastCategories, roastDisplayNames, roastReactions } from "../../data/saayraData";

export default function SunshineRoastRoom() {
  const { jokes, loading, isLive, addJoke, reactToJoke, deleteJoke, sessionId } = useJokes("roasts", roastRoomSeeds);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const displayJokes = jokes
    .filter(j => activeCategory === "All" || j.category === activeCategory)
    .sort((a, b) => {
      if (sort === "most-reacted") {
        return Object.values(b.reactions || {}).reduce((s, v) => s + v, 0) - Object.values(a.reactions || {}).reduce((s, v) => s + v, 0);
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });

  return (
    <section id="roast-room" className="joke-section">
      <div className="content-container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
          <SectionHeading label="Live Board" title="The Sunshine Roast Room 🔥" subtitle="A live corner for friendly roasting, random thoughts, food emergencies, BTS drama, poetic chaos, and things only we understand." dividerColor="var(--sunshine-purple)" />
          <LiveModeBadge isLive={isLive} />
        </div>
        <div className="joke-board sunshine-board">
          <JokeForm onSubmit={addJoke} displayNames={roastDisplayNames} categories={roastCategories} boardClass="sunshine" submitClass="sunshine-submit" placeholder="Drop a roast, a poem, a food emergency, or chaotic wisdom..." warning="Only friendly roasts. No private information or hurtful content." />
          <JokeFilters categories={roastCategories} activeCategory={activeCategory} onSelect={setActiveCategory} sort={sort} onSort={setSort} />
          <JokeFeed jokes={displayJokes} loading={loading} onReact={reactToJoke} onDelete={deleteJoke} sessionId={sessionId} reactions={roastReactions} boardClass="sunshine-board" />
        </div>
      </div>
    </section>
  );
}
