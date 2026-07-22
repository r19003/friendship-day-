import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const cardAnim = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } };

export default function UniversePortal() {
  return (
    <section className="portal-section">
      <div className="content-container">
        <div className="portal-section-heading">
          <h2>Two Universes. One Chaos.</h2>
          <p>Choose where to go first, or dive straight into the shared madness.</p>
        </div>

        <motion.div
          className="portal-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Daisy Card */}
          <motion.div variants={cardAnim}>
            <Link to="/aparna" className="portal-card portal-card-daisy" aria-label="Visit Aparna's Daisy universe">
              <div className="portal-daisy-glow" aria-hidden="true" />
              <span className="portal-card-emoji">🌼</span>
              <span className="portal-card-label">Aparna's corner</span>
              <h3 className="portal-card-title">Daisy</h3>
              <p className="portal-card-desc">
                My happiness pill, my elder sister, my Allen friend, and the familiar face who made college feel like home.
              </p>
              <span className="portal-card-btn portal-card-btn-daisy">
                Open Daisy Universe <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>

          {/* Sunshine Card */}
          <motion.div variants={cardAnim}>
            <Link to="/saayra" className="portal-card portal-card-sunshine" aria-label="Visit Saayra's Sunshine universe">
              <div className="portal-sun-glow" aria-hidden="true" />
              <span className="portal-card-emoji">☀️</span>
              <span className="portal-card-label">Saayra's corner</span>
              <h3 className="portal-card-title">Sunshine</h3>
              <p className="portal-card-desc">
                My poet, my favourite weirdo, my platonic husband, and the person who baked me a cake that made me almost cry.
              </p>
              <span className="portal-card-btn portal-card-btn-sunshine">
                Open Sunshine Universe <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>

          {/* Chaos Card */}
          <motion.div variants={cardAnim}>
            <Link to="/our-chaos" className="portal-card portal-card-chaos" aria-label="Enter the shared chaos">
              <div className="chaos-dot" />
              <div className="chaos-dot" />
              <div className="chaos-dot" />
              <div className="chaos-dot" />
              <div className="chaos-dot" />
              <div className="chaos-dot" />
              <div className="chaos-dot" />
              <span className="portal-card-emoji">💜</span>
              <span className="portal-card-label">All three of us</span>
              <h3 className="portal-card-title">Our Chaos</h3>
              <p className="portal-card-desc">
                BTS, memories, inside jokes, bucket lists, friendship awards, and everything that belongs to all three of us — Raina, Aparna, and Saayra.
              </p>
              <span className="portal-card-btn portal-card-btn-chaos">
                Enter the Chaos <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
