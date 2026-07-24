import React, { useState } from "react";
import { motion } from "framer-motion";
import { saayraStory, nb107CopyText } from "../../data/saayraData";

export default function NB107Story() {
  const [cardsGlowing, setCardsGlowing] = useState(false);

  const meetingContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const meetingMoment = {
    hidden: {
      opacity: 0,
      y: 22,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.58,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="saayra-meeting-story" className="sunshine-section meeting-story-section">
      <div className="content-container">
        <div className="meeting-story-layout">
          {/* Left Copy Column */}
          <div className="meeting-story-copy">
            <span className="section-kicker">The Day We Met</span>

            <h2>
              One Question, One Shared Interest, and Conversations That Never Stopped
            </h2>

            <div className="meeting-story-meta">
              <span>📅 {saayraStory.metDate}</span>
              <span>📍 {saayraStory.metLocation}</span>
            </div>

            <p>{nb107CopyText}</p>
          </div>

          {/* Right 4-Moment Visual Story Timeline Column */}
          <motion.div
            className="meeting-story-timeline is-visible"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            variants={meetingContainer}
          >
            {/* Moment 1 */}
            <motion.div className="meeting-moment" variants={meetingMoment}>
              <div className="meeting-moment__number">1</div>
              <div className="meeting-moment__body">
                <h3>“I Saw Her and Thought She Looked Cool”</h3>
                <p>Some people catch your attention before you even know why.</p>
                <div className="moment-visual corridor-visual">
                  <span className="position-marker marker-raina" title="Raina">💜</span>
                  <div className="corridor-line" />
                  <span className="position-marker marker-saayra" title="Saayra">☀️</span>
                  <span className="purple-sparkle">✨</span>
                </div>
              </div>
            </motion.div>

            {/* Moment 2 */}
            <motion.div className="meeting-moment" variants={meetingMoment}>
              <div className="meeting-moment__number">2</div>
              <div className="meeting-moment__body">
                <h3>“So I Asked About the Class”</h3>
                <p>It was a simple question, but it gave the conversation somewhere to begin.</p>
                <div className="moment-visual question-visual">
                  <div className="class-note-card">
                    <span>📝 Class Notes</span>
                  </div>
                  <div className="speech-bubble-mini">"Hey, is this the class?"</div>
                </div>
              </div>
            </motion.div>

            {/* Moment 3 */}
            <motion.div
              className={`meeting-moment moment-cards-interactive ${cardsGlowing ? "active-glow" : ""}`}
              variants={meetingMoment}
            >
              <div className="meeting-moment__number">3</div>
              <div className="meeting-moment__body">
                <h3>“My Twitter. Her Wallpaper.”</h3>
                <p>While we were standing together, one small shared interest gave us an entire conversation.</p>

                <div
                  className={`moment-visual cards-visual ${cardsGlowing ? "cards-glowing" : ""}`}
                  onClick={() => setCardsGlowing(!cardsGlowing)}
                  onKeyDown={(e) => e.key === "Enter" && setCardsGlowing(!cardsGlowing)}
                  role="button"
                  tabIndex={0}
                  aria-label="Click to connect Twitter and Wallpaper"
                >
                  <div className="card-item card-twitter">
                    <span className="card-label">My Twitter</span>
                    <div className="card-icon">📱 𝕏</div>
                    <span className="card-symbol">💜 BTS Post</span>
                  </div>
                  <div className="connection-golden-line" />
                  <div className="card-item card-wallpaper">
                    <span className="card-label">Her Wallpaper</span>
                    <div className="card-icon">🖼️ 💜</div>
                    <span className="card-symbol">☀️ ARMY Wallpaper</span>
                  </div>
                </div>

                {cardsGlowing ? (
                  <div className="cards-reveal-text">
                    ✨ And that was the beginning of conversations that never really stopped.
                  </div>
                ) : (
                  <div className="cards-hint-text">
                    💡 Click cards to connect shared interest
                  </div>
                )}
              </div>
            </motion.div>

            {/* Moment 4 */}
            <motion.div className="meeting-moment" variants={meetingMoment}>
              <div className="meeting-moment__number">4</div>
              <div className="meeting-moment__body">
                <h3>“And Then the Talking Never Stopped”</h3>
                <p>One conversation became another, then another—and somehow, there was always more to say.</p>
                <div className="moment-visual chat-visual">
                  <div className="chat-bubble-mini bubble-left">"Did you see this?!"</div>
                  <div className="chat-bubble-mini bubble-right">"YES!! Exactly what I thought!"</div>
                  <div className="continuing-purple-thread" />
                  <span className="small-sunrise-glow" title="Forever Sunshine">🌅</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
