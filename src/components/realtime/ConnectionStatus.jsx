import React from "react";
import { useRealtime } from "./RealtimeProvider";

export default function ConnectionStatus() {
  const { connectionState, userRole, changeRole } = useRealtime();

  return (
    <div className="connection-status-badge">
      <div className={`status-dot ${connectionState}`} />
      <span className="status-label">
        {connectionState === "connected" && "Live Realtime"}
        {connectionState === "reconnecting" && "Reconnecting…"}
        {connectionState === "local_mode" && "Local Mode"}
      </span>

      {/* Role Selector */}
      <div className="role-selector">
        <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>As:</span>
        <select
          value={userRole}
          onChange={(e) => changeRole(e.target.value)}
          aria-label="Select your identity"
          className="role-select"
        >
          <option value="Raina">⭐ Raina</option>
          <option value="Aparna">🌼 Aparna</option>
          <option value="Saayra">☀️ Saayra</option>
        </select>
      </div>
    </div>
  );
}
