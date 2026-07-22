import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";
import { CHANNELS } from "../lib/realtimeChannels";
import { validateMessageLength } from "../lib/messageValidation";

const INITIAL_LOCAL_MESSAGES = [];

export function useRealtimeChat() {
  const { supabase, isConfigured, userRole, sendTyping, sessionId } = useRealtime();
  const [messages, setMessages] = useState(() => {
    const local = localStorage.getItem("ami_local_chat");
    return local ? JSON.parse(local) : INITIAL_LOCAL_MESSAGES;
  });
  const [replyingTo, setReplyingTo] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("ami_local_chat", JSON.stringify(messages.slice(-50)));
  }, [messages]);

  // Fetch initial messages from Supabase & subscribe
  useEffect(() => {
    if (!isConfigured || !supabase) return;

    supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(50)
      .then(({ data, error }) => {
        if (!error && data) {
          setMessages(data);
        }
      });

    // Realtime channel
    const channel = supabase
      .channel(CHANNELS.CHAT)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        (payload) => {
          setMessages((prev) => {
            if (prev.some((m) => m.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "chat_messages" },
        (payload) => {
          setMessages((prev) => prev.filter((m) => m.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isConfigured, supabase]);

  const sendMessage = async (content) => {
    if (!validateMessageLength(content)) return false;

    const newMsg = {
      id: "msg_" + Math.random().toString(36).substring(2, 9),
      user_id: sessionId,
      author_name: userRole,
      content: content.trim(),
      reply_to_id: replyingTo ? replyingTo.id : null,
      reply_author: replyingTo ? replyingTo.author_name : null,
      reply_content: replyingTo ? replyingTo.content : null,
      created_at: new Date().toISOString(),
    };

    setReplyingTo(null);

    // Optimistic UI
    setMessages((prev) => [...prev, newMsg]);

    if (isConfigured && supabase) {
      try {
        await supabase.from("chat_messages").insert([{
          room_id: "ami",
          user_id: sessionId,
          author_name: userRole,
          content: content.trim(),
          reply_to_id: replyingTo ? replyingTo.id : null,
        }]);
      } catch (err) {
        console.warn("Chat insert failed, operating in local mode:", err);
      }
    }

    return true;
  };

  const deleteMessage = async (msgId) => {
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
    if (isConfigured && supabase) {
      try {
        await supabase.from("chat_messages").delete().eq("id", msgId);
      } catch {
        // Fallback
      }
    }
  };

  return {
    messages,
    sendMessage,
    deleteMessage,
    replyingTo,
    setReplyingTo,
    sendTyping,
    userRole,
  };
}
