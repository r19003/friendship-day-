import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { collegeFormCopy, collegeFormFields, collegeTogetherCopy, scrapbookItems } from "../../data/aparnaData";
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
        setTimeout(() => setDesaturated(false), 700);
      }, 400);
    } else {
      setRevealed(false);
    }
  };

  return (
    <section
      id="college-form"
      className={`college-form-section page-grain ${desaturated ? "timeline-desaturated" : ""}`}
      style={{ transition: "filter 0.5s ease" }}
    >
      <div className="content-container">
        <div className="college-form-inner">
          <motion.div
            initial={{ opacity: 0, rotate: 3, y: 20 }}
            whileInView={{ opacity: 1, rotate: 0, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7 }}
          >
            <div className="college-form-card">
              <div className="form-paperclip" aria-hidden="true" />
              <div className="form-note-card" aria-hidden="true">B option 📋</div>
              
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "1.5rem" }}>
                College Application Form
              </h3>

              {collegeFormFields.map((f, i) => (
                <div key={i} className="form-field-row">
                  <span className="form-field-label">{f.label}</span>
                  <span className={`form-field-value${f.special ? " special" : ""}`}>
                    {f.value} {f.label === "Form Status" && "✓"}
                  </span>
                </div>
              ))}

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
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>

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
            >
              {para}
            </motion.p>
          ))}
          <div className="scrapbook-grid" role="list">
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
