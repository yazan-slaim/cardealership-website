"use client";
import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
  padding: 100px 0px;
  width: 100vw;
  position: relative;
  background: black;
  flex-wrap: wrap;
`;

const Rectangle = styled.div`
  width: 400px;
  height: 600px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: width 0.5s ease;
  display: flex;
  justify-content: end;
  align-items: center;

  h1 {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    left: 20px;
    font-size: 5rem;
    span {
      display: inline-block;
      transform: translateY(100%);
    }
  }
`;

const ParagraphContainer = styled.div`
  width: 300px;
  overflow: hidden;
  margin-right: 25px;
  h2 {
    transform: translateX(-100%);
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 5px;
    text-align: justify;
  }
  p {
    display: inline-block;
    text-align: justify;
    width: 100%;
    transform: translateX(-100%);
  }
  z-index: 2;
`;

export default function TechSlider(data) {

  console.log("this is tech slider ",data.data)
  const sectionRef = useRef(null);
  const motionDivRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [rectangles, setRectangles] = useState([]);
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

 /* // Demo data
  const data = [
    {
      title: "AI",
      description: "Artificial Intelligence is reshaping the world with automation, smart insights, and predictive technologies.",
      image: "https://i.pinimg.com/736x/de/d8/b9/ded8b9d2598b4d78f396a4b36669975d.jpg"
    },
    {
      title: "VR",
      description: "Virtual Reality offers immersive experiences, transforming how we learn, play, and interact.",
      image: "https://i.pinimg.com/1200x/39/e0/31/39e0315a7614e64866f7ef04099a6a03.jpg"
    },
    {
      title: "Robotics",
      description: "Robotics is powering innovation in manufacturing, healthcare, and even households with smart automation.",
      image: "https://i.pinimg.com/1200x/b3/7e/8b/b37e8bf7b7632ecbc45914d4ad9168f1.jpg"
    }
  ];
*/
  useEffect(() => {
    const rects = document.querySelectorAll(".rectangle");
    setRectangles(rects);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const expandRectangle = (index) => {
    if (!rectangles.length) return;

    if (index === expandedIndex) {
      gsap.to(rectangles, { width: "300px", ease: "power4.inOut" });
      tl.to("#create", { y: "100%", ease: "power2.inOut" })
        .to("#par", { x: "-100%", ease: "power2.inOut" });
    } else {
      rectangles.forEach((rect, i) => {
        if (i === index) {
          gsap.to(rect, {
            width: "100vw",
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              tl.to("#create", { y: "0%", duration: 1, delay: 0.2 });
              tl.to("#par", { x: "0%", duration: 1 });
            },
          });
        } else {
          gsap.to(rect, { width: "0", duration: 0.5, ease: "power2.inOut" });
        }
      });
    }

    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Container>
      {data.data.map((item, index) => (
        <Rectangle
          key={index}
          className="rectangle"
          onClick={() => expandRectangle(index)}
          ref={sectionRef}
        >
          <motion.div
            ref={motionDivRef}
            style={{
              top: y,
              height: "100%",
              left: "0",
              position: "absolute",
              width: "100%",
              zIndex: "1",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          <h1 style={{ zIndex: "2" }}>
            <span id="create">{item.title}</span>
          </h1>
          <ParagraphContainer style={{ zIndex: "2" }}>
            <div>
              <p id="par">{item.description}</p>
            </div>
          </ParagraphContainer>
        </Rectangle>
      ))}
    </Container>
  );
}
