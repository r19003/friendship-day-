// Activity logger helper to write activity events to Supabase Postgres

import { supabase, isSupabaseConfigured } from "./supabase";

export async function logActivity({
  sessionId,
  authorName,
  activityType,
  entityType,
  entityId = null,
  summary,
  metadata = {},
}) {
  if (!isSupabaseConfigured || !supabase) {
    const localActivities = JSON.parse(localStorage.getItem("ami_local_activities") || "[]");
    const newActivity = {
      id: "act_" + Math.random().toString(36).substring(2, 9),
      author_name: authorName,
      activity_type: activityType,
      entity_type: entityType,
      entity_id: entityId,
      summary,
      metadata,
      created_at: new Date().toISOString(),
    };
    localStorage.setItem("ami_local_activities", JSON.stringify([newActivity, ...localActivities].slice(0, 30)));
    return;
  }

  try {
    await supabase.from("activity_feed").insert([
      {
        room_id: "ami",
        user_id: sessionId,
        author_name: authorName,
        activity_type: activityType,
        entity_type: entityType,
        entity_id: entityId,
        summary: summary.trim(),
        metadata,
      },
    ]);
  } catch (err) {
    console.warn("Log activity error:", err);
  }
}
