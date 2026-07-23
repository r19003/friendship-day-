import { useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export function useRealtimeJokes(tableName, onInsert, onUpdate, onDelete) {
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !tableName) return;

    const channelName = `rt-jokes-${tableName}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: tableName },
        (payload) => onInsert && onInsert(payload.new)
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: tableName },
        (payload) => onUpdate && onUpdate(payload.new)
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: tableName },
        (payload) => onDelete && onDelete(payload.old)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, onInsert, onUpdate, onDelete]);
}
