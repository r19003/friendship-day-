import React from "react";
import { motion } from "framer-motion";

export default function SemesterTabs({ semesters = [], activeIdx, onSelectTab }) {
  return (
    <div className="semester-tabs-container">
      {/* Connecting purple SVG thread */}
      <svg className="semester-thread-svg" viewBox="0 0 1000 40" preserveAspectRatio="none">
        <motion.path
          d="M 0 20 Q 250 5 500 20 Q 750 35 1000 20"
          stroke="var(--chaos-violet)"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          fill="none"
        />
      </svg>

      <div className="semester-tabs-track">
        {semesters.map((sem, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={sem.id}
              className={`semester-tab-card ${isActive ? "active" : ""}`}
              onClick={() => onSelectTab(idx)}
              aria-selected={isActive}
              role="tab"
            >
              <span className="tab-sem-num">Sem 0{sem.semesterNumber}</span>
              <h3 className="tab-sem-title">{sem.title}</h3>
              <span className="tab-sem-date">{sem.dateLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
