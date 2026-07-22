import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";
import { logActivity } from "../lib/activityLogger";

const SEED_CAPSULES = [];

export function useMemoryCapsules() {
  const { supabase, isConfigured, userRole, sessionId } = useRealtime();
  const [capsules, setCapsules] = useState(() => {
    const local = localStorage.getItem("ami_local_capsules");
    return local ? JSON.parse(local) : SEED_CAPSULES;
  });

  useEffect(() => {
    localStorage.setItem("ami_local_capsules", JSON.stringify(capsules));
  }, [capsules]);

  useEffect(() => {
    if (!isConfigured || !supabase) return;

    supabase
      .from("memory_capsules")
      .select("*")
      .order("unlock_at", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          setCapsules(data);
        }
      });

    const channel = supabase
      .channel("realtime:capsules")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "memory_capsules" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setCapsules((prev) => [...prev.filter((c) => c.id !== payload.new.id), payload.new]);
          } else if (payload.eventType === "DELETE") {
            setCapsules((prev) => prev.filter((c) => c.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isConfigured, supabase]);

  const addCapsule = async ({ title, content, recipient, unlockAt }) => {
    const newCap = {
      id: "cap_" + Math.random().toString(36).substring(2, 9),
      user_id: sessionId,
      author_name: userRole,
      recipient: recipient || "All Three",
      title: title.trim(),
      content: content.trim(),
      unlock_at: unlockAt,
      created_at: new Date().toISOString(),
    };

    setCapsules((prev) => [...prev, newCap]);

    if (isConfigured && supabase) {
      try {
        await supabase.from("memory_capsules").insert([{
          room_id: "ami",
          user_id: sessionId,
          author_name: userRole,
          recipient: recipient || "All Three",
          title: title.trim(),
          content: content.trim(),
          unlock_at: unlockAt,
        }]);
      } catch (err) {
        console.warn("Capsule insert fallback:", err);
      }
    }

    logActivity({
      sessionId,
      authorName: userRole,
      activityType: "created_capsule",
      entityType: "capsule",
      summary: `${userRole} sealed a new time capsule "${title}".`,
    });
  };

  const deleteCapsule = async (capId) => {
    setCapsules((prev) => prev.filter((c) => c.id !== capId));
    if (isConfigured && supabase) {
      try {
        await supabase.from("memory_capsules").delete().eq("id", capId);
      } catch {
        // Fallback
      }
    }
  };

  return { capsules, addCapsule, deleteCapsule, userRole };
}
