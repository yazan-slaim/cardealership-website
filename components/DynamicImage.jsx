import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const Section = ({ image, tag, title, description }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-[200px] h-[350px] overflow-hidden mb-52"
    >
      <motion.div className="absolute w-full h-[120%] -z-10" style={{ top: y }}>
        <div className="absolute inset-0 bg-black/30 z-10 w-[200px] h-[350px]" />
        <img src={image} alt="Overview" fill className="object-cover" />
      </motion.div>
    </section>
  );
};

export default Section;
