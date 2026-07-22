import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { amiChatData } from "../../data/sharedData";

export default function AMIGroupChat() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = amiChatData.tabs[activeTab];

  return (
    <section className="ami-section page-grain">
      <div className="content-container">
        <div style={{ maxWidth: 720, marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="section-kicker" style={{ color: "var(--chaos-lavender)", justifyContent: "center" }}>
              💬 The Group Chat
            </span>
            <h2 style={{ color: "white", marginBottom: "0.5rem" }}>AMI Plans Everything</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 520, marginInline: "auto" }}>
              Meetups, trips, night stays, BTS emergencies, food debates — the chaos is the group chat.
            </p>
          </div>

          <div className="ami-chat-window">
            {/* Header */}
            <div className="ami-chat-header">
              <div className="ami-chat-avatar">💬</div>
              <div>
                <div className="ami-chat-name">AMI</div>
                <div className="ami-chat-status">
                  <span className="ami-status-dot" />
                  Raina, Aparna, Saayra — always active
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="ami-tabs" role="tablist" aria-label="Chat categories">
              {amiChatData.tabs.map((t, i) => (
                <button
                  key={t.id}
                  className={`ami-tab${activeTab === i ? " active" : ""}`}
                  onClick={() => setActiveTab(i)}
                  role="tab"
                  aria-selected={activeTab === i}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="ami-messages" role="tabpanel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
                >
                  {tab.messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      className={`ami-message${msg.sent ? " sent" : ""}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.35 }}
                    >
                      <div className="ami-sender">{msg.sender}</div>
                      <div className="ami-bubble">{msg.text}</div>
                      <div className="ami-time">just now</div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="ami-footer">
              <input
                className="ami-input"
                placeholder="Type a message…"
                readOnly
                aria-label="Message input (read only)"
              />
              <button className="ami-send-btn" aria-label="Send message">Send</button>
            </div>
          </div>

          <p style={{ textAlign: "center", marginTop: "1rem", color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>
            Pinned: "We need to plan this weekend." — still unresolved.
          </p>
        </div>
      </div>
    </section>
  );
}
