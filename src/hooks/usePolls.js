import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";
import { logActivity } from "../lib/activityLogger";

const SEED_POLLS = [];

export function usePolls() {
  const { supabase, isConfigured, userRole, sessionId } = useRealtime();
  const [polls, setPolls] = useState(() => {
    const local = localStorage.getItem("ami_local_polls");
    return local ? JSON.parse(local) : SEED_POLLS;
  });

  useEffect(() => {
    localStorage.setItem("ami_local_polls", JSON.stringify(polls));
  }, [polls]);

  useEffect(() => {
    if (!isConfigured || !supabase) return;

    supabase
      .from("polls")
      .select("*, poll_options(*, poll_votes(*))")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          const formatted = data.map((p) => ({
            ...p,
            options: (p.poll_options || []).map((o) => ({
              ...o,
              votes: (o.poll_votes || []).map((v) => v.author_name || v.user_id),
            })),
          }));
          setPolls(formatted);
        }
      });

    const channel = supabase
      .channel("realtime:polls")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "polls" },
        () => {
          // Re-fetch
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isConfigured, supabase]);

  const castVote = async (pollId, optionId) => {
    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId) return poll;

        const updatedOptions = poll.options.map((opt) => {
          const votesWithoutUser = (opt.votes || []).filter((v) => v !== userRole);
          if (opt.id === optionId) {
            return { ...opt, votes: [...votesWithoutUser, userRole] };
          }
          return { ...opt, votes: votesWithoutUser };
        });

        return { ...poll, options: updatedOptions };
      })
    );

    if (isConfigured && supabase) {
      try {
        await supabase.from("poll_votes").delete().eq("poll_id", pollId).eq("user_id", sessionId);
        await supabase.from("poll_votes").insert([{
          poll_id: pollId,
          option_id: optionId,
          user_id: sessionId,
          author_name: userRole,
        }]);
      } catch (err) {
        console.warn("Vote cast fallback:", err);
      }
    }
  };

  const createPoll = async (question, optionTexts = []) => {
    const newPoll = {
      id: "poll_" + Math.random().toString(36).substring(2, 9),
      author_name: userRole,
      question: question.trim(),
      is_closed: false,
      options: optionTexts.map((txt, idx) => ({
        id: `opt_${Date.now()}_${idx}`,
        option_text: txt.trim(),
        votes: [],
      })),
      created_at: new Date().toISOString(),
    };

    setPolls((prev) => [newPoll, ...prev]);

    if (isConfigured && supabase) {
      try {
        const { data: pollData } = await supabase.from("polls").insert([{
          room_id: "ami",
          user_id: sessionId,
          author_name: userRole,
          question: question.trim(),
        }]).select().single();

        if (pollData) {
          const optsToInsert = optionTexts.map((txt, idx) => ({
            poll_id: pollData.id,
            option_text: txt.trim(),
            position: idx,
          }));
          await supabase.from("poll_options").insert(optsToInsert);
        }
      } catch {
        // Fallback
      }
    }

    logActivity({
      sessionId,
      authorName: userRole,
      activityType: "created_poll",
      entityType: "poll",
      summary: `${userRole} created a new poll "${question}".`,
    });
  };

  return { polls, castVote, createPoll, userRole };
}
