import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";
import { isMissingTableError } from "../lib/supabase";

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
        if (error) {
          if (isMissingTableError(error)) {
            console.warn("Table activity_feed is missing or loading. Operating safely.");
          }
          return;
        }
        if (data) {
          setActivities(data);
          localStorage.setItem("ami_local_activities", JSON.stringify(data));
        }
      });

    const channelName = `rt-activity-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const channel = supabase
      .channel(channelName)
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
