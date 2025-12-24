"use client";
import gsap from "gsap";
import React, { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowSize } from "@studio-freight/hamo";
const ImageParallax = ({ className, children, speed, id = "parallax" }) => {
  const trigger = useRef();
  const target = useRef();
  const timeline = useRef();
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const y =
      windowHeight * speed * 0.1 < 0 && speed > 0
        ? 0
        : windowHeight * speed * 0.1;
    const setY = gsap.quickSetter(target.current, "y", "px");
    timeline.current = gsap.timeline({
      scrollTrigger: {
        id: id,
        trigger: trigger.current,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (e) => {
          setY(e.progress * y);
        },
      },
    });

    return () => {
      timeline?.current?.kill();
    };
  }, [id, speed, windowWidth]);

  return (
    <div ref={trigger} className={"flex flex-row"}>
      <div ref={target} style={{ display: "flex" }}>
        {children}
      </div>
    </div>
  );
};

export default ImageParallax;
