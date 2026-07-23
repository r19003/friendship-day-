import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Bell, BellOff, MessageSquare, Send, X, Smartphone, ShieldCheck, ChevronDown } from "lucide-react";
import { useRealtimeChat } from "../hooks/useRealtimeChat";
import { useRealtime } from "../components/realtime/RealtimeProvider";
import ChatMessage from "../components/chat/ChatMessage";
import ChatComposer from "../components/chat/ChatComposer";
import { TypingIndicator, ChatDateDivider } from "../components/chat/TypingIndicator";
import OnlinePresence from "../components/realtime/OnlinePresence";
import ConnectionStatus from "../components/realtime/ConnectionStatus";
import { formatDateDivider } from "../lib/dateFormat";
import {
  getNotificationPermissionState,
  requestChatNotificationPermission,
  sendBrowserNotification,
} from "../lib/chatNotifications";
import "../styles/chat.css";

export default function AMIChatPage() {
  const {
    messages,
    sendMessage,
    deleteMessage,
    replyingTo,
    setReplyingTo,
    sendTyping,
    userRole,
  } = useRealtimeChat();

  const { connectionState, onlineUsers, typingUsers } = useRealtime();
  const feedRef = useRef(null);
  const [notifState, setNotifState] = useState(getNotificationPermissionState);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  // Mark chat as viewed on mount
  useEffect(() => {
    localStorage.setItem("ami_last_chat_viewed", String(Date.now()));
  }, [messages.length]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    if (feedRef.current) {
      feedRef.current.scrollTo({
        top: feedRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  // Handle feed scroll state
  const handleScroll = () => {
    if (!feedRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = feedRef.current;
    setShowScrollBottom(scrollHeight - scrollTop - clientHeight > 120);
  };

  // Browser Notification Request
  const handleEnableNotifications = async () => {
    const perm = await requestChatNotificationPermission();
    setNotifState(perm);
    if (perm === "granted") {
      sendBrowserNotification("AMI Live Notifications Enabled", {
        body: "You will receive notifications when new messages arrive from friends.",
      });
    }
  };

  return (
    <div className="ami-chat-page">
      <div className="ami-chat-shell">
        {/* Top Navigation Bar */}
        <header className="ami-chat-header">
          <div className="ami-chat-header-left">
            <Link to="/our-chaos" className="ami-chat-back-btn" aria-label="Back to Our Chaos">
              <ArrowLeft size={18} />
              <span>Back to Our Chaos</span>
            </Link>

            <div className="ami-chat-title-group">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h1 className="ami-chat-title">AMI Live</h1>
                <span className="ami-chat-trio-badge">💜 Raina · Aparna · Saayra</span>
              </div>
              <p className="ami-chat-subtitle">Private group chat universe</p>
            </div>
          </div>

          <div className="ami-chat-header-right">
            <OnlinePresence />
            <ConnectionStatus />

            {/* Browser Notifications Control */}
            {notifState === "granted" ? (
              <button
                type="button"
                className="chat-notif-btn notif-enabled"
                title="Notifications active"
                onClick={handleEnableNotifications}
              >
                <Bell size={15} />
                <span className="notif-btn-label">Active</span>
              </button>
            ) : notifState === "denied" ? (
              <button
                type="button"
                className="chat-notif-btn notif-denied"
                title="Browser notifications blocked in browser settings"
                disabled
              >
                <BellOff size={15} />
                <span className="notif-btn-label">Blocked</span>
              </button>
            ) : (
              <button
                type="button"
                className="chat-notif-btn"
                title="Enable browser notifications"
                onClick={handleEnableNotifications}
              >
                <Bell size={15} />
                <span className="notif-btn-label">Enable Notifications</span>
              </button>
            )}

            <button
              type="button"
              className="chat-notif-btn"
              title="SMS Notification Settings"
              onClick={() => setShowSmsModal(true)}
            >
              <Smartphone size={15} />
            </button>
          </div>
        </header>

        {/* Message Feed */}
        <div className="ami-chat-feed" ref={feedRef} onScroll={handleScroll}>
          {messages.length === 0 ? (
            <div className="chat-empty-state">
              <MessageSquare size={44} style={{ color: "var(--chaos-yellow)", marginBottom: "0.75rem" }} />
              <h3>AMI is unusually quiet</h3>
              <p>Send the first message and start the next unnecessary discussion.</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const prevMsg = messages[index - 1];
              const showDateDivider =
                !prevMsg ||
                formatDateDivider(prevMsg.created_at) !== formatDateDivider(msg.created_at);

              return (
                <React.Fragment key={msg.id}>
                  {showDateDivider && (
                    <ChatDateDivider label={formatDateDivider(msg.created_at)} />
                  )}
                  <ChatMessage
                    message={msg}
                    currentUserRole={userRole}
                    onDelete={deleteMessage}
                    onReply={(m) => setReplyingTo(m)}
                  />
                </React.Fragment>
              );
            })
          )}
          <TypingIndicator typingUsers={typingUsers} />
        </div>

        {/* Scroll to bottom floating button */}
        {showScrollBottom && (
          <button
            type="button"
            className="scroll-bottom-btn"
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
          >
            <ChevronDown size={18} />
          </button>
        )}

        {/* Composer */}
        <div className="ami-chat-composer-wrapper">
          <ChatComposer
            onSend={sendMessage}
            onTyping={sendTyping}
            replyingTo={replyingTo}
            onCancelReply={() => setReplyingTo(null)}
            currentUserRole={userRole}
          />
        </div>
      </div>

      {/* Optional SMS Modal */}
      <AnimatePresence>
        {showSmsModal && (
          <div className="upload-modal-backdrop" onClick={() => setShowSmsModal(false)}>
            <motion.div
              className="upload-modal-container"
              style={{ maxWidth: 480 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="upload-modal-header">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Smartphone size={20} style={{ color: "var(--chaos-gold)" }} />
                  <h3 style={{ fontSize: "1.3rem", color: "white" }}>SMS & Push Settings</h3>
                </div>
                <button className="lightbox-close-btn" onClick={() => setShowSmsModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ padding: "1.5rem", color: "rgba(255,255,255,0.85)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                <p style={{ marginBottom: "1rem" }}>
                  <strong>Browser Notifications:</strong> Active when enabled. Messages arrive with sound and toast alerts.
                </p>
                <div style={{ background: "rgba(255,255,255,0.06)", padding: "1rem", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, color: "var(--chaos-gold)", marginBottom: "0.4rem" }}>
                    <ShieldCheck size={16} /> Server-Side SMS Gateway
                  </div>
                  <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                    Phone SMS notifications require a serverless Edge Function (Twilio provider). API secrets are safely protected on the server side and not exposed in the browser.
                  </p>
                </div>
                <button
                  type="button"
                  className="primary-button btn-chaos"
                  style={{ width: "100%" }}
                  onClick={() => setShowSmsModal(false)}
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
