import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { matureSaayraTraits, matureSaayraDesc, childSaayraTraits, childSaayraDesc } from "../../data/saayraData";

export default function MatureChildCards() {
  const [activePage, setActivePage] = useState("mature"); // 'mature' | 'child'

  return (
    <section className="mature-child-section sunshine-section sunshine-section--journal">
      <div className="content-container">
        <SectionHeading
          label="Both at Once"
          title="Mature Mind, Tiny Child Heart"
          center
          dividerColor="var(--sunshine-gold)"
        />

        <div className="open-journal-container">
          <div className="open-journal-spine" aria-hidden="true" />

          {/* Left Page: Mature Mind */}
          <div
            className={`journal-page journal-page--mature ${activePage === "mature" ? "is-active" : ""}`}
            onClick={() => setActivePage("mature")}
            role="button"
            tabIndex={0}
            aria-label="Mature Mind page"
          >
            {activePage === "mature" && <div className="journal-bookmark">🔖 Active Page</div>}
            <div className="page-header">
              <span className="page-icon">🌙</span>
              <h3>Mature Mind</h3>
            </div>
            <p className="page-summary">{matureSaayraDesc}</p>
            <ul className="journal-traits" role="list">
              {matureSaayraTraits.map((t, i) => (
                <li key={i} className="journal-trait-item">
                  <span className="trait-bullet">✦</span> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Page: Tiny Child Heart */}
          <div
            className={`journal-page journal-page--child ${activePage === "child" ? "is-active" : ""}`}
            onClick={() => setActivePage("child")}
            role="button"
            tabIndex={0}
            aria-label="Tiny Child Heart page"
          >
            {activePage === "child" && <div className="journal-bookmark">🔖 Active Page</div>}
            <div className="page-header">
              <span className="page-icon">🌟</span>
              <h3>Tiny Child Heart</h3>
            </div>
            <p className="page-summary">{childSaayraDesc}</p>
            <ul className="journal-traits" role="list">
              {childSaayraTraits.map((t, i) => (
                <li key={i} className="journal-trait-item">
                  <span className="trait-bullet">✦</span> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Note beneath journal */}
        <div className="journal-footer-note">
          <p>
            {activePage === "mature"
              ? "🌙 Selected: The Saayra who gives grounded advice, listens carefully, and holds space for deep conversations."
              : "🌟 Selected: The Saayra who gets excited over ramen, books, baking, and cute stories like a happy child."}
          </p>
        </div>
      </div>
    </section>
  );
}
