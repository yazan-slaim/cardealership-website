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

  * {
    cursor: none;
  }

  @keyframes fadeInText {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &.hovering-text {
    width: 5px;
    height: 20px;
    border-radius: 25px;
    cursor: none;
  }

  &.hovering-button {
    background-color: transparent;
    border: 2px solid white;
    width: 35px;
    height: 35px;
    animation: pulse 1s infinite ease-in-out;
    cursor: none;
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
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power3.out",
      });
    };

    const handleTextHover = () => {
      cursor.classList.add("hovering-text");
    };

    const handleTextHoverOut = () => {
      cursor.classList.remove("hovering-text");
    };

    const handleButtonHover = () => {
      cursor.classList.add("hovering-button");
    };

    const handleButtonHoverOut = () => {
      cursor.classList.remove("hovering-button");
      cursor.innerHTML = "";
    };

    const handleAddNoteHover = () => {
      cursor.classList.add("hovering-add-note");
      cursor.style.width = "0px";
      cursor.style.height = "0px";
      cursor.innerHTML = "";
    };

    const handleAddNoteHoverOut = () => {
      cursor.classList.remove("hovering-add-note");
      gsap.to(cursor, {
        opacity: 1,
        width: "15px",
        height: "15px",
        duration: 0.3,
        ease: "power3.out",
      });
    };

    document.addEventListener("mousemove", moveCursor);

    document.querySelectorAll("button, a").forEach((el) => {
      el.addEventListener("mouseenter", handleButtonHover);
      el.addEventListener("mouseleave", handleButtonHoverOut);
    });

    document.querySelectorAll("h1, h2, h3, p").forEach((text) => {
      text.addEventListener("mouseenter", handleTextHover);
      text.addEventListener("mouseleave", handleTextHoverOut);
    });

    document.querySelectorAll(".add-a-note-box").forEach((box) => {
      box.addEventListener("mouseenter", handleAddNoteHover);
      box.addEventListener("mouseleave", handleAddNoteHoverOut);
    });
    document.querySelectorAll(".rectangle").forEach((rect) => {
  rect.addEventListener("mouseenter", handleButtonHover);
  rect.addEventListener("mouseleave", handleButtonHoverOut);
});


    return () => {
      document.removeEventListener("mousemove", moveCursor);

      document.querySelectorAll("button, a").forEach((el) => {
        el.removeEventListener("mouseenter", handleButtonHover);
        el.removeEventListener("mouseleave", handleButtonHoverOut);
      });

      document.querySelectorAll("h1, h2, h3, p").forEach((text) => {
        text.removeEventListener("mouseenter", handleTextHover);
        text.removeEventListener("mouseleave", handleTextHoverOut);
      });

      document.querySelectorAll(".add-a-note-box").forEach((box) => {
        box.removeEventListener("mouseenter", handleAddNoteHover);
        box.removeEventListener("mouseleave", handleAddNoteHoverOut);
      });
      document.querySelectorAll(".rectangle").forEach((rect) => {
  rect.removeEventListener("mouseenter", handleButtonHover);
  rect.removeEventListener("mouseleave", handleButtonHoverOut);
});

    };
  }, []);

  return <Cursor ref={cursorRef} />;
};

export default GptCustomCursor;
