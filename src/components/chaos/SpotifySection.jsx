import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { friendshipMusic } from "../../data/btsData";
import { getSpotifyEmbedUrl } from "../../lib/spotifyHelpers";
import { fadeUp, viewportOnce } from "../../lib/motionVariants";

export default function SpotifySection() {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);

  const playlistUrl = friendshipMusic.spotifyPlaylistUrl || friendshipMusic.spotifyEmbedUrl || "";
  const embedUrl = getSpotifyEmbedUrl(playlistUrl);

  useEffect(() => {
    if (!embedUrl) {
      setLoading(false);
    }
  }, [embedUrl]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setHasError(true);
  };

  return (
    <section id="spotify-section" className="spotify-memory-section">
      <div className="content-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", maxWidth: 760, marginInline: "auto" }}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {/* Connected beads & emblems */}
            <div className="spotify-emblems-header" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
              <span className="spotify-emblem-badge" title="Daisy Detail">🌼</span>
              <span style={{ opacity: 0.6, fontSize: "0.9rem" }}>📿</span>
              <span className="spotify-emblem-badge" title="BTS ARMY Logo">💜</span>
              <span style={{ opacity: 0.6, fontSize: "0.9rem" }}>📿</span>
              <span className="spotify-emblem-badge" title="Sunshine Detail">☀️</span>
            </div>

            {/* Seven stars */}
            <div style={{ fontSize: "1rem", letterSpacing: "0.3em", marginBottom: "0.75rem", color: "var(--chaos-yellow)" }}>
              ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐
            </div>

            <span className="section-kicker" style={{ color: "var(--chaos-lavender)", justifyContent: "center" }}>
              🎵 Shared Playlist
            </span>
            <h2 className="section-title" style={{ color: "white", marginBottom: "0.75rem" }}>
              Our Friendship Soundtrack
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "0.5rem", fontWeight: 600 }}>
              {friendshipMusic.description || "The songs behind our BTS excitement, college memories, late-night conversations, comfort days, food runs, trip plans, and every version of us."}
            </p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", fontStyle: "italic" }}>
              Some memories have photographs. Some have inside jokes. And some begin playing again the moment a song starts.
            </p>
          </motion.div>
        </div>

        {/* Frame / Embed container */}
        <motion.div
          className="spotify-memory-frame"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Handwritten top note */}
          <div className="spotify-frame-note">
            <span>✍️ Pinned to our shared universe</span>
          </div>

          {!embedUrl ? (
            /* Empty State */
            <div className="spotify-empty-state">
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>📻</div>
              <h3 style={{ color: "white", fontSize: "1.8rem", marginBottom: "0.5rem" }}>
                Our Playlist Will Live Here
              </h3>
              <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: 460, margin: "0 auto 1.5rem", fontSize: "0.95rem" }}>
                Add the Spotify playlist link inside <code style={{ color: "var(--chaos-yellow)", background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: 4 }}>btsData.js</code> to bring the soundtrack of this friendship into the website.
              </p>
              <button
                className="glow-button"
                onClick={() => setShowSetupModal(!showSetupModal)}
              >
                📋 Open Spotify Setup Guide
              </button>

              {showSetupModal && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: "1.5rem", padding: "1.25rem", background: "rgba(255,255,255,0.06)", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,0.15)", textAlign: "left" }}
                >
                  <strong style={{ color: "var(--chaos-yellow)", display: "block", marginBottom: "0.5rem" }}>
                    Quick Setup Instructions:
                  </strong>
                  <ol style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.8)", paddingLeft: "1.2rem", lineHeight: 1.6 }}>
                    <li>Open your Spotify playlist → Click "Share" → "Copy link to playlist".</li>
                    <li>Open file <code style={{ color: "var(--chaos-yellow)" }}>src/data/btsData.js</code>.</li>
                    <li>Paste URL into <code style={{ color: "var(--chaos-yellow)" }}>spotifyPlaylistUrl</code>.</li>
                    <li>Save the file — the soundtrack will appear here automatically!</li>
                  </ol>
                </motion.div>
              )}
            </div>
          ) : hasError ? (
            /* Error State */
            <div className="spotify-error-state">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎵</div>
              <h3 style={{ color: "white", fontSize: "1.6rem", marginBottom: "0.5rem" }}>
                The Music Took a Short Break
              </h3>
              <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: 440, margin: "0 auto 1.5rem", fontSize: "0.95rem" }}>
                The playlist could not load inside the page, but it can still be opened directly on Spotify.
              </p>
              <a
                href={playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-button"
                style={{ display: "inline-flex", textDecoration: "none" }}
              >
                🎧 Open Our Playlist on Spotify
              </a>
            </div>
          ) : (
            /* Normal Embedded Player */
            <div className="spotify-iframe-wrapper" style={{ position: "relative" }}>
              <AnimatePresence>
                {loading && (
                  <motion.div
                    className="spotify-loading-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="spotify-loading-record">💿</div>
                    <div className="spotify-loading-stars">
                      ⭐⭐⭐⭐⭐⭐⭐
                    </div>
                    <div className="spotify-loading-text">
                      Loading our friendship soundtrack<span className="dots">…</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <iframe
                title="Our Friendship Soundtrack Spotify Playlist"
                src={embedUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              />
            </div>
          )}

          {/* Footer bar inside frame */}
          <div className="spotify-frame-footer">
            <a
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-direct-link"
            >
              🎧 Open on Spotify ↗
            </a>
            <span className="spotify-frame-tag">💜 Army &amp; Trio Soundtrack</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
