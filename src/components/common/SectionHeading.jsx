import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ label, title, subtitle, center = false, dividerColor = "var(--shared-purple)" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: center ? "center" : "left", marginBottom: "2rem" }}
    >
      {label && <span className="section-label">{label}</span>}
      <h2>{title}</h2>
      {subtitle && (
        <p style={{ opacity: 0.7, maxWidth: center ? "600px" : undefined, marginInline: center ? "auto" : undefined }}>
          {subtitle}
        </p>
      )}
      <div
        className="section-divider"
        style={{
          background: dividerColor,
          marginInline: center ? "auto" : undefined,
        }}
      />
    </motion.div>
  );
}
