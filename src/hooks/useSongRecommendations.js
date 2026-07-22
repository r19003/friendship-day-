import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";
import { logActivity } from "../lib/activityLogger";

const SEED_SONGS = [];

export function useSongRecommendations() {
  const { supabase, isConfigured, userRole, sessionId } = useRealtime();
  const [songs, setSongs] = useState(() => {
    const local = localStorage.getItem("ami_local_songs");
    return local ? JSON.parse(local) : SEED_SONGS;
  });

  useEffect(() => {
    localStorage.setItem("ami_local_songs", JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    if (!isConfigured || !supabase) return;

    supabase
      .from("song_recommendations")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          setSongs(data);
        }
      });

    const channel = supabase
      .channel("realtime:songs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "song_recommendations" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setSongs((prev) => [payload.new, ...prev.filter((s) => s.id !== payload.new.id)]);
          } else if (payload.eventType === "UPDATE") {
            setSongs((prev) => prev.map((s) => (s.id === payload.new.id ? payload.new : s)));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isConfigured, supabase]);

  const addSong = async ({ songTitle, artistName, spotifyUrl, dedicatedTo, reason, category }) => {
    const newSong = {
      id: "song_" + Math.random().toString(36).substring(2, 9),
      user_id: sessionId,
      author_name: userRole,
      song_title: songTitle.trim(),
      artist_name: artistName.trim(),
      spotify_url: spotifyUrl ? spotifyUrl.trim() : "",
      dedicated_to: dedicatedTo || "All Three",
      reason: reason ? reason.trim() : "",
      category: category || "Comfort",
      is_added_to_playlist: false,
      created_at: new Date().toISOString(),
    };

    setSongs((prev) => [newSong, ...prev]);

    if (isConfigured && supabase) {
      try {
        await supabase.from("song_recommendations").insert([{
          room_id: "ami",
          user_id: sessionId,
          author_name: userRole,
          song_title: songTitle.trim(),
          artist_name: artistName.trim(),
          spotify_url: spotifyUrl ? spotifyUrl.trim() : "",
          dedicated_to: dedicatedTo || "All Three",
          reason: reason ? reason.trim() : "",
          category: category || "Comfort",
        }]);
      } catch (err) {
        console.warn("Song recommendation insert fallback:", err);
      }
    }

    logActivity({
      sessionId,
      authorName: userRole,
      activityType: "added_song",
      entityType: "song",
      summary: `${userRole} recommended '${songTitle}' by ${artistName}.`,
    });
  };

  const togglePlaylistStatus = async (songId) => {
    setSongs((prev) =>
      prev.map((s) => {
        if (s.id !== songId) return s;
        return { ...s, is_added_to_playlist: !s.is_added_to_playlist };
      })
    );

    if (isConfigured && supabase) {
      const target = songs.find((s) => s.id === songId);
      if (target) {
        try {
          await supabase
            .from("song_recommendations")
            .update({ is_added_to_playlist: !target.is_added_to_playlist })
            .eq("id", songId);
        } catch {
          // Fallback
        }
      }
    }
  };

  return { songs, addSong, togglePlaylistStatus, userRole };
}
