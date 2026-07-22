import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { collegeFormCopy, collegeTogetherCopy, scrapbookItems } from "../../data/aparnaData";
import ImageLightbox from "../common/ImageLightbox";
import { fadeUp, viewportOnce } from "../../lib/motionVariants";

export default function CollegeFormStory() {
  const [revealed, setRevealed] = useState(false);
  const [desaturated, setDesaturated] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);

  const handleWhatIfClick = () => {
    if (!revealed) {
      setDesaturated(true);
      setTimeout(() => {
        setRevealed(true);
        setTimeout(() => setDesaturated(false), 500);
      }, 300);
    } else {
      setRevealed(false);
    }
  };

  const memoryNodes = [
    {
      icon: "☕",
      title: "First Day",
      desc: "A new chapter felt less unfamiliar because you were already part of it.",
      note: "Day 1 anchor"
    },
    {
      icon: "📚",
      title: "Library Hours",
      desc: "Study plans that somehow included several unrelated conversations.",
      note: "Endless talks"
    },
    {
      icon: "🍩",
      title: "Coffee Runs",
      desc: "The coffee was small. The conversations were never short.",
      note: "Daily highlights"
    },
    {
      icon: "🚌",
      title: "Bus Stop",
      desc: "One more place that quietly became part of our friendship.",
      note: "Way back home"
    }
  ];

  return (
    <section
      id="college-form"
      className={`b-option-section daisy-section page-grain ${desaturated ? "timeline-desaturated" : ""}`}
      style={{ transition: "filter 0.5s ease" }}
    >
      <div className="content-container">
        <div className="b-option-layout">
          {/* Left: Application Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7 }}
          >
            <div className="college-application-card">
              <div className="form-paperclip" aria-hidden="true" />
              <div className="form-note-card" aria-hidden="true">B option 📋</div>

              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", marginBottom: "1rem", color: "#39303d" }}>
                College Application Form
              </h3>

              <dl className="college-form-fields">
                <div>
                  <dt>Application type</dt>
                  <dd>B-option backup form</dd>
                </div>
                <div>
                  <dt>Suggested by</dt>
                  <dd>Raina</dd>
                </div>
                <div>
                  <dt>Applicant</dt>
                  <dd>Aparna</dd>
                </div>
                <div>
                  <dt>Outcome</dt>
                  <dd className="form-outcome-val">Selected & admitted together ✓</dd>
                </div>
              </dl>

              <div className="form-stamp">DAISY APPROVED 🌼</div>

              <button className="form-what-if-btn" onClick={handleWhatIfClick} aria-expanded={revealed}>
                {revealed ? "🌼 Return to Best Timeline" : "What if she had not filled it?"}
              </button>

              <AnimatePresence>
                {revealed && (
                  <motion.div
                    className="form-reveal-box"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    role="status"
                  >
                    <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.25rem" }}>🌀</span>
                    We are not exploring that alternate universe. This timeline is clearly better. 🌼
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Emotional Copy */}
          <div>
            <SectionHeading
              label="The B Option"
              title="The B Option That Became One of the Best Decisions"
              dividerColor="var(--daisy-yellow)"
            />
            {collegeFormCopy.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ delay: i * 0.12 }}
                style={{ fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1rem", color: "#47404b" }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>

        {/* The Friend Who Came With Me Into College - 4 Memory Nodes */}
        <div style={{ marginTop: "5rem" }}>
          <SectionHeading
            label="College Life"
            title="The Friend Who Came With Me Into College"
            dividerColor="var(--daisy-blue-deep)"
          />
          {collegeTogetherCopy.map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: i * 0.1 }}
              style={{ maxWidth: 780, marginInline: "auto", textAlign: "center", marginBottom: "1.5rem" }}
            >
              {para}
            </motion.p>
          ))}

          <div className="college-memory-path">
            {memoryNodes.map((node, i) => (
              <motion.div
                key={i}
                className="college-memory-node"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.12 }}
              >
                <div className="college-memory-node__icon" aria-hidden="true">{node.icon}</div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", marginBottom: "0.4rem", color: "var(--daisy-text)" }}>
                  {node.title}
                </h4>
                <p style={{ fontSize: "0.92rem", color: "var(--daisy-muted)", lineHeight: 1.5, marginBottom: "0.8rem" }}>
                  {node.desc}
                </p>
                <span className="college-memory-note-tag">{node.note}</span>
              </motion.div>
            ))}
          </div>

          <div className="scrapbook-grid" role="list" style={{ marginTop: "3.5rem" }}>
            {scrapbookItems.map((item, i) => (
              <motion.div
                key={i}
                className="polaroid"
                role="listitem"
                tabIndex={0}
                onClick={() => setLightboxItem(item)}
                onKeyDown={(e) => e.key === "Enter" && setLightboxItem(item)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.1 }}
                aria-label={`Open: ${item.caption}`}
              >
                <div className="polaroid-img" aria-hidden="true">{item.emoji}</div>
                <p className="polaroid-caption">{item.caption}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {lightboxItem && <ImageLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
    </section>
  );
}
