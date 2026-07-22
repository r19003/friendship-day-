import React, { useState } from "react";
import { Music, Check, ExternalLink, PlusCircle } from "lucide-react";
import { useSongRecommendations } from "../../hooks/useSongRecommendations";

export default function SongRecommendations() {
  const { songs, addSong, togglePlaylistStatus, userRole } = useSongRecommendations();
  const [showForm, setShowForm] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [dedicatedTo, setDedicatedTo] = useState("All Three");
  const [reason, setReason] = useState("");
  const [category, setCategory] = useState("Comfort");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!songTitle.trim() || !artistName.trim()) return;

    addSong({ songTitle, artistName, spotifyUrl, dedicatedTo, reason, category });

    setSongTitle("");
    setArtistName("");
    setSpotifyUrl("");
    setReason("");
    setShowForm(false);
  };

  return (
    <section id="song-recommendations" className="song-board-section page-grain">
      <div className="content-container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section-kicker" style={{ color: "var(--chaos-yellow)", justifyContent: "center" }}>
            🎵 Collaborative Playlist Board
          </span>
          <h2 className="section-title" style={{ color: "white", marginBottom: "0.5rem" }}>
            Songs We Should Add
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 580, marginInline: "auto" }}>
            Suggest songs for our shared BTS & friendship soundtrack. Mark when added to the main Spotify playlist.
          </p>
          <button
            className="primary-button btn-daisy"
            style={{ marginTop: "1rem", fontSize: "0.88rem" }}
            onClick={() => setShowForm(!showForm)}
          >
            <PlusCircle size={16} /> Suggest a Song
          </button>
        </div>

        {/* Suggest Form */}
        {showForm && (
          <form className="song-form" onSubmit={handleSubmit}>
            <h3 style={{ color: "white", marginBottom: "1rem", fontSize: "1.2rem" }}>Recommend a Song</h3>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <input
                type="text"
                className="upload-input"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="Song Title (e.g. Mikrokosmos)..."
                required
              />
              <input
                type="text"
                className="upload-input"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="Artist (e.g. BTS)..."
                required
              />
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <input
                type="url"
                className="upload-input"
                value={spotifyUrl}
                onChange={(e) => setSpotifyUrl(e.target.value)}
                placeholder="Spotify URL (optional)..."
              />
              <select value={dedicatedTo} onChange={(e) => setDedicatedTo(e.target.value)} className="upload-input">
                <option value="All Three">For: All Three</option>
                <option value="Raina">For: Raina</option>
                <option value="Aparna">For: Aparna</option>
                <option value="Saayra">For: Saayra</option>
              </select>
            </div>
            <textarea
              className="upload-input"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why this song belongs to our memories..."
              rows={2}
              maxLength={500}
            />
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginTop: "0.75rem" }}>
              <button type="button" className="cancel-reply-btn" onClick={() => setShowForm(false)} style={{ color: "white" }}>
                Cancel
              </button>
              <button type="submit" className="primary-button btn-daisy">
                🎵 Add Recommendation
              </button>
            </div>
          </form>
        )}

        {/* Songs Grid */}
        {songs.length === 0 ? (
          <div className="premium-empty-state" style={{ color: "white" }}>
            <div className="premium-empty-state__icon">
              <Music size={44} style={{ color: "var(--chaos-yellow)" }} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
              The Soundtrack Is Waiting for Its Next Song
            </h3>
            <p style={{ opacity: 0.8, fontSize: "0.95rem", maxWidth: 440, marginInline: "auto" }}>
              Suggest a song that reminds you of BTS, college, or late-night talks.
            </p>
          </div>
        ) : (
          <div className="song-cards-grid">
            {songs.map((song) => (
              <div key={song.id} className={`song-recommendation-card ${song.is_added_to_playlist ? "added" : ""}`}>
                <div className="song-card-header">
                  <Music size={20} style={{ color: "var(--chaos-yellow)" }} />
                  <button
                    className={`added-badge-btn ${song.is_added_to_playlist ? "is-added" : ""}`}
                    onClick={() => togglePlaylistStatus(song.id)}
                    title="Toggle playlist status"
                  >
                    {song.is_added_to_playlist ? <Check size={14} /> : null}
                    {song.is_added_to_playlist ? "Added to Playlist" : "Mark as Added"}
                  </button>
                </div>

                <h3 className="song-title">{song.song_title}</h3>
                <p className="song-artist">by {song.artist_name}</p>

                {song.reason && <p className="song-reason">"{song.reason}"</p>}

                <div className="song-meta-footer">
                  <span className="song-author">Suggested by {song.author_name}</span>
                  {song.spotify_url && (
                    <a href={song.spotify_url} target="_blank" rel="noopener noreferrer" className="spotify-link-btn">
                      Listen on Spotify <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
