import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";

export function useRealtimeToast() {
  const { supabase, isConfigured, userRole } = useRealtime();
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    setToasts((prev) => [
      { id: "toast_" + Math.random().toString(36).substring(2, 9), ...toast },
      ...prev.slice(0, 2),
    ]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    if (!isConfigured || !supabase) return;

    // Unique channel instance for toasts listener
    const channelName = `rt-toasts-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        (payload) => {
          if (payload.new.author_name !== userRole) {
            addToast({
              title: `New message from ${payload.new.author_name}`,
              message: payload.new.content,
              icon: "💬",
            });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "message_wall" },
        (payload) => {
          if (payload.new.author_name !== userRole) {
            addToast({
              title: `New wall note from ${payload.new.author_name}`,
              message: payload.new.content,
              icon: "📌",
            });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "media_items" },
        (payload) => {
          if (payload.new.author_name !== userRole) {
            addToast({
              title: `New photo memory from ${payload.new.author_name}`,
              message: payload.new.caption || "View in gallery",
              icon: "📷",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isConfigured, supabase, userRole]);

  return { toasts, removeToast };
}
