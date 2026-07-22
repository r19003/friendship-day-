import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { springCards } from "../../data/aparnaData";

const bgColors = { sky: "linear-gradient(135deg,#e8f6ff,#cce8f5)", grass: "linear-gradient(135deg,#e8f5e0,#ccddb7)", flowers: "linear-gradient(135deg,#fff0f5,#f4cddd)", sunlight: "linear-gradient(135deg,#fffae0,#fff0ac)" };

export default function SpringDaySection() {
  const [expanded, setExpanded] = useState(null);
  return (
    <section className="spring-section">
      <div className="content-container">
        <SectionHeading label="Who You Are" title="You Feel Like a Warm Spring Day" dividerColor="var(--daisy-blue-deep)" />
        <div className="spring-landscape" aria-hidden="true">
          <div className="spring-sky" />
          <div className="spring-grass-bottom" />
          <div className="spring-sun" />
          <span style={{ position:"absolute",bottom:"12px",left:"20px",fontSize:"1.5rem" }}>🌼</span>
          <span style={{ position:"absolute",bottom:"18px",left:"60px",fontSize:"1.2rem" }}>🌿</span>
          <span style={{ position:"absolute",bottom:"10px",right:"30px",fontSize:"1.4rem" }}>🌸</span>
          <span style={{ position:"absolute",top:"24px",left:"40px",fontSize:"1.1rem" }}>☁️</span>
        </div>
        <div className="spring-cards-grid" role="list">
          {springCards.map((card, i) => (
            <motion.div key={card.id} className={`spring-card ${card.color}`} role="listitem" tabIndex={0} onClick={() => setExpanded(expanded === card.id ? null : card.id)} onKeyDown={(e) => { if (e.key==="Enter"||e.key===" ") { e.preventDefault(); setExpanded(expanded===card.id?null:card.id); }}} aria-expanded={expanded===card.id} initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*0.12 }} style={{ background:bgColors[card.color] }}>
              <span className="spring-card-emoji" aria-hidden="true">{card.emoji}</span>
              <h3 className="spring-card-title">{card.title}</h3>
              <p className="spring-card-desc">{card.desc}</p>
              <AnimatePresence>{expanded===card.id && <motion.p className="spring-card-expanded" initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} transition={{duration:0.35}}>{card.expanded}</motion.p>}</AnimatePresence>
            </motion.div>
          ))}
        </div>
        <motion.p style={{ textAlign:"center",marginTop:"2.5rem",fontStyle:"italic",color:"var(--daisy-muted)" }} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>Honestly, I have rarely met someone with a nature as welcoming as yours.</motion.p>
      </div>
    </section>
  );
}
