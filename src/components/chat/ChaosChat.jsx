import React, { useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { useRealtimeChat } from "../../hooks/useRealtimeChat";
import ChatMessage from "./ChatMessage";
import ChatComposer from "./ChatComposer";
import { TypingIndicator, ChatDateDivider } from "./TypingIndicator";
import OnlinePresence from "../realtime/OnlinePresence";
import ConnectionStatus from "../realtime/ConnectionStatus";
import { formatDateDivider } from "../../lib/dateFormat";

export default function ChaosChat() {
  const {
    messages,
    sendMessage,
    deleteMessage,
    replyingTo,
    setReplyingTo,
    sendTyping,
    userRole,
  } = useRealtimeChat();

  const { typingUsers } = useRealtimeChat();
  const feedRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <section id="chaos-chat" className="chaos-chat-section page-grain">
      <div className="content-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-lavender)", justifyContent: "center" }}>
            💬 Live Group Chat
          </span>
          <h2 className="section-title" style={{ color: "white", marginBottom: "0.5rem" }}>
            AMI Live
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 540, marginInline: "auto" }}>
            For the next meeting plan, the next BTS emergency, the next food debate, and every completely unnecessary update in between.
          </p>
        </div>

        {/* Chat Window */}
        <div className="chaos-chat">
          {/* Header Bar */}
          <div className="chaos-chat__header">
            <div className="chat-title-info">
              <span className="chat-room-badge">💜 AMI Chat Room</span>
              <OnlinePresence />
            </div>
            <ConnectionStatus />
          </div>

          {/* Message Feed */}
          <div className="chaos-chat__feed" ref={feedRef}>
            {messages.length === 0 ? (
              <div className="chat-empty-state" style={{ textAlign: "center", padding: "3rem 1rem", opacity: 0.8 }}>
                <MessageSquare size={40} style={{ color: "var(--chaos-yellow)", marginBottom: "0.75rem" }} />
                <h3 style={{ fontSize: "1.2rem", fontFamily: "var(--font-display)" }}>AMI is unusually quiet</h3>
                <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Send the first message and begin the next unnecessary discussion.</p>
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

          {/* Composer */}
          <ChatComposer
            onSend={sendMessage}
            onTyping={sendTyping}
            replyingTo={replyingTo}
            onCancelReply={() => setReplyingTo(null)}
            currentUserRole={userRole}
          />
        </div>
      </div>
    </section>
  );
}
