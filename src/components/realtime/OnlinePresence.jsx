import React from "react";
import { useRealtime } from "./RealtimeProvider";

export default function OnlinePresence() {
  const { onlineUsers, connectionState, userRole } = useRealtime();

  if (connectionState === "local_mode") {
    return (
      <div className="online-presence local">
        <span>📜 Local mode — updates saved in this browser</span>
      </div>
    );
  }

  if (connectionState === "reconnecting") {
    return (
      <div className="online-presence reconnecting">
        <span>📡 Presence unavailable</span>
      </div>
    );
  }

  const otherUsers = onlineUsers.filter((u) => u !== userRole);

  return (
    <div className="online-presence">
      <span className="online-icon">🟢</span>
      <span className="online-text">
        {otherUsers.length > 0
          ? `${onlineUsers.join(", ")} online`
          : "Only you are here right now."}
      </span>
    </div>
  );
}
