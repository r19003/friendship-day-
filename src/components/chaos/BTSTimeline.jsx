import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { btsTimelineEvents } from "../../data/sharedData";

export default function BTSTimeline() {
  return (
    <section id="bts-timeline" className="bts-section">
      <div className="content-container">
        <SectionHeading
          label="The BTS Connection"
          title="How BTS Connected Us"
          subtitle="Three ARMYs. Three cities. Two friendships. One purple heart."
          center
          dividerColor="var(--shared-purple)"
        />

        <div className="bts-timeline-wrapper">
          <div className="bts-timeline-line" aria-hidden="true" />
          {btsTimelineEvents.map((event, i) => (
            <motion.div
              key={i}
              className={`bts-timeline-item ${event.side}`}
              initial={{ opacity: 0, x: event.side === "left" ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bts-timeline-dot" aria-hidden="true">💜</div>
              <div className="bts-timeline-card">
                <span className="bts-timeline-date">{event.date}</span>
                <h3 className="bts-timeline-title">{event.title}</h3>
                <p className="bts-timeline-desc">{event.desc}</p>
                <span className="bts-timeline-tag">{event.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
