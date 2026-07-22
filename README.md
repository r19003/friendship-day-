# 🌼 Daisy, Sunshine & Me

> A deeply personal Friendship Day website built by **Raina** for her two best friends:
> - **Aparna** — "Daisy"
> - **Saayra** — "Sunshine"

This website is a digital love letter — interactive, story-driven, emotional, real-time, and slightly chaotic. Two completely different personalized universes, connected through BTS and friendship.

---

## ✨ Features & Architecture

### 🏠 Home Page
- Animated star map constellation
- Portal cards leading to each universe

### 🌼 Aparna's Universe (Daisy)
- Allen coaching origin story with an interactive timeline
- "The College Form" story with a mock form card & alternate universe desaturation easter egg
- The Familiar Face in a New Chapter (animated 2-page notebook with SVG thread)
- The Aparna Effect (interactive 5-petal flower & mobile accordion)
- Her Little World (storybook journey)
- Cute Anger Emergency (interactive mitigations & Daisy Mode Restored state)
- Ask Elder Sister Aparna (illustrated desk with 7 interactive drawers & unfolding notes)
- My College Constant (binder tabs & fixed Daisy anchor)
- Things I Hope You Never Forget (10 elegant cream paper cards)
- **Twenty Little Frames of My Daisy** — 20-photo stackable deck with drag/swipe, shuffle, and full-screen view + live upload
- Spring Day visual with expandable memory cards
- Elder sister vs. literal child dual-mode toggle
- Prozac Daisy prescription card (dosage meter + 73% fill)
- Handwritten thank-you wall
- A personal letter with a "Send a Hug" button + confetti
- **Live Joke Garden** — persistent real-time jokes & emoji reactions

### ☀️ Saayra's Universe (Sunshine)
- Floating words + firefly particles hero section
- NB-107 corridor story (where they first met, 21 Aug 2023)
- The Cake Memory — progressive reveal with interactive reasons
- "Why You Are Sunshine" accordion
- Mature vs Child-at-Heart dual card
- Official Platonic Husband Contract (stamped seal + confetti)
- Things That Feel Like Sunshine (expandable cards)
- Feed My Sunshine interactive food game
- **Twenty Frames of Sunshine** — 20-photo stackable deck with drag/swipe, shuffle, and full-screen view + live upload
- Shukriya (thank you) sticky note wall
- A poem for Saayra
- **Live Roast Room** — persistent real-time roasts & food emergencies
- A personal letter with "Send Sunshine" + confetti

### 💜 Our Chaos (Shared)
- BTS connection timeline & song dedications
- **The Little Things That Became Our Things** — animated memory ribbon
- **Our Friendship Soundtrack** — custom Spotify playlist integration frame
- Floating Soundtrack shortcut button
- **Six Semesters of Us** — Semester-by-semester photo & video archive (Semester 1 to Semester 6: 2023 – June 2026) with video playback, non-autoplay controls, timeline scrubber (2023 → June 2026), and live photo/video upload modal
- **Today's Memory** — Deterministic daily memory highlight with session override
- **How Are We Doing Today?** — Hanging trio mood check-in tags with soft-blue, daisy-yellow, and lavender-gold styling
- **Open This Later** — Sealed time capsules set to unlock on future dates
- **AMI Live** — Real-time group chat for Raina, Aparna, and Saayra with online presence, typing indicators, replies, message editing/deleting, and emoji reactions
- **The Things We Still Have to Do Together** — Collaborative real-time bucket list with category filters and completion tracking
- **Collaborative Polls** — Playful trio decision polls with percentage bars
- **Songs We Should Add** — Collaborative song recommendation board with Spotify URL links & playlist status toggles
- **Leave Something Here for Us** — Real-time pinned message wall with customizable note colors, category filters, and reactions
- **What Just Happened in AMI** — Real-time activity feed timeline with toast notifications

---

## 🗄️ Supabase Database Tables & Realtime Setup

Execute the following SQL in your Supabase SQL Editor to set up all tables and enable Realtime:

