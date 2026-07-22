import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motionVariants";

const STAGES = [
  { id: "sem1", tab: "Semester 1", icon: "☕", title: "New Beginnings", desc: "Finding classrooms, getting used to college, navigating schedules. Having a familiar face made day one vastly better." },
  { id: "sem2", tab: "Semester 2", icon: "📚", title: "Routines & Rants", desc: "Exams, assignments, coffee breaks, and endless rants. The bus area meetups became a regular highlight." },
  { id: "sem3", tab: "Semester 3", icon: "💜", title: "BTS & Night Stays", desc: "Late-night conversations, BTS live viewings, planning trip ideas in AMI, and taking hilarious photos." },
  { id: "sem4", tab: "Semester 4+", icon: "🍬", title: "Working Life Prep", desc: "College ending, career decisions arriving, but the friendship staying just as warm, sweet, and constant." },
];

export default function CollegeConstantSection() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const activeStage = STAGES[activeTabIdx];

  return (
    <section className="college-constant-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-kicker" style={{ color: "var(--daisy-blue-deep)", justifyContent: "center" }}>
            🗓️ Through Every Semester
          </span>
          <h2 className="section-title" style={{ color: "var(--daisy-text)", marginBottom: "0.5rem" }}>
            My College Constant
          </h2>
          <p style={{ color: "var(--daisy-muted)", maxWidth: 600, marginInline: "auto" }}>
            Classes changed. Schedules changed. Semesters moved forward. But through so many versions of college life, you remained one of the people I could return to.
          </p>
        </div>

        {/* Notebook & Calendar Flip Container */}
        <motion.div
          className="constant-binder-wrapper"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Top Tabs */}
          <div className="constant-binder-tabs">
            {STAGES.map((stage, idx) => (
              <button
                key={stage.id}
                className={`binder-tab-btn ${activeTabIdx === idx ? "active" : ""}`}
                onClick={() => setActiveTabIdx(idx)}
              >
                <span>{stage.icon}</span> {stage.tab}
              </button>
            ))}
          </div>

          {/* Binder Body */}
          <div className="constant-binder-body">
            {/* Fixed Anchor — Daisy */}
            <div className="fixed-anchor-daisy" title="Aparna — The Fixed Constant">
              🌼 <span className="anchor-label">My Constant</span>
            </div>

            {/* Flipping Stage Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                className="binder-stage-content"
                initial={{ opacity: 0, rotateY: -15, y: 10 }}
                animate={{ opacity: 1, rotateY: 0, y: 0 }}
                exit={{ opacity: 0, rotateY: 15, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <span className="stage-icon-large">{activeStage.icon}</span>
                <h3 className="stage-title">{activeStage.title}</h3>
                <p className="stage-desc">{activeStage.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom handwritten quote */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p className="handwritten-note" style={{ color: "var(--daisy-blue-deep)", fontSize: "1.7rem" }}>
              "Not every constant is a place. Sometimes it is a person."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
