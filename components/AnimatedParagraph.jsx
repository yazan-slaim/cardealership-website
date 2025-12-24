"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styled from "@emotion/styled";
import { useGSAP } from "@gsap/react";

const Line = styled.div`
  font-size: 25px;
  text-transform: uppercase;
  color: #fffded;
`;

const Word = styled.span`
  margin-right: 5px;
  display: inline-block;
  transform: translateY(100%);
  opacity: 0;
  color: #fffded;
`;

export default function AnimatedParagraph({ paragraph, passedref }) {
  const splitParagraph = paragraph.split("\n").map((line) => line.split(" "));

  useGSAP(
    () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: passedref.current,
          start: "top center",
        },
      });

      splitParagraph.forEach((line, lineIndex) => {
        tl.fromTo(
          `.line`,
          { y: 40 },
          {
            y: 0,
            stagger: 0.1,
            duration: 0.4,
          }
        );

        line.forEach((word, wordIndex) => {
          tl.fromTo(
            `.word`,
            { opacity: 0, y: 20, color: "grey" },
            {
              opacity: 1,
              y: 0,
              color: "#fffded",
              stagger: 0.03,
              duration: 0.4,
            },
            "<"
          );
        });
      });
    },
    { scope: passedref }
  );

  return (
    <div ref={passedref}>
      {splitParagraph.map((line, lineIndex) => (
        <Line key={lineIndex} id={line} className="line">
          {line.map((word, wordIndex) => (
            <Word key={wordIndex} id={word} className="word">
              {word}
            </Word>
          ))}
        </Line>
      ))}
    </div>
  );
}
