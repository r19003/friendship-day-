import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, ExternalLink, ArrowRight, ShieldCheck, WifiOff } from "lucide-react";
import { useRealtimeChat } from "../../hooks/useRealtimeChat";
import { useRealtime } from "../realtime/RealtimeProvider";

export default function AMIChatPreview() {
  const { messages } = useRealtimeChat();
  const { connectionState, onlineUsers, userRole } = useRealtime();
  const [popupBlocked, setPopupBlocked] = useState(false);

  const lastMessage = messages && messages.length > 0 ? messages[messages.length - 1] : null;

  // Unread messages count (messages authored by someone else since last local read timestamp)
  const lastViewedTs = localStorage.getItem("ami_last_chat_viewed") || "0";
  const unreadCount = (messages || []).filter(
    (m) => m.author_name !== userRole && new Date(m.created_at).getTime() > Number(lastViewedTs)
  ).length;

  const handleOpenSeparateWindow = () => {
    setPopupBlocked(false);
    const win = window.open(
      "/our-chaos/chat",
      "ami-live-chat",
      "width=520,height=780,resizable=yes,scrollbars=yes,status=yes"
    );
    if (!win || win.closed || typeof win.closed === "undefined") {
      setPopupBlocked(true);
    }
  };

  return (
    <section id="chaos-chat-preview" className="ami-chat-preview page-grain">
      <div className="content-container">
        <div className="ami-chat-preview-card">
          <div className="ami-chat-preview-header">
            <span className="section-kicker" style={{ color: "var(--chaos-lavender)" }}>
              💬 Our Private Trio Corner
            </span>
            <h2 className="section-title" style={{ color: "white", marginBottom: "0.5rem" }}>
              AMI Live
            </h2>
            <p className="ami-chat-preview-sub">
              For meeting plans, BTS emergencies, food debates and every unnecessary update in between.
            </p>
          </div>

          <div className="ami-chat-preview-status-bar">
            <div className="chat-status-badge">
              {connectionState === "connected" ? (
                <>
                  <span className="live-dot" />
                  <span>Realtime Connected</span>
                </>
              ) : (
                <>
                  <WifiOff size={14} />
                  <span>Local Mode</span>
                </>
              )}
            </div>

            <div className="chat-status-badge">
              <span>👥 {onlineUsers.length || 1} Friend{onlineUsers.length > 1 ? "s" : ""} Online</span>
            </div>

            {unreadCount > 0 && (
              <div className="chat-status-badge unread-badge">
                <span>💬 {unreadCount} New Unread</span>
              </div>
            )}
          </div>

          {lastMessage ? (
            <div className="ami-chat-preview-last-msg">
              <div className="preview-msg-author">
                <span>{lastMessage.author_name}</span>
                <time className="preview-msg-time">
                  {new Date(lastMessage.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </time>
              </div>
              <p className="preview-msg-text">{lastMessage.content}</p>
            </div>
          ) : (
            <div className="ami-chat-preview-empty">
              <MessageSquare size={32} style={{ opacity: 0.6, marginBottom: "0.5rem" }} />
              <p>No chat messages yet today. Open AMI Live to send the first message!</p>
            </div>
          )}

          {popupBlocked && (
            <div className="popup-blocked-warning" role="alert">
              ⚠️ Your browser blocked the separate window. Open AMI Live in this tab instead.
            </div>
          )}

          <div className="ami-chat-preview-actions">
            <Link to="/our-chaos/chat" className="primary-button btn-chaos">
              💬 Open AMI Live <ArrowRight size={16} />
            </Link>

            <button type="button" className="ghost-button" style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }} onClick={handleOpenSeparateWindow}>
              <ExternalLink size={16} /> Open in Separate Window
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
