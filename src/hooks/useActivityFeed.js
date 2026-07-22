import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";

const SEED_ACTIVITIES = [];

export function useActivityFeed() {
  const { supabase, isConfigured } = useRealtime();
  const [activities, setActivities] = useState(() => {
    const local = localStorage.getItem("ami_local_activities");
    return local ? JSON.parse(local) : SEED_ACTIVITIES;
  });

  useEffect(() => {
    if (!isConfigured || !supabase) return;

    supabase
      .from("activity_feed")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data, error }) => {
        if (!error && data) {
          setActivities(data);
          localStorage.setItem("ami_local_activities", JSON.stringify(data));
        }
      });

    const channel = supabase
      .channel("realtime:activity_feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "activity_feed" },
        (payload) => {
          setActivities((prev) => [payload.new, ...prev.slice(0, 19)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isConfigured, supabase]);

  return { activities };
}