```sql
-- 1. Jokes Table
CREATE TABLE IF NOT EXISTS public.jokes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  corner TEXT NOT NULL CHECK (corner IN ('aparna', 'saayra', 'shared')),
  category TEXT NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 3 AND 180),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 1000),
  reply_to_id UUID REFERENCES public.chat_messages(id) ON DELETE SET NULL,
  is_edited BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Message Wall Table
CREATE TABLE IF NOT EXISTS public.message_wall (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  category TEXT NOT NULL,
  note_color TEXT NOT NULL DEFAULT 'lavender',
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 3 AND 1500),
  is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Shared Bucket List Table
CREATE TABLE IF NOT EXISTS public.bucket_list_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 3 AND 140),
  note TEXT CHECK (char_length(note) <= 400),
  category TEXT NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_by_user_id UUID,
  completed_by_name TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. User-Uploaded Media Table
CREATE TABLE IF NOT EXISTS public.media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  gallery_type TEXT NOT NULL CHECK (gallery_type IN ('semester', 'daisy', 'sunshine', 'shared', 'bucket-list', 'message-wall')),
  semester_number INTEGER CHECK (semester_number IS NULL OR semester_number BETWEEN 1 AND 6),
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  storage_path TEXT NOT NULL,
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  poster_url TEXT,
  caption TEXT CHECK (char_length(caption) <= 500),
  handwritten_note TEXT CHECK (char_length(handwritten_note) <= 300),
  alt_text TEXT NOT NULL CHECK (char_length(alt_text) BETWEEN 3 AND 300),
  category TEXT,
  date_label TEXT,
  frame_style TEXT NOT NULL DEFAULT 'classic',
  rotation NUMERIC NOT NULL DEFAULT 0,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Media Comments Table
CREATE TABLE IF NOT EXISTS public.media_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id UUID NOT NULL REFERENCES public.media_items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 500),
  reply_to_id UUID REFERENCES public.media_comments(id) ON DELETE SET NULL,
  is_edited BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Activity Feed Table
CREATE TABLE IF NOT EXISTS public.activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  summary TEXT NOT NULL CHECK (char_length(summary) <= 300),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Mood Check-ins Table
CREATE TABLE IF NOT EXISTS public.mood_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  mood TEXT NOT NULL,
  note TEXT CHECK (char_length(note) <= 200),
  is_current BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Memory Capsules Table
CREATE TABLE IF NOT EXISTS public.memory_capsules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  recipient TEXT NOT NULL,
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 3 AND 120),
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 3 AND 3000),
  media_id UUID REFERENCES public.media_items(id) ON DELETE SET NULL,
  unlock_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Song Recommendations Table
CREATE TABLE IF NOT EXISTS public.song_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  song_title TEXT NOT NULL CHECK (char_length(song_title) BETWEEN 1 AND 200),
  artist_name TEXT NOT NULL CHECK (char_length(artist_name) BETWEEN 1 AND 200),
  spotify_url TEXT,
  dedicated_to TEXT,
  reason TEXT CHECK (char_length(reason) <= 500),
  category TEXT NOT NULL,
  is_added_to_playlist BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Polls & Votes Tables
CREATE TABLE IF NOT EXISTS public.polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL DEFAULT 'ami',
  user_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  question TEXT NOT NULL CHECK (char_length(question) BETWEEN 3 AND 300),
  is_closed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.poll_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID NOT NULL REFERENCES public.polls(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL CHECK (char_length(option_text) BETWEEN 1 AND 150),
  position INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.poll_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID NOT NULL REFERENCES public.polls(id) ON DELETE CASCADE,
  option_id UUID NOT NULL REFERENCES public.poll_options(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  author_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(poll_id, user_id)
);

-- Enable RLS
ALTER TABLE public.jokes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
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

-- Allow Public Access Policies
CREATE POLICY "Public read jokes" ON public.jokes FOR SELECT USING (true);
CREATE POLICY "Public insert jokes" ON public.jokes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete jokes" ON public.jokes FOR DELETE USING (true);

CREATE POLICY "Public read chat" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Public insert chat" ON public.chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete chat" ON public.chat_messages FOR DELETE USING (true);

CREATE POLICY "Public read wall" ON public.message_wall FOR SELECT USING (true);
CREATE POLICY "Public insert wall" ON public.message_wall FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete wall" ON public.message_wall FOR DELETE USING (true);

CREATE POLICY "Public read bucket" ON public.bucket_list_items FOR SELECT USING (true);
CREATE POLICY "Public insert bucket" ON public.bucket_list_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update bucket" ON public.bucket_list_items FOR UPDATE USING (true);
CREATE POLICY "Public delete bucket" ON public.bucket_list_items FOR DELETE USING (true);

CREATE POLICY "Public read media" ON public.media_items FOR SELECT USING (true);
CREATE POLICY "Public insert media" ON public.media_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete media" ON public.media_items FOR DELETE USING (true);

CREATE POLICY "Public read comments" ON public.media_comments FOR SELECT USING (true);
CREATE POLICY "Public insert comments" ON public.media_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete comments" ON public.media_comments FOR DELETE USING (true);

CREATE POLICY "Public read activity" ON public.activity_feed FOR SELECT USING (true);
CREATE POLICY "Public insert activity" ON public.activity_feed FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read moods" ON public.mood_checkins FOR SELECT USING (true);
CREATE POLICY "Public insert moods" ON public.mood_checkins FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update moods" ON public.mood_checkins FOR UPDATE USING (true);

CREATE POLICY "Public read capsules" ON public.memory_capsules FOR SELECT USING (true);
CREATE POLICY "Public insert capsules" ON public.memory_capsules FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete capsules" ON public.memory_capsules FOR DELETE USING (true);

CREATE POLICY "Public read songs" ON public.song_recommendations FOR SELECT USING (true);
CREATE POLICY "Public insert songs" ON public.song_recommendations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update songs" ON public.song_recommendations FOR UPDATE USING (true);

CREATE POLICY "Public read polls" ON public.polls FOR SELECT USING (true);
CREATE POLICY "Public insert polls" ON public.polls FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read poll options" ON public.poll_options FOR SELECT USING (true);
CREATE POLICY "Public insert poll options" ON public.poll_options FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read poll votes" ON public.poll_votes FOR SELECT USING (true);
CREATE POLICY "Public insert poll votes" ON public.poll_votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete poll votes" ON public.poll_votes FOR DELETE USING (true);

-- Enable Realtime Publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.jokes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_wall;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bucket_list_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.media_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.media_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_feed;
ALTER PUBLICATION supabase_realtime ADD TABLE public.mood_checkins;
ALTER PUBLICATION supabase_realtime ADD TABLE public.memory_capsules;
ALTER PUBLICATION supabase_realtime ADD TABLE public.song_recommendations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.polls;
ALTER PUBLICATION supabase_realtime ADD TABLE public.poll_votes;
```

