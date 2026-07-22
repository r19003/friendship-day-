import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHAT_SEQUENCE = [
  { from: "Aparna", text: "guys is anyone still up", delay: 600 },
  { from: "Saayra", text: "yeah im awake. this movie is getting good", delay: 1400 },
  { from: "Raina", text: "...", delay: 2200, isTyping: true },
  { from: "Aparna", text: "raina you awake?", delay: 3200 },
  { from: "Saayra", text: "she definitely is. she was just talking", delay: 4000 },
  { from: "Aparna", text: "okay but what do you think about the ending though", delay: 4800 },
  { from: "Saayra", text: "right?? it made no sense", delay: 5600 },
  { from: "REVEAL", text: "", delay: 7000 },
];

const SENDER_COLORS = {
  Aparna: "#c9e8f4",
  Saayra: "#cdb5e8",
  Raina: "#75509e",
};

export default function ChatAnimation() {
  const [messages, setMessages] = useState([]);
  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const timerRefs = useRef([]);

  const clearAll = () => timerRefs.current.forEach(clearTimeout);

  const replay = () => {
    clearAll();
    setMessages([]);
    setRevealed(false);
    setRunning(true);
    CHAT_SEQUENCE.forEach((msg, i) => {
      const t = setTimeout(() => {
        if (msg.from === "REVEAL") {
          setRevealed(true);
          setRunning(false);
        } else {
          setMessages((prev) => [...prev, { ...msg, id: i }]);
        }
      }, msg.delay);
      timerRefs.current.push(t);
    });
  };

  return (
    <section className="chat-section page-grain">
      <div className="content-container">
        <div style={{ maxWidth: 700, marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className="section-kicker" style={{ color: "var(--chaos-lavender)", justifyContent: "center" }}>
              💬 Late Night Reality Check
            </span>
            <h2 style={{ color: "white", marginBottom: "0.5rem" }}>
              Raina Is Definitely Awake
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 480, marginInline: "auto" }}>
              Aparna and Saayra continued talking while Raina had already fallen asleep. The recap the next morning was always necessary.
            </p>
          </div>

          <div className="chat-phone">
            <div className="chat-phone-bar">
              <span style={{ fontSize: "1.2rem" }}>💬</span>
              <div>
                <div className="ami-chat-name">AMI</div>
                <div className="ami-chat-status">
                  <span className="ami-status-dot" />
                  3 members
                </div>
              </div>
            </div>

            <div className="chat-messages" style={{ minHeight: 380 }}>
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`chat-msg${msg.from === "Raina" ? " right" : ""}`}
                    initial={{ opacity: 0, y: 16, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {msg.isTyping ? (
                      <>
                        <div className="chat-msg-name">{msg.from}</div>
                        <div className="ami-typing">
                          <div className="ami-typing-dot" />
                          <div className="ami-typing-dot" />
                          <div className="ami-typing-dot" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="chat-msg-name" style={{ color: SENDER_COLORS[msg.from] }}>
                          {msg.from}
                        </div>
                        <div className="chat-msg-bubble">{msg.text}</div>
                      </>
                    )}
                  </motion.div>
                ))}

                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: "center", marginTop: "0.5rem" }}
                  >
                    <div className="chat-sleep-icon">😴</div>
                    <div className="chat-reveal-text">
                      Raina had been asleep since 11:30 pm.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!running && messages.length === 0 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-handwritten)", fontSize: "1.1rem" }}>
                  Press play to experience this
                </div>
              )}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            {!running && (
              <button className="chat-replay-btn" onClick={replay}>
                ▶ {messages.length === 0 ? "Play" : "Replay"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
