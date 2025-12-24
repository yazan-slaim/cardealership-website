"use client";
import gsap from "gsap";
import React, { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowSize } from "@studio-freight/hamo";

const Parallax = ({ className, children, speed = 1, id = "parallax" }) => {
  const trigger = useRef();
  const target = useRef();
  const timeline = useRef();
  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Set the x-axis movement instead of y-axis
    const x = windowWidth * speed * -0.05;
    const setX = gsap.quickSetter(target.current, "x", "px"); // Change "y" to "x"

    timeline.current = gsap.timeline({
      scrollTrigger: {
        id: id,
        trigger: trigger.current,
        scrub: true,
        start: "left right", // Change from "top bottom" to "left right"
        end: "right left", // Change from "bottom top" to "right left"
        onUpdate: (e) => {
          setX(e.progress * x); // Adjust the x position based on scroll progress
        },
      },
    });

    return () => {
      timeline?.current?.kill();
    };
  }, [id, speed, windowWidth]);

  return (
    <div ref={trigger} className={className}>
      <div ref={target}>{children}</div>
    </div>
  );
};

export default Parallax;