---

## 🪣 Supabase Storage Buckets Setup

Create the following public storage bucket inside Supabase Dashboard → Storage:

- `friendship-media`

Create public Storage Policy:
```sql
CREATE POLICY "Public Storage Select" ON storage.objects FOR SELECT USING (bucket_id = 'friendship-media');
CREATE POLICY "Public Storage Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'friendship-media');
CREATE POLICY "Public Storage Delete" ON storage.objects FOR DELETE USING (bucket_id = 'friendship-media');
```

---

## 🎵 How to Add the Spotify Playlist

1. Open the playlist in Spotify.
2. Select **Share** → **Copy link to playlist**.
3. Open `src/data/btsData.js`.
4. Add your playlist URL:
```javascript
export const friendshipMusic = {
  playlistTitle: "Our Friendship Soundtrack",
  spotifyPlaylistUrl: "https://open.spotify.com/playlist/YOUR_PLAYLIST_ID",
  description: "The songs behind our BTS memories, late-night conversations, college chaos, and every phase we have grown through together."
};
```

---

## 🔒 Realtime Security & Privacy Warning

> **Notice:** Anyone with the public website link may be able to view the galleries and participate in real-time chat & message boards. Selecting display names ("Raina", "Aparna", "Saayra") does not constitute secure identity verification. For strict private access, deploy behind password protection or enable Supabase Email Authentication.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **Vite + React** | Frontend framework |
| **Framer Motion** | Animations & page transitions |
| **React Router DOM** | Client-side routing |
| **Supabase Postgres & Realtime** | Real-time chat, message wall, jokes, bucket list, capsules, song board & polls |
| **Supabase Storage** | Real-time photo & video media uploads |
| **Canvas Confetti** | Celebratory effects |
| **Lucide React** | Icons |
| **Vanilla CSS** | Styling (Modular design system) |

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Create a `.env` file in root:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run dev server
```bash
npm run dev
```

Open **http://localhost:5173** in browser.

---

## 💜 For Aparna & Saayra

Happy Friendship Day. 🌼☀️💜

— Raina
