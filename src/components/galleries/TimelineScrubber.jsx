import React from "react";
import { motion } from "framer-motion";

const SCRUBBER_STEPS = [
  { semesterIdx: 0, label: "2023", sub: "Semester 1" },
  { semesterIdx: 1, label: "Early 2024", sub: "Semester 2" },
  { semesterIdx: 2, label: "Late 2024", sub: "Semester 3" },
  { semesterIdx: 3, label: "Early 2025", sub: "Semester 4" },
  { semesterIdx: 4, label: "Late 2025", sub: "Semester 5" },
  { semesterIdx: 5, label: "June 2026", sub: "Semester 6" },
];

export default function TimelineScrubber({ activeIdx, onSelectIdx }) {
  return (
    <div className="timeline-scrubber-wrapper">
      <div className="scrubber-track">
        <motion.div
          className="scrubber-progress-fill"
          style={{ width: `${(activeIdx / (SCRUBBER_STEPS.length - 1)) * 100}%` }}
        />
        {SCRUBBER_STEPS.map((step, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={step.semesterIdx}
              className={`scrubber-node ${isActive ? "active" : ""}`}
              onClick={() => onSelectIdx(idx)}
              title={`${step.sub} (${step.label})`}
            >
              <span className="node-dot" />
              <span className="node-label">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
