import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { elderSisterTraits, literalChildTraits } from "../../data/aparnaData";

export default function SisterChildToggle() {
  const [mode, setMode] = useState("elder");

  const elderIcons = ["🌿", "📖", "🫂", "💬", "✨"];
  const childIcons = ["🍰", "🍬", "💜", "🌼", "😤"];

  return (
    <section className="sister-child-section daisy-section" id="sister-child">
      <div className="content-container">
        <SectionHeading
          label="Both at Once"
          title="My Elder Sister and My Literal Child"
          center
          dividerColor="var(--daisy-lilac)"
        />

        <div className="aparna-duality" role="group" aria-label="Choose Aparna's side">
          <button
            type="button"
            className={`aparna-side-card aparna-side-card--elder ${mode === "elder" ? "is-active" : ""}`}
            aria-pressed={mode === "elder"}
            onClick={() => setMode("elder")}
          >
            <div className="aparna-side-card-badge">🌿 Elder Sister Mode</div>
            <h3 className="aparna-side-card-title">🌿 Elder Sister Aparna</h3>
            <p className="aparna-side-card-desc">
              This is the Aparna who listens to my problems, understands people, gives mature advice, supports my decisions, and says exactly what I need to hear when I do not trust myself.
            </p>
            <div className="aparna-side-traits">
              {elderSisterTraits.map((t, i) => (
                <div key={i} className="aparna-side-trait">
                  <span className="aparna-side-trait__icon" aria-hidden="true">
                    {elderIcons[i % elderIcons.length]}
                  </span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </button>

          <button
            type="button"
            className={`aparna-side-card aparna-side-card--child ${mode === "child" ? "is-active" : ""}`}
            aria-pressed={mode === "child"}
            onClick={() => setMode("child")}
          >
            <div className="aparna-side-card-badge">🍬 Literal Child Mode</div>
            <h3 className="aparna-side-card-title">🍬 Literal Child Aparna</h3>
            <p className="aparna-side-card-desc">
              This is the Aparna who sees sweets, books, cute love stories, BTS, Taylor Swift, or anything exciting and immediately becomes the most adorable child in the room.
            </p>
            <div className="aparna-side-traits">
              {literalChildTraits.map((t, i) => (
                <div key={i} className="aparna-side-trait">
                  <span className="aparna-side-trait__icon" aria-hidden="true">
                    {childIcons[i % childIcons.length]}
                  </span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </button>
        </div>

        <motion.p
          className="sister-central-line"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          You are somehow my elder sister and my child at exactly the same time.
        </motion.p>
      </div>
    </section>
  );
}
