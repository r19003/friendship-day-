import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { btsSongDedications } from "../../data/sharedData";

export default function BTSSongs() {
  return (
    <section className="bts-songs-section">
      <div className="content-container">
        <SectionHeading
          label="Songs"
          title="Songs That Are Ours"
          center
          dividerColor="var(--shared-purple)"
        />
        <div className="songs-grid">
          {btsSongDedications.map((song, i) => (
            <motion.div
              key={i}
              className="song-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className="song-card-emoji" aria-hidden="true">{song.emoji}</span>
              <div className="song-card-for">{song.forWhom}</div>
              <h3 className="song-card-name">"{song.song}"</h3>
              <p className="song-card-reason">{song.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
