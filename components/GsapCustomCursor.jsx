"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import gsap from "gsap";

const CursorCircle = styled.div`
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: ${(props) =>
    props.size === "small" ? "5px" : props.size === "text" ? "4px" : "10px"};
  height: ${(props) =>
    props.size === "small" ? "5px" : props.size === "text" ? "20px" : "10px"};
  border-radius: ${(props) => (props.size === "text" ? "20px" : "50%")};
  background-color: ${(props) => (props.$display ? "transparent" : "white")};
  mix-blend-mode: ${(props) => (props.$display ? "normal" : "difference")};

  ${(props) =>
    props.clicked &&
    !props.$display &&
    `
    background-color: rgba(255, 255, 255, 0.509);
`}
`;

const CurvedText = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  transform-origin: center;
  transform-style: preserve-3d;
  color: white;
  isolation: isolate;
  opacity: ${(props) => (props.$display ? "1" : "0")};

  transition: opacity 0.5s ease;
`;

const TextSegment = styled.div`
  position: absolute;
  font-size: 2.5px;
  color: white;
`;

const GsapCustomCursor = () => {
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState("small");
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const text = "next slide-next slide-";
  const characters = text.split("");
  const angleIncrement = 16;

  useEffect(() => {
    const cursor = cursorRef.current;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 100);
    };

    const updateCursorSize = (e) => {
      const element = e.target;
      const tagName = element.tagName.toLowerCase();
      const classNames = element.className || "";
      setIsTextVisible(classNames.includes && classNames.includes("bye"));

      if (
        tagName === "button" ||
        element.closest("a, .next-link") ||
        tagName === "input"
      ) {
        setSize("large");
      } else if (["h1", "h2", "h3", "p", "span", "input"].includes(tagName)) {
        setSize("text");
      } else {
        setSize("small");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseover", updateCursorSize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseover", updateCursorSize);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (isTextVisible) {
      gsap.to(cursor, { rotation: 360, repeat: -1, duration: 10 });
    } else {
      gsap.killTweensOf(cursor);
      gsap.set(cursor, { rotation: 0 });
    }
  }, [isTextVisible]);

  useEffect(() => {
    const cursor = cursorRef.current;

    gsap.to(cursor, {
      left: position.x,
      top: position.y,
      duration: 0.1,
      ease: "power2.inOut",
    });
  }, [position.x, position.y]);

  return (
    <CursorCircle
      ref={cursorRef}
      size={size}
      $display={isTextVisible}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      clicked={clicked}
    >
      <CurvedText $display={isTextVisible}>
        {characters.map((char, index) => (
          <TextSegment
            key={index}
            style={{
              transform: `rotate(${
                index * angleIncrement
              }deg) translateX(10px) rotate(${-index * angleIncrement}deg)`,
            }}
          >
            {char}
          </TextSegment>
        ))}
      </CurvedText>
    </CursorCircle>
  );
};

export default GsapCustomCursor;
