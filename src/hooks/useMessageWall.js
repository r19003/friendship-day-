import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";
import { CHANNELS } from "../lib/realtimeChannels";

const INITIAL_WALL_NOTES = [];

export function useMessageWall() {
  const { supabase, isConfigured, userRole, sessionId } = useRealtime();
  const [notes, setNotes] = useState(() => {
    const local = localStorage.getItem("ami_local_wall");
    return local ? JSON.parse(local) : INITIAL_WALL_NOTES;
  });
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem("ami_local_wall", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (!isConfigured || !supabase) return;

    supabase
      .from("message_wall")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          setNotes(data);
        }
      });

    const channel = supabase
      .channel(CHANNELS.WALL)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "message_wall" },
        (payload) => {
          setNotes((prev) => [payload.new, ...prev.filter((n) => n.id !== payload.new.id)]);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "message_wall" },
        (payload) => {
          setNotes((prev) => prev.filter((n) => n.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isConfigured, supabase]);

  const addNote = async ({ content, category, noteColor }) => {
    const newNote = {
      id: "wall_" + Math.random().toString(36).substring(2, 9),
      user_id: sessionId,
      author_name: userRole,
      category: category || "For All Three",
      note_color: noteColor || "lavender",
      content: content.trim(),
      is_pinned: false,
      created_at: new Date().toISOString(),
      reactions: {},
    };

    setNotes((prev) => [newNote, ...prev]);

    if (isConfigured && supabase) {
      try {
        await supabase.from("message_wall").insert([{
          room_id: "ami",
          user_id: sessionId,
          author_name: userRole,
          category: category || "For All Three",
          note_color: noteColor || "lavender",
          content: content.trim(),
        }]);
      } catch (err) {
        console.warn("Message wall insert fallback:", err);
      }
    }
  };

  const deleteNote = async (noteId) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    if (isConfigured && supabase) {
      try {
        await supabase.from("message_wall").delete().eq("id", noteId);
      } catch {
        // Fallback
      }
    }
  };

  const toggleReaction = (noteId, emoji) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id !== noteId) return n;
        const currentReactions = { ...(n.reactions || {}) };
        currentReactions[emoji] = (currentReactions[emoji] || 0) + 1;
        return { ...n, reactions: currentReactions };
      })
    );
  };

  const filteredNotes = activeCategory === "All"
    ? notes
    : notes.filter((n) => (n.category || "").toLowerCase() === activeCategory.toLowerCase());

  return {
    notes: filteredNotes,
    addNote,
    deleteNote,
    toggleReaction,
    activeCategory,
    setActiveCategory,
    userRole,
  };
}
