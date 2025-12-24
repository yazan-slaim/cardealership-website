"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function HorizontalScrollSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-200vw",
        ease: "none",
        duration: 3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          pin: true,
          markers: true,
          onUpdate: ScrollTrigger.refresh,
        },
      }
    );
  });

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      ScrollTrigger.refresh();
    }, 1000);

    setTimeout(() => {
      clearInterval(refreshInterval);
    }, 10000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <section className="scroll-section-outer" style={{ overflow: "hidden" }}>
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="scroll-section-inner"
          style={{
            height: "100vh",
            width: "300vw",
            display: "flex",
            flexDirection: "row",
            position: "relative",
            background: " #F5F5F0",
          }}
        >
          <div
            style={{ width: "100vw", height: "100vh", background: "#FF474D" }}
          />
          <div
            style={{ width: "100vw", height: "100vh", background: "#8AC7DB" }}
          />
          <div
            style={{ width: "100vw", height: "100vh", background: "#8AFF8A" }}
          />
        </div>
      </div>
    </section>
  );
}
