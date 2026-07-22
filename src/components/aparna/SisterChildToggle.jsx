import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { elderSisterTraits, literalChildTraits } from "../../data/aparnaData";

export default function SisterChildToggle() {
  const [mode, setMode] = useState("elder");
  return (
    <section className="sister-child-section">
      <div className="content-container">
        <SectionHeading label="Both at Once" title="My Elder Sister and My Literal Child" center dividerColor="var(--daisy-lilac)" />
        <div className="sister-toggle-btns" role="group" aria-label="Toggle Aparna mode">
          <button className={`sister-toggle-btn${mode==="elder"?" active-elder":""}`} onClick={() => setMode("elder")} aria-pressed={mode==="elder"}>🌿 Elder Sister Mode</button>
          <button className={`sister-toggle-btn${mode==="child"?" active-child":""}`} onClick={() => setMode("child")} aria-pressed={mode==="child"}>🍬 Literal Child Mode</button>
        </div>
        <div className="sister-cards-container">
          <motion.div className={`sister-card sister-card-elder${mode==="elder"?" active":""}`} animate={{ opacity:mode==="elder"?1:0.38, scale:mode==="elder"?1:0.97 }} transition={{ duration:0.4 }}>
            <h3 className="sister-card-title">🌿 Elder Sister Aparna</h3>
            <p className="sister-card-desc">This is the Aparna who listens to my problems, understands people, gives mature advice, supports my decisions, and says exactly what I need to hear when I do not trust myself.</p>
            <ul className="sister-traits" role="list">{elderSisterTraits.map((t,i)=><li key={i} className="sister-trait"><span className="sister-trait-dot" aria-hidden="true"/>{t}</li>)}</ul>
          </motion.div>
          <motion.div className={`sister-card sister-card-child${mode==="child"?" active":""}`} animate={{ opacity:mode==="child"?1:0.38, scale:mode==="child"?1:0.97 }} transition={{ duration:0.4 }}>
            <h3 className="sister-card-title">🍬 Literal Child Aparna</h3>
            <p className="sister-card-desc">This is the Aparna who sees sweets, books, cute love stories, BTS, Taylor Swift, or anything exciting and immediately becomes the most adorable child in the room.</p>
            <ul className="sister-traits" role="list">{literalChildTraits.map((t,i)=><li key={i} className="sister-trait"><span className="sister-trait-dot" aria-hidden="true"/>{t}</li>)}</ul>
          </motion.div>
        </div>
        <motion.p className="sister-central-line" initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}>You are somehow my elder sister and my child at exactly the same time.</motion.p>
      </div>
    </section>
  );
}
