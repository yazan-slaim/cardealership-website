"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
const Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  position: relative;
  background: black;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    background: rgba(0, 0, 0, 0.4);
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 100px;
    z-index: 4;
    pointer-events: none;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent);
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 3;
    object-fit: cover;
    opacity: 0; /* Start with video hidden */
  }
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100vw;
  z-index: 5;
  font-family: "TrajanPro-Regular";
  gap: 25px;

  h2 {
    font-size: 1.1rem;
    font-family: "TrajanPro-Regular";
    letter-spacing: 0.05em;
    color: #ededed;
    opacity: 0; /* Start with text hidden */
  }

  h1 {
    font-size: 4rem;
    margin-bottom: 1.3rem;
    letter-spacing: 0.1em;
    color: #ffffff;
    opacity: 0; /* Start with text hidden */
  }
`;

const StyledLink = styled(Link)`
  padding: 12px 20px;
  background: transparent;
  color: white;
  border-radius: 30px;
  width: auto;
  text-transform: uppercase;
  font-size: 1rem;
  border: 2px solid white;
  box-sizing: border-box;
  transition: all ease-in-out 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
`;

export default function FirstSlide() {
  const section = useRef();
  useGSAP(
    () => {
      gsap.to("video", {
        opacity: 1,
        duration: 3,
        delay: 0.5,
        ease: "power1.inOut",
      });

      gsap.fromTo(
        "h2",
        { opacity: 0, y: 50 }, // Start from hidden and below
        { opacity: 1, y: 0, duration: 2, delay: 0.5, ease: "power1.out" } // Fade in and move up
      );

      gsap.fromTo(
        "h1",
        { opacity: 0, y: 50 }, // Start from hidden and below
        { opacity: 1, y: 0, duration: 2, delay: 0.5, ease: "power1.out" } // Fade in and move up
      );
    },
    { scope: section }
  );

  return (
    <Section ref={section}>
      <video autoPlay loop muted playsInline>
        <source src="/videos/videoplayback.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <CenterContainer>
        <h2>luxury car service represents</h2>
        <h1>EXPLORE ELEGANCE</h1>
      </CenterContainer>
    </Section>
  );
}
