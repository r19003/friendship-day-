-- ============================================================
-- FRIENDSHIP DAY APP - COMPLETE DATABASE SCHEMA MIGRATION
-- Project: Daisy, Sunshine & Me (AMI Trio)
-- Pure Standard SQL (Compatible with all Supabase Editors)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. CHAT MESSAGES
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 2000),
  reply_to_id TEXT,
  reply_author TEXT,
  reply_content TEXT,
  is_edited BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_chat_messages_room_created ON public.chat_messages (room_id, created_at ASC);

-- 2. CHAT MESSAGE READS
CREATE TABLE IF NOT EXISTS public.chat_message_reads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  reader_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_message_user_read UNIQUE (message_id, user_id)
);

-- 3. JOKES (Daisy Joke Garden)
CREATE TABLE IF NOT EXISTS public.jokes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  display_name TEXT,
  category TEXT,
  reactions JSONB NOT NULL DEFAULT '{}'::jsonb,
  session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. ROASTS (Sunshine Roast Room)
CREATE TABLE IF NOT EXISTS public.roasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  display_name TEXT,
  category TEXT,
  reactions JSONB NOT NULL DEFAULT '{}'::jsonb,
  session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. MESSAGE WALL
CREATE TABLE IF NOT EXISTS public.message_wall (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'For All Three',
  note_color TEXT NOT NULL DEFAULT 'lavender',
  content TEXT NOT NULL,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  reactions JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_message_wall_created ON public.message_wall (created_at DESC);

-- 6. BUCKET LIST ITEMS
CREATE TABLE IF NOT EXISTS public.bucket_list_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Random Chaos',
  note TEXT DEFAULT '',
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_by_name TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. MEDIA ITEMS (Galleries & Archives)
CREATE TABLE IF NOT EXISTS public.media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  gallery_type TEXT NOT NULL DEFAULT 'shared',
  semester_number INT,
  media_type TEXT NOT NULL DEFAULT 'image',
  storage_path TEXT,
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT DEFAULT '',
  handwritten_note TEXT DEFAULT '',
  alt_text TEXT DEFAULT 'Memory photo',
  category TEXT DEFAULT 'College',
  date_label TEXT DEFAULT '',
  frame_style TEXT DEFAULT 'polaroid',
  rotation REAL DEFAULT 0,
  width INT,
  height INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. MEDIA COMMENTS
CREATE TABLE IF NOT EXISTS public.media_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  reply_to_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. ACTIVITY FEED
CREATE TABLE IF NOT EXISTS public.activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT,
  author_name TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  summary TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. MOOD CHECKINS
CREATE TABLE IF NOT EXISTS public.mood_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  mood TEXT NOT NULL,
  note TEXT DEFAULT '',
  is_current BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. MEMORY CAPSULES
CREATE TABLE IF NOT EXISTS public.memory_capsules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  recipient TEXT NOT NULL DEFAULT 'All Three',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  unlock_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. SONG RECOMMENDATIONS
CREATE TABLE IF NOT EXISTS public.song_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  song_title TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  spotify_url TEXT DEFAULT '',
  dedicated_to TEXT DEFAULT 'All Three',
  reason TEXT DEFAULT '',
  category TEXT DEFAULT 'Comfort',
  is_added_to_playlist BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 13. POLLS
CREATE TABLE IF NOT EXISTS public.polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  question TEXT NOT NULL,
  is_closed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. POLL OPTIONS
CREATE TABLE IF NOT EXISTS public.poll_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 15. POLL VOTES
CREATE TABLE IF NOT EXISTS public.poll_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE,
  option_id UUID REFERENCES public.poll_options(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  author_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 16. USER VIEW STATE
CREATE TABLE IF NOT EXISTS public.user_view_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  room_id TEXT NOT NULL DEFAULT 'ami',
  section_name TEXT NOT NULL,
  last_viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_room_section UNIQUE (user_id, room_id, section_name)
);

-- 17. MEDIA CAPTION SUGGESTIONS
CREATE TABLE IF NOT EXISTS public.media_caption_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  suggestion TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) & PUBLIC ACCESS POLICIES
-- ============================================================

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_message_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jokes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_wall ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bucket_list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memory_capsules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.song_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_view_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_caption_suggestions ENABLE ROW LEVEL SECURITY;

-- Allow public/anon access for all operations
CREATE POLICY "allow_all_chat_messages" ON public.chat_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_chat_message_reads" ON public.chat_message_reads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_jokes" ON public.jokes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_roasts" ON public.roasts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_message_wall" ON public.message_wall FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_bucket_list_items" ON public.bucket_list_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_media_items" ON public.media_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_media_comments" ON public.media_comments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_activity_feed" ON public.activity_feed FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_mood_checkins" ON public.mood_checkins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_memory_capsules" ON public.memory_capsules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_song_recommendations" ON public.song_recommendations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_polls" ON public.polls FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_poll_options" ON public.poll_options FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_poll_votes" ON public.poll_votes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_user_view_state" ON public.user_view_state FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_media_caption_suggestions" ON public.media_caption_suggestions FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- SUPABASE REALTIME PUBLICATION
-- ============================================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.jokes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.roasts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_wall;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bucket_list_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.media_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.media_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_feed;
ALTER PUBLICATION supabase_realtime ADD TABLE public.mood_checkins;
ALTER PUBLICATION supabase_realtime ADD TABLE public.memory_capsules;
ALTER PUBLICATION supabase_realtime ADD TABLE public.song_recommendations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.polls;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_message_reads;

NOTIFY pgrst, 'reload schema';
