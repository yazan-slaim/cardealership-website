"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styled from "@emotion/styled";

const Cursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  border: 2px solid white;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 10000000000000;
  mix-blend-mode: difference;
  cursor: none;
  transition: background-color 0.3s ease, border-radius 0.3s ease,
    width 0.3s ease, height 0.3s ease, opacity 0.3s ease;

  @keyframes fadeInText {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }



  &.hovering-button {
    background-color: transparent;
    border: 2px solid white;
    width: 35px;
    height: 35px;
    animation: pulse 1s infinite ease-in-out;
  }

  &.hovering-add-note {
    width: 0px;
    height: 0px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000002;
    white-space: nowrap;

    &::after {
      content: "Add a note";
      font-size: 1.5rem;
      font-family: "TrajanPro-Regular";
      color: white;
      opacity: 0;
      animation: fadeInText 0.5s ease-in-out forwards;
    }
  }

  &.hidden {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
`;

const GptCustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Smooth cursor movement
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power3.out",
      });
    };

    // Event delegation — single listener on document.body instead of per-element
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Check for add-a-note-box
      if (target.closest(".add-a-note-box")) {
        cursor.classList.add("hovering-add-note");
        cursor.style.width = "0px";
        cursor.style.height = "0px";
        cursor.innerHTML = "";
        return;
      }

      // Check for interactive elements (buttons, links, rectangles)
      if (target.closest("button, a, .rectangle")) {
        cursor.classList.add("hovering-button");
        return;
      }


    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      if (target.closest(".add-a-note-box")) {
        cursor.classList.remove("hovering-add-note");
        gsap.to(cursor, {
          opacity: 1,
          width: "15px",
          height: "15px",
          duration: 0.3,
          ease: "power3.out",
        });
        return;
      }

      if (target.closest("button, a, .rectangle")) {
        cursor.classList.remove("hovering-button");
        cursor.innerHTML = "";
        return;
      }


    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <Cursor ref={cursorRef} />;
};

export default GptCustomCursor;
