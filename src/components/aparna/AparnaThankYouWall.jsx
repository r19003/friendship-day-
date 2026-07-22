import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { aparnaThankYouNotes } from "../../data/aparnaData";

const rotations = [-2,1.5,-1,2,-1.5,1,-2,1.5,-1,2,-1.5,1,-2,1.5,-1,2];

export default function AparnaThankYouWall() {
  return (
    <section className="thankyou-wall-section">
      <div className="content-container">
        <SectionHeading label="Gratitude" title="Thank You for Every Version of Us" center dividerColor="var(--daisy-blue-deep)" />
        <div className="thankyou-grid" role="list">
          {aparnaThankYouNotes.map((note,i)=>(
            <motion.div key={i} className="thankyou-note" role="listitem" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-40px"}} transition={{delay:(i%4)*0.08}} style={{background:note.color,transform:`rotate(${rotations[i%rotations.length]}deg)`}}>{note.text}</motion.div>
          ))}
        </div>
        <motion.p className="thankyou-final" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>There are too many thank-yous for one page, but every one of them means the same thing: I am grateful that you exist in my life.</motion.p>
      </div>
    </section>
  );
}
