import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";

export function useReadReceipts(messageId, messageAuthor) {
  const { supabase, isConfigured, userRole, sessionId } = useRealtime();
  const [readers, setReaders] = useState([]);

  useEffect(() => {
    if (!messageId || !isConfigured || !supabase) return;

    // Fetch existing readers
    supabase
      .from("chat_message_reads")
      .select("reader_name")
      .eq("message_id", messageId)
      .then(({ data, error }) => {
        if (!error && data) {
          setReaders(data.map((r) => r.reader_name));
        }
      });

    // Realtime channel
    const channel = supabase
      .channel(`realtime:reads:${messageId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_message_reads", filter: `message_id=eq.${messageId}` },
        (payload) => {
          setReaders((prev) => [...new Set([...prev, payload.new.reader_name])]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messageId, isConfigured, supabase]);

  const markAsRead = async () => {
    if (!messageId || messageAuthor === userRole || !isConfigured || !supabase) return;

    try {
      await supabase.from("chat_message_reads").upsert([{
        message_id: messageId,
        user_id: sessionId,
        reader_name: userRole,
      }], { onConflict: "message_id,user_id" });
    } catch {
      // Fallback
    }
  };

  return { readers, markAsRead };
}
