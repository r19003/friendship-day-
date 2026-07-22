import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured, ensureAnonymousSession } from "../lib/supabase";
import { validateJokeContent, sanitizeContent } from "../lib/jokeValidation";

export function useJokes(tableName, seedData = []) {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setJokes([]);
      return;
    }
    setLoading(true);
    ensureAnonymousSession().then((session) => {
      if (session) setSessionId(session.user?.id);
    });
    supabase
      .from(tableName)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(60)
      .then(({ data, error: err }) => {
        setLoading(false);
        if (err) {
          setError(err.message);
          setJokes([]);
        } else {
          setIsLive(true);
          setJokes(data || []);
        }
      });
  }, [tableName]);

  const addJoke = useCallback(
    async ({ content, display_name, category }) => {
      const validation = validateJokeContent(content);
      if (!validation.valid) return { error: validation.error };
      const safe = sanitizeContent(content);
      const baseReactions = {};

      const newJoke = {
        id: `local-${Date.now()}`,
        content: safe,
        display_name,
        category,
        reactions: baseReactions,
        created_at: new Date().toISOString(),
        session_id: sessionId,
      };

      if (!isSupabaseConfigured) {
        setJokes((prev) => [newJoke, ...prev]);
        return { error: null };
      }

      const { data, error: err } = await supabase
        .from(tableName)
        .insert([{ content: safe, display_name, category, reactions: baseReactions, session_id: sessionId }])
        .select()
        .single();

      if (err) {
        setJokes((prev) => [newJoke, ...prev]);
        return { error: null };
      }
      setJokes((prev) => [data, ...prev]);
      return { error: null };
    },
    [tableName, sessionId]
  );

  const reactToJoke = useCallback(
    async (jokeId, emoji) => {
      setJokes((prev) =>
        prev.map((j) => {
          if (j.id !== jokeId) return j;
          const reactions = { ...j.reactions };
          reactions[emoji] = (reactions[emoji] || 0) + 1;
          return { ...j, reactions };
        })
      );

      if (!isSupabaseConfigured) return;
      const joke = jokes.find((j) => j.id === jokeId);
      if (!joke) return;
      const reactions = { ...joke.reactions };
      reactions[emoji] = (reactions[emoji] || 0) + 1;
      await supabase.from(tableName).update({ reactions }).eq("id", jokeId);
    },
    [tableName, jokes]
  );

  const deleteJoke = useCallback(
    async (jokeId) => {
      setJokes((prev) => prev.filter((j) => j.id !== jokeId));
      if (!isSupabaseConfigured) return;
      await supabase.from(tableName).delete().eq("id", jokeId);
    },
    [tableName]
  );

  return { jokes, loading, error, isLive, addJoke, reactToJoke, deleteJoke, sessionId };
}
