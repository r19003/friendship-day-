import { useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export function useRealtimeJokes(tableName, onInsert, onUpdate, onDelete) {
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const channel = supabase
      .channel(`realtime-${tableName}`)
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
