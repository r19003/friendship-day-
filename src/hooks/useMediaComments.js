import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";
import { validateMessageLength } from "../lib/messageValidation";

export function useMediaComments(mediaId) {
  const { supabase, isConfigured, userRole, sessionId } = useRealtime();
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    if (!mediaId) return;

    const storageKey = `ami_comments_${mediaId}`;

    if (!isConfigured || !supabase) {
      const local = localStorage.getItem(storageKey);
      setComments(local ? JSON.parse(local) : []);
      return;
    }

    supabase
      .from("media_comments")
      .select("*")
      .eq("media_id", mediaId)
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          setComments(data);
          localStorage.setItem(storageKey, JSON.stringify(data));
        }
      });

    const channel = supabase
      .channel(`realtime:comments:${mediaId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "media_comments", filter: `media_id=eq.${mediaId}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setComments((prev) => [...prev.filter((c) => c.id !== payload.new.id), payload.new]);
          } else if (payload.eventType === "DELETE") {
            setComments((prev) => prev.filter((c) => c.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [mediaId, isConfigured, supabase]);

  const addComment = async (content, replyToId = null) => {
    if (!validateMessageLength(content, 1, 500)) return false;

    const newComment = {
      id: "comment_" + Math.random().toString(36).substring(2, 9),
      media_id: mediaId,
      user_id: sessionId,
      author_name: userRole,
      content: content.trim(),
      reply_to_id: replyToId,
      created_at: new Date().toISOString(),
    };

    setComments((prev) => [...prev, newComment]);

    if (isConfigured && supabase) {
      try {
        await supabase.from("media_comments").insert([{
          media_id: mediaId,
          user_id: sessionId,
          author_name: userRole,
          content: content.trim(),
          reply_to_id: replyToId,
        }]);
      } catch (err) {
        console.warn("Comment insert fallback:", err);
      }
    }
    return true;
  };

  const deleteComment = async (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    if (isConfigured && supabase) {
      try {
        await supabase.from("media_comments").delete().eq("id", commentId);
      } catch {
        // Fallback
      }
    }
  };

  return { comments, addComment, deleteComment, userRole };
}
