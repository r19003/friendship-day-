import React from "react";
import { Sparkles, MessageCircle, Pin, Camera, CheckSquare, Music, Vote, Mail, Bell } from "lucide-react";
import { useActivityFeed } from "../../hooks/useActivityFeed";
import { useRealtimeToast } from "../../hooks/useRealtimeToast";
import { formatRelativeTime } from "../../lib/dateFormat";

const ICON_MAP = {
  upload_media: <Camera size={16} />,
  added_note: <Pin size={16} />,
  completed_bucket: <CheckSquare size={16} />,
  created_capsule: <Mail size={16} />,
  added_song: <Music size={16} />,
  created_poll: <Vote size={16} />,
  default: <Sparkles size={16} />,
};

export function ActivityFeed() {
  const { activities } = useActivityFeed();

  return (
    <section id="activity-feed" className="activity-feed-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-yellow)", justifyContent: "center" }}>
            🔔 Live Friendship Feed
          </span>
          <h2 className="section-title" style={{ color: "white", marginBottom: "0.5rem" }}>
            What Just Happened in AMI
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 540, marginInline: "auto" }}>
            New memories, messages, plans, reactions, and little updates from our shared universe.
          </p>
        </div>

        {activities.length === 0 ? (
          <div className="premium-empty-state" style={{ color: "white" }}>
            <div className="premium-empty-state__icon">
              <Bell size={44} style={{ color: "var(--chaos-yellow)" }} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
              Nothing New Yet
            </h3>
            <p style={{ opacity: 0.8, fontSize: "0.95rem", maxWidth: 440, marginInline: "auto" }}>
              New memories, plans, reactions, and messages will appear here as they happen.
            </p>
          </div>
        ) : (
          <div className="activity-feed-timeline">
            <div className="activity-thread-line" />
            {activities.map((act) => {
              const icon = ICON_MAP[act.activity_type] || ICON_MAP.default;

              return (
                <div key={act.id} className="activity-item">
                  <div className="activity-icon-badge">{icon}</div>
                  <div className="activity-content">
                    <p className="activity-summary">{act.summary}</p>
                    <span className="activity-time">{formatRelativeTime(act.created_at)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export function RealtimeToastContainer() {
  const { toasts, removeToast } = useRealtimeToast();

  if (toasts.length === 0) return null;

  return (
    <div className="realtime-toast-stack">
      {toasts.map((toast) => (
        <div key={toast.id} className="realtime-toast">
          <span style={{ fontSize: "1.3rem" }}>{toast.icon || "🔔"}</span>
          <div>
            <h4 style={{ fontSize: "0.9rem", fontWeight: 800 }}>{toast.title}</h4>
            <p style={{ fontSize: "0.82rem", opacity: 0.85 }}>{toast.message}</p>
          </div>
          <button className="toast-close-btn" onClick={() => removeToast(toast.id)}>
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
