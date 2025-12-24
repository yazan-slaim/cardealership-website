"use client";
import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import ImageList from "./ImageList";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CenteredImage = styled.img`
  position: absolute;
`;

export default function ImageGallery() {
  const h1Ref = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const h1Element = h1Ref.current;
    const mainElement = mainRef.current;

    if (h1Element && mainElement) {
      gsap.to(h1Element, {
        opacity: 1,
        scrollTrigger: {
          trigger: mainElement,
          start: "top top+=2000",
          scrub: 0.1,
        },
      });
    }
  }, []);

  return (
    <main
      ref={mainRef}
      className={"p-25 flex flex-col w-full items-center justify-center"}
      style={{ background: "#f5f5f0", zIndex: 2 }}
    >
      <h1
        ref={h1Ref}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: 0,
          opacity: 0,
          fontSize: "6rem",
          whiteSpace: "nowrap",
        }}
      ></h1>
      <ImageList />
    </main>
  );
}
