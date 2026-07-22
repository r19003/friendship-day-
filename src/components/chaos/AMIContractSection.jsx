import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";

const ARTICLES = [
  { id: 1, title: "Article One — Meetings", desc: "Whenever the three of us can meet, unnecessary delays, repeated rescheduling, and dramatic excitement are fully permitted." },
  { id: 2, title: "Article Two — Night Stays", desc: "Every possible night stay must be discussed, planned, manifested, and requested again when the first plan fails." },
  { id: 3, title: "Article Three — Sleep Rules", desc: "Raina may fall asleep early. Aparna and Saayra may continue talking under the assumption that she is still listening." },
  { id: 4, title: "Article Four — Food", desc: "Coffee, McDonald’s, ramen, cake, snacks, and unplanned food stops are recognised forms of friendship maintenance." },
  { id: 5, title: "Article Five — BTS", desc: "BTS links, live viewings, comeback reactions, concert dreams, songs, and urgent updates must be shared immediately." },
  { id: 6, title: "Article Six — Teasing", desc: "Friendly teasing is permitted. Genuine feelings must still be handled with care." },
  { id: 7, title: "Article Seven — Growing Up", desc: "Internships, jobs, new routines, long days, distance, and responsibilities are not valid reasons to stop being present for one another." },
  { id: 8, title: "Article Eight — Future Plans", desc: "Trips, night stays, concerts, celebrations, Smash rematches, coffee plans, and future memories remain officially pending until completed." },
  { id: 9, title: "Article Nine — Difficult Days", desc: "Any friend having a difficult day may request listening, reassurance, distraction, food, a call, or complete emotional support without needing to explain perfectly." },
  { id: 10, title: "Article Ten — Permanence", desc: "The friendship remains valid through laughter, confusion, joy, growth, imperfect communication, and all future phases." },
];

export default function AMIContractSection() {
  const [renewed, setRenewed] = useState(false);
  const [renewCount, setRenewCount] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ami_contract_renewals");
    if (saved) setRenewCount(parseInt(saved, 10) || 0);
  }, []);

  const handleRenew = () => {
    if (animating) return;
    setAnimating(true);
    setRenewed(true);
    const newCount = renewCount + 1;
    setRenewCount(newCount);
    localStorage.setItem("ami_contract_renewals", newCount.toString());
    setTimeout(() => {
      setAnimating(false);
    }, 1200);
  };

  return (
    <section className="friendship-contract-section chaos-section chaos-section--purple" id="ami-contract">
      <div className="content-container">
        <SectionHeading
          label="Three-Person Pact"
          title="The Official AMI Friendship Contract"
          subtitle="A completely serious document written by three people who have never behaved seriously together."
          center
          dividerColor="var(--shared-gold)"
        />

        <p className="handwritten-note" style={{ textAlign: "center", color: "var(--shared-gold)", fontSize: "1.4rem", marginBottom: "2rem" }}>
          "Valid through college, working life, distance, bad schedules, missed calls, and every future version of us."
        </p>

        <article className={`friendship-contract ${animating ? "is-renewing" : ""}`}>
          <div className="contract-decorative-header" aria-hidden="true">
            <span className="bead bead-blue" title="Raina" />
            <span className="bead bead-yellow" title="Aparna" />
            <span className="bead bead-purple" title="Saayra" />
            <span className="header-seal-tag">AMI Triad · 2022–Forever</span>
          </div>

          <div className="friendship-contract__statement">
            This agreement confirms that <strong>Raina</strong>, <strong>Aparna</strong>, and <strong>Saayra</strong> will continue choosing this friendship through every changing semester, schedule, job, responsibility, plan, delay, and reunion.
          </div>

          {/* 10 Articles in 2-Column Grid */}
          <div className="friendship-contract__articles" role="list">
            {ARTICLES.map((art) => (
              <div key={art.id} className="friendship-contract__article" role="listitem">
                <h3>{art.title}</h3>
                <p>{art.desc}</p>
              </div>
            ))}
          </div>

          <div className="friendship-contract__final-clause">
            "No expiration date. No cancellation option. Renewal occurs automatically every time the three of us laugh together again."
          </div>

          {/* 3 Signatures */}
          <div className="friendship-contract__signatures">
            <div className={`friendship-signature friendship-signature--raina ${animating ? "glow-raina" : ""}`}>
              <span className="sig-role">Signed</span>
              <strong>Raina</strong>
            </div>

            <div className={`friendship-signature friendship-signature--aparna ${animating ? "glow-aparna" : ""}`}>
              <span className="sig-role">Signed</span>
              <strong>Aparna</strong>
            </div>

            <div className={`friendship-signature friendship-signature--saayra ${animating ? "glow-saayra" : ""}`}>
              <span className="sig-role">Signed</span>
              <strong>Saayra</strong>
            </div>
          </div>

          {/* Connected purple thread line */}
          <div className={`signature-thread-line ${animating ? "is-drawing" : ""}`} aria-hidden="true" />

          {/* Action button */}
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button
              type="button"
              className="button button--sunshine"
              onClick={handleRenew}
              style={{ background: "linear-gradient(135deg, var(--shared-gold), #f0cf67)", color: "#3d2a00" }}
            >
              📜 Renew the AMI Contract {renewCount > 0 && `(${renewCount})`}
            </button>
          </div>

          <AnimatePresence>
            {renewed && (
              <motion.div
                className="friendship-contract-renewed-box"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
              >
                <div className="stars-row">✦ ✨ ✦ ✨ ✦ ✨ ✦</div>
                <p className="renewed-text">
                  Renewed automatically. Still growing. Still laughing. Still us. 💖
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      </div>
    </section>
  );
}
