import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const daisyCardAnim = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const sunshineCardAnim = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] } },
};

const chaosCardAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] } },
};

export default function UniversePortal() {
  return (
    <section className="portal-section">
      <div className="content-container">
        <div className="portal-section-heading">
          <h2>Two Universes. One Chaos.</h2>
          <p>Choose where to go first, or dive straight into the shared memory world.</p>
        </div>

        <div className="portal-grid">
          {/* Daisy Card */}
          <motion.div
            variants={daisyCardAnim}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link to="/aparna" className="home-portal-card home-portal-card--daisy" aria-label="Visit Aparna's Daisy universe">
              <div>
                <span className="portal-card-emoji">🌼</span>
                <span className="portal-card-label">Aparna's corner</span>
                <h3 className="portal-card-title">Daisy</h3>
                <p className="portal-card-desc">
                  My happiness pill, my elder sister, my Allen friend, and the familiar face who made college feel like home.
                </p>
              </div>
              <div>
                <span className="portal-card-btn portal-card-btn-daisy">
                  Open Daisy Universe <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Sunshine Card */}
          <motion.div
            variants={sunshineCardAnim}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link to="/saayra" className="home-portal-card home-portal-card--sunshine" aria-label="Visit Saayra's Sunshine universe">
              <div>
                <span className="portal-card-emoji">☀️</span>
                <span className="portal-card-label">Saayra's corner</span>
                <h3 className="portal-card-title">Sunshine</h3>
                <p className="portal-card-desc">
                  My poet, my favourite weirdo, my platonic husband, and the person who baked me a cake that made me almost cry.
                </p>
              </div>
              <div>
                <span className="portal-card-btn portal-card-btn-sunshine">
                  Open Sunshine Universe <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Chaos Card */}
          <motion.div
            variants={chaosCardAnim}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            style={{ gridColumn: "1 / -1" }}
          >
            <Link to="/our-chaos" className="home-portal-card home-portal-card--chaos" aria-label="Enter the shared chaos">
              <div>
                <span className="portal-card-emoji">💜</span>
                <span className="portal-card-label">All three of us</span>
                <h3 className="portal-card-title">Our Chaos</h3>
                <p className="portal-card-desc">
                  BTS, memories, inside jokes, bucket lists, friendship awards, and everything that belongs to all three of us — Raina, Aparna, and Saayra.
                </p>
              </div>
              <div>
                <span className="portal-card-btn portal-card-btn-chaos">
                  Enter the Chaos <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
