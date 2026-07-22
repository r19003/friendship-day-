import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { nb107Copy, nb107BtsFeed } from "../../data/saayraData";

export default function NB107Story() {
  return (
    <section id="nb107" className="nb107-section">
      <div className="content-container">
        <div className="nb107-inner">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="nb107-corridor" aria-label="College corridor near NB-107">
              <div className="nb107-arch" aria-hidden="true" />
              <div className="nb107-tag">NB-107</div>
              <div className="nb107-date-card">
                <span className="nb107-date-label">21 August 2023</span>
                <span className="nb107-loc-label">📍 Near NB-107</span>
              </div>
              <div className="nb107-thread-line" aria-hidden="true" />
              <div className="nb107-bts-feed" aria-label="BTS fan community style feed">
                <div className="nb107-bts-feed-header">Fan Timeline ✦ ARMY</div>
                {nb107BtsFeed.map((post, i) => <div key={i} className="nb107-bts-post">{post.text}</div>)}
                <div className="nb107-wallpaper">
                  <div className="nb107-wallpaper-img" aria-hidden="true">💜</div>
                  <span className="nb107-wallpaper-text">That wallpaper. The start of everything.</span>
                </div>
              </div>
            </div>
          </motion.div>
          <div>
            <SectionHeading label="21 August 2023" title="The Girl I Met Near NB-107" dividerColor="var(--sunshine-purple)" />
            {nb107Copy.map((para, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
