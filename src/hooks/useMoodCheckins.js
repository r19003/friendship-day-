import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";

const DEFAULT_MOODS = {};

export function useMoodCheckins() {
  const { supabase, isConfigured, userRole, sessionId } = useRealtime();
  const [currentMoods, setCurrentMoods] = useState(() => {
    const local = localStorage.getItem("ami_local_moods");
    return local ? JSON.parse(local) : DEFAULT_MOODS;
  });

  useEffect(() => {
    localStorage.setItem("ami_local_moods", JSON.stringify(currentMoods));
  }, [currentMoods]);

  useEffect(() => {
    if (!isConfigured || !supabase) return;

    supabase
      .from("mood_checkins")
      .select("*")
      .eq("is_current", true)
      .then(({ data, error }) => {
        if (!error && data) {
          const map = {};
          data.forEach((row) => {
            map[row.author_name] = row;
          });
          setCurrentMoods(map);
        }
      });

    const channel = supabase
      .channel("realtime:moods")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mood_checkins" },
        (payload) => {
          if (payload.new && payload.new.is_current) {
            setCurrentMoods((prev) => ({
              ...prev,
              [payload.new.author_name]: payload.new,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isConfigured, supabase]);

  const updateMood = async (mood, note = "") => {
    const newEntry = {
      author_name: userRole,
      mood,
      note: note.trim(),
      created_at: new Date().toISOString(),
    };

    setCurrentMoods((prev) => ({
      ...prev,
      [userRole]: newEntry,
    }));

    if (isConfigured && supabase) {
      try {
        await supabase
          .from("mood_checkins")
          .update({ is_current: false })
          .eq("author_name", userRole);

        await supabase.from("mood_checkins").insert([{
          room_id: "ami",
          user_id: sessionId,
          author_name: userRole,
          mood,
          note: note.trim(),
          is_current: true,
        }]);
      } catch (err) {
        console.warn("Mood update fallback:", err);
      }
    }
  };

  return { currentMoods, updateMood, currentUserRole: userRole };
}
