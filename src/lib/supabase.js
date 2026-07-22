import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "your_supabase_project_url" &&
    supabaseAnonKey !== "your_supabase_anon_key"
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;

// Persistent unique device session ID
export function getOrCreateSessionId() {
  const STORAGE_KEY = "ami_device_session_id";
  let sessionId = localStorage.getItem(STORAGE_KEY);
  if (!sessionId) {
    sessionId = "user_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
    localStorage.setItem(STORAGE_KEY, sessionId);
  }
  return sessionId;
}

// Anonymous session helper
export async function ensureAnonymousSession() {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) return session;

    const { data: { session: newSession }, error } = await supabase.auth.signInAnonymously();
    if (error) return null;
    return newSession;
  } catch {
    return null;
  }
}
