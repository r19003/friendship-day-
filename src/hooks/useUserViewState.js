import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";

export function useUserViewState(sectionName) {
  const { supabase, isConfigured, sessionId } = useRealtime();
  const [lastViewedAt, setLastViewedAt] = useState(() => {
    return localStorage.getItem(`ami_viewed_${sectionName}`) || new Date().toISOString();
  });

  const markSectionViewed = async () => {
    const nowIso = new Date().toISOString();
    setLastViewedAt(nowIso);
    localStorage.setItem(`ami_viewed_${sectionName}`, nowIso);

    if (isConfigured && supabase) {
      try {
        await supabase.from("user_view_state").upsert([{
          user_id: sessionId,
          room_id: "ami",
          section_name: sectionName,
          last_viewed_at: nowIso,
        }], { onConflict: "user_id,room_id,section_name" });
      } catch {
        // Fallback
      }
    }
  };

  return { lastViewedAt, markSectionViewed };
}
