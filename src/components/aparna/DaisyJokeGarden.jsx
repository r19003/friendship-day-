import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import JokeForm from "../jokes/JokeForm";
import JokeFeed from "../jokes/JokeFeed";
import JokeFilters from "../jokes/JokeFilters";
import LiveModeBadge from "../jokes/LiveModeBadge";
import { useJokes } from "../../hooks/useJokes";
import { jokeGardenSeeds, jokeCategories, jokeDisplayNames, jokeReactions } from "../../data/aparnaData";

export default function DaisyJokeGarden() {
  const { jokes, loading, isLive, addJoke, reactToJoke, deleteJoke, sessionId } = useJokes("jokes", jokeGardenSeeds);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const displayJokes = jokes
    .filter(j => activeCategory==="All" || j.category===activeCategory)
    .sort((a,b) => sort==="most-reacted" ? Object.values(b.reactions||{}).reduce((s,v)=>s+v,0) - Object.values(a.reactions||{}).reduce((s,v)=>s+v,0) : new Date(b.created_at)-new Date(a.created_at));

  return (
    <section id="joke-garden" className="joke-section">
      <div className="content-container">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:"1rem"}}>
          <SectionHeading label="Live Board" title="The Daisy Joke Garden 🌼" subtitle="A live corner for our jokes, silly thoughts, cute anger, random updates, BTS moments, and things only we understand." dividerColor="var(--daisy-yellow)" />
          <LiveModeBadge isLive={isLive} />
        </div>
        <div className="joke-board daisy-board">
          <JokeForm onSubmit={addJoke} displayNames={jokeDisplayNames} categories={jokeCategories} boardClass="daisy" submitClass="daisy-submit" placeholder="Write something silly, sweet, or chaotic..." warning="Only friendly messages. No private information." />
          <JokeFilters categories={jokeCategories} activeCategory={activeCategory} onSelect={setActiveCategory} sort={sort} onSort={setSort} />
          <JokeFeed jokes={displayJokes} loading={loading} onReact={reactToJoke} onDelete={deleteJoke} sessionId={sessionId} reactions={jokeReactions} boardClass="daisy-board" />
        </div>
      </div>
    </section>
  );
}
