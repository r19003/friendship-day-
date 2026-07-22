import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { icon: "💡", text: "Suggest night stay", funny: false },
  { icon: "📅", text: "Check everyone's schedule", funny: false },
  { icon: "🙏", text: "Ask for permission (results vary)", funny: false },
  { icon: "🍕", text: "Arrange snacks — very important step", funny: false },
  { icon: "🌙", text: "Promise to stay awake all night", funny: false },
  { icon: "💤", text: "Raina falls asleep at 11:30 pm", funny: true },
  { icon: "🌅", text: "Plan the next night stay immediately", funny: true },
];

export default function NightStayPlanner() {
  const [activeStep, setActiveStep] = useState(-1);
  const [stamped, setStamped] = useState(false);
  const timerRef = useRef(null);

  const startPlan = () => {
    setActiveStep(-1);
    setStamped(false);
    let step = 0;
    timerRef.current = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step >= STEPS.length) {
        clearInterval(timerRef.current);
        setTimeout(() => setStamped(true), 800);
      }
    }, 700);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <section className="nightstay-section page-grain">
      <div className="content-container">
        <div style={{ maxWidth: 680, marginInline: "auto" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-lavender)" }}>
            🌙 Night Stay Chronicles
          </span>
          <h2 style={{ color: "white", marginBottom: "0.75rem" }}>
            Manifesting Another Night Stay
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
            One night stay would end and the planning for the next one would begin almost
            immediately.
          </p>

          <div className="nightstay-pinboard">
            <AnimatePresence>
              {STEPS.map((step, i) =>
                activeStep >= i ? (
                  <motion.div
                    key={step.text}
                    className={`nightstay-step${activeStep >= i ? " nightstay-step--done" : ""}${step.funny ? " nightstay-step--funny" : ""}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="nightstay-step-icon">{step.icon}</span>
                    <span style={{ fontSize: "0.93rem", color: step.funny ? "var(--chaos-yellow)" : "rgba(255,255,255,0.85)", flex: 1 }}>
                      {step.text}
                    </span>
                    <div className="nightstay-step-check nightstay-step--done">✓</div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>

            {activeStep === -1 && (
              <div style={{ textAlign: "center", padding: "3rem 1rem", color: "rgba(255,255,255,0.4)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏠</div>
                <p style={{ fontFamily: "var(--font-handwritten)", fontSize: "1.2rem", margin: 0 }}>
                  The night stay planner is ready when you are.
                </p>
              </div>
            )}

            <div
              className={`nightstay-stamp${stamped ? " visible" : ""}`}
              aria-hidden="true"
            >
              Approved by the universe ✓
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button className="glow-button" onClick={startPlan} disabled={activeStep > -1 && activeStep < STEPS.length - 1}>
              {activeStep === -1 ? "📋 Start Planning" : activeStep < STEPS.length - 1 ? "⏳ Planning in progress..." : "🔁 Plan Another Night Stay"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
