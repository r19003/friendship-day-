import React, { useState } from "react";
import confetti from "canvas-confetti";

export default function PlatonicHusbandContract() {
  const [isContractAccepted, setIsContractAccepted] = useState(() => {
    return localStorage.getItem("saayra-platonic-contract-accepted") === "true";
  });

  function launchContractConfetti() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const end = Date.now() + 900;
    const colors = ["#f2c45f", "#b486cf", "#fff0b5", "#795096", "#f0bfd3"];

    function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 52,
        startVelocity: 34,
        origin: { x: 0, y: 0.72 },
        colors,
        scalar: 0.85,
      });

      confetti({
        particleCount: 4,
        angle: 120,
        spread: 52,
        startVelocity: 34,
        origin: { x: 1, y: 0.72 },
        colors,
        scalar: 0.85,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }

    frame();
  }

  function handleContractAgreement() {
    if (isContractAccepted) return;
    setIsContractAccepted(true);
    localStorage.setItem("saayra-platonic-contract-accepted", "true");
    launchContractConfetti();
  }

  return (
    <section id="platonic-contract" className="sunshine-section platonic-contract-section">
      <div className="sunshine-section__inner">
        <article className={`platonic-contract ${isContractAccepted ? "is-accepted" : ""}`}>
          <div className="platonic-contract__ornament" aria-hidden="true">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>

          <p className="platonic-contract__kicker">
            Official Friendship Document
          </p>

          <h2 className="platonic-contract__title">
            Platonic Husband Contract
          </h2>

          <p className="platonic-contract__date">
            Executed on 21 August 2023 · Valid for Eternity
          </p>

          <div className="platonic-contract__divider" />

          <p className="platonic-contract__statement">
            Saayra is permanently appointed as Raina’s platonic husband, trusted listener, food companion, roasting partner, and one of the safest people in her life.
          </p>

          <section className="platonic-contract__terms">
            <h3>Terms and Responsibilities</h3>

            <ol className="platonic-contract__articles">
              <li>
                Listen to emotional rants, life updates, and thoughts that arrive without proper structure.
              </li>
              <li>
                Accept that ramen is a completely valid response to stressful situations.
              </li>
              <li>
                Provide support during BTS announcements, comebacks, live viewings, and emotional emergencies.
              </li>
              <li>
                Continue friendly roasting while knowing when genuine comfort is needed.
              </li>
              <li>
                Celebrate Raina’s happiness as though it belongs to both of them.
              </li>
              <li>
                Remain present through college, work, changing routines, distance, and every future phase.
              </li>
            </ol>
          </section>

          <div className="platonic-contract__signatures">
            <div className="contract-signature contract-signature--raina">
              <span>Appointed by</span>
              <strong>Raina</strong>
              <div className="contract-signature__line" />
            </div>

            <div className="contract-signature contract-signature--saayra">
              <span>Accepted by</span>
              <strong>Saayra</strong>
              <div className="contract-signature__line" />
            </div>
          </div>

          <div
            className={`platonic-contract__seal ${
              isContractAccepted ? "is-stamped" : ""
            }`}
            aria-hidden="true"
          >
            Valid Forever
          </div>

          <div className="platonic-contract__actions">
            <button
              type="button"
              className={`contract-agree-button ${
                isContractAccepted ? "is-accepted" : ""
              }`}
              onClick={handleContractAgreement}
              disabled={isContractAccepted}
            >
              {isContractAccepted
                ? "Contract Signed Forever"
                : "Agree & Sign the Contract"}
            </button>
          </div>

          <p className="platonic-contract__result" aria-live="polite">
            {isContractAccepted
              ? "Contract accepted. Cancellation remains permanently unavailable."
              : "Awaiting official agreement."}
          </p>
        </article>
      </div>
    </section>
  );
}
