import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured, getOrCreateSessionId } from "../../lib/supabase";
import { ROOM_ID, CHANNELS } from "../../lib/realtimeChannels";

const RealtimeContext = createContext(null);

export function RealtimeProvider({ children }) {
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("ami_user_role") || "Raina";
  });
  
  const [connectionState, setConnectionState] = useState(() => {
    return isSupabaseConfigured ? "connected" : "local_mode";
  });
  
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [sessionId] = useState(getOrCreateSessionId);

  // Sync user role to localStorage
  const changeRole = (role) => {
    setUserRole(role);
    localStorage.setItem("ami_user_role", role);
  };

  // Realtime Presence Channel Setup
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setConnectionState("local_mode");
      return;
    }

    let presenceChannel;

    try {
      presenceChannel = supabase.channel(CHANNELS.PRESENCE, {
        config: { presence: { key: sessionId } },
      });

      presenceChannel
        .on("presence", { event: "sync" }, () => {
          const state = presenceChannel.presenceState();
          const users = [];
          Object.values(state).forEach((presences) => {
            presences.forEach((p) => {
              if (p.userRole && !users.includes(p.userRole)) {
                users.push(p.userRole);
              }
            });
          });
          setOnlineUsers(users);
        })
        .on("broadcast", { event: "typing" }, ({ payload }) => {
          if (payload && payload.userRole && payload.userRole !== userRole) {
            setTypingUsers((prev) => ({
              ...prev,
              [payload.userRole]: Date.now(),
            }));
          }
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            setConnectionState("connected");
            await presenceChannel.track({
              userRole,
              onlineAt: new Date().toISOString(),
            });
          } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
            setConnectionState("reconnecting");
          } else if (status === "CLOSED") {
            setConnectionState("local_mode");
          }
        });
    } catch {
      setConnectionState("local_mode");
    }

    return () => {
      if (presenceChannel) {
        supabase.removeChannel(presenceChannel);
      }
    };
  }, [userRole, sessionId]);

  // Clean up inactive typing users after 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTypingUsers((prev) => {
        const next = { ...prev };
        let changed = false;
        Object.entries(next).forEach(([role, timestamp]) => {
          if (now - timestamp > 3000) {
            delete next[role];
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Broadcast typing event
  const sendTyping = () => {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const channel = supabase.channel(CHANNELS.PRESENCE);
      channel.send({
        type: "broadcast",
        event: "typing",
        payload: { userRole },
      });
    } catch {
      // Ignore broadcast error
    }
  };

  return (
    <RealtimeContext.Provider
      value={{
        isConfigured: isSupabaseConfigured,
        supabase,
        roomId: ROOM_ID,
        sessionId,
        userRole,
        changeRole,
        connectionState,
        setConnectionState,
        onlineUsers,
        typingUsers: Object.keys(typingUsers),
        sendTyping,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error("useRealtime must be used within a RealtimeProvider");
  }
  return context;
}
