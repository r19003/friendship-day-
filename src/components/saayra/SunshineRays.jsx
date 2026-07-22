import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { sunshineRays, sunshineFinalLine } from "../../data/saayraData";

export default function SunshineRays() {
  const [activeRayId, setActiveRayId] = useState(sunshineRays[0]?.id || null);

  const activeRay = sunshineRays.find((r) => r.id === activeRayId) || sunshineRays[0];

  return (
    <section className="rays-section sunshine-section">
      <div className="content-container">
        <SectionHeading
          label="Why You Are Sunshine"
          title="You Lift My Mood in Two Minutes"
          center
          dividerColor="var(--sunshine-gold)"
        />

        <div className="sunshine-rays-wrapper">
          {/* Central Sun */}
          <div className="central-sun-hub">
            <div className="central-sun-core">☀️</div>
            <div className="central-sun-title">5 Rays of Saayra</div>
          </div>

          {/* 5 Rays Grid / Dial */}
          <div className="sunshine-rays-grid" role="tablist" aria-label="5 Rays of Sunshine">
            {sunshineRays.map((ray) => {
              const isActive = activeRayId === ray.id;
              return (
                <button
                  key={ray.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`sunshine-ray ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveRayId(ray.id)}
                >
                  <span className="sunshine-ray-emoji" aria-hidden="true">{ray.emoji}</span>
                  <span className="sunshine-ray-title">{ray.title}</span>
                </button>
              );
            })}
          </div>

          {/* Connected Description Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRay.id}
              className="sunshine-ray-card"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
            >
              <div className="ray-card-header">
                <span className="ray-card-emoji">{activeRay.emoji}</span>
                <h3 className="ray-card-title">{activeRay.title}</h3>
              </div>
              <p className="ray-card-quote">"{activeRay.desc}"</p>
              <p className="ray-card-body">{activeRay.full}</p>
            </motion.div>
          </AnimatePresence>

          <p className="ray-final-line">{sunshineFinalLine}</p>
        </div>
      </div>
    </section>
  );
}
