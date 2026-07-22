import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";
import { CHANNELS } from "../lib/realtimeChannels";

export function useSharedBucketList() {
  const { supabase, isConfigured, userRole, sessionId } = useRealtime();
  const [items, setItems] = useState(() => {
    const local = localStorage.getItem("ami_local_bucket");
    return local ? JSON.parse(local) : [];
  });
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem("ami_local_bucket", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!isConfigured || !supabase) return;

    supabase
      .from("bucket_list_items")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          setItems(data);
        }
      });

    const channel = supabase
      .channel(CHANNELS.BUCKET)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bucket_list_items" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setItems((prev) => [...prev.filter((i) => i.id !== payload.new.id), payload.new]);
          } else if (payload.eventType === "UPDATE") {
            setItems((prev) => prev.map((i) => (i.id === payload.new.id ? payload.new : i)));
          } else if (payload.eventType === "DELETE") {
            setItems((prev) => prev.filter((i) => i.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isConfigured, supabase]);

  const toggleItemCompletion = async (itemId) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const nextCompleted = !item.is_completed;
        return {
          ...item,
          is_completed: nextCompleted,
          completed_by_name: nextCompleted ? userRole : null,
          completed_at: nextCompleted ? new Date().toISOString() : null,
        };
      })
    );

    if (isConfigured && supabase) {
      const target = items.find((i) => i.id === itemId);
      if (target) {
        try {
          await supabase
            .from("bucket_list_items")
            .update({
              is_completed: !target.is_completed,
              completed_by_name: !target.is_completed ? userRole : null,
              completed_at: !target.is_completed ? new Date().toISOString() : null,
            })
            .eq("id", itemId);
        } catch {
          // Fallback
        }
      }
    }
  };

  const addItem = async ({ title, category, note }) => {
    const newItem = {
      id: "b_" + Math.random().toString(36).substring(2, 9),
      user_id: sessionId,
      author_name: userRole,
      title: title.trim(),
      category: category || "Random Chaos",
      note: note ? note.trim() : "",
      is_completed: false,
      created_at: new Date().toISOString(),
    };

    setItems((prev) => [...prev, newItem]);

    if (isConfigured && supabase) {
      try {
        await supabase.from("bucket_list_items").insert([{
          room_id: "ami",
          user_id: sessionId,
          author_name: userRole,
          title: title.trim(),
          category: category || "Random Chaos",
          note: note ? note.trim() : "",
        }]);
      } catch {
        // Fallback
      }
    }
  };

  const deleteItem = async (itemId) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    if (isConfigured && supabase) {
      try {
        await supabase.from("bucket_list_items").delete().eq("id", itemId);
      } catch {
        // Fallback
      }
    }
  };

  const completedCount = items.filter((i) => i.is_completed).length;
  const totalCount = items.length;

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((i) => (i.category || "").toLowerCase() === activeCategory.toLowerCase());

  return {
    items: filteredItems,
    allItems: items,
    completedCount,
    totalCount,
    toggleItemCompletion,
    addItem,
    deleteItem,
    activeCategory,
    setActiveCategory,
    userRole,
  };
}
