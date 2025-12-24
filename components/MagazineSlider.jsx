"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled from "@emotion/styled";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const SliderWrapper = styled.div`
  height: 100vh;
  position: relative;
  overflow: hidden;
  * {
    font-family: "TrajanPro-Regular";
  }
`;

const StyledSection = styled.div`
  background: ${(props) => `url(${props.background})`};
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  padding: 100px 0 10px 0;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  top: 0;
  left: 0;
  transform: translateX(${(props) => (props.zIndex === 0 ? "0" : "100vw")});
  overflow: hidden;
  z-index: ${(props) => props.zIndex};
  h1 {
    overflow: hidden;
    font-size: 15rem;
    line-height: 1.1;
    text-transform: uppercase;
    white-space: nowrap;
    font-family: "TrajanPro-Regular";
    span {
      opacity: 1;
      display: inline-block;
      transform: translateY(102%);
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
`;
const StyledLink = styled(Link)`
  overflow: hidden;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;

  span {
    display: inline-block;
    transform: translateY(102%);
    transition: color 0.3s ease;
    color: gray;
    &:hover {
      color: white;
    }
  }
`;

const ProgressBar = styled.div`
  width: 600px;
  height: 4px;
  border: 1px solid white;
  border-radius: 5px;
  margin-bottom: 6px;
  position: relative;
  background: rgba(255, 255, 255, 0.2);

  & > .inner-bar {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: white;
    width: 0%;
  }
`;
const LowerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;
const TextLeft = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  align-items: center;
  max-width: 100px;
  h5 {
    overflow: hidden;
    line-height: 1;
    text-transform: uppercase;
    width: 200px;
    white-space: nowrap;

    span {
      display: inline-block;
      transform: translateY(102%);
      font-size: 12px;
      hyphens: auto;
      text-justify: inter-word;
      margin-right: 5px;
      white-space: nowrap;
    }
  }
`;

const sections = [
  {
    backgroundImg:
      "https://lucidmotors.com/s3fs-public/2023-09/lucid-air-midnight-dream-edition-front-qtr.webp",
    title: "Luxury",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "1/10/1956",
    miniTitle: "Exquisite Design",
  },
  {
    backgroundImg:
      "https://lucidmotors.com/s3fs-public/2024-02/pure-stealth-front-qtr.webp",
    title: "Elegance",
    desc: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "2/15/1965",
    miniTitle: "Superior Performance",
  },
  {
    backgroundImg:
      "https://lucidmotors.com/s3fs-public/2022-04/gt-launch-pr-hero.webp",
    title: "Premium",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: "3/20/1974",
    miniTitle: "Luxury Comfort",
  },
  {
    backgroundImg:
      "https://www.topgear.com/sites/default/files/2023/10/14%20Lucid%20Air%20Sapphire.jpg",
    title: "Opulence",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "4/25/1983",
    miniTitle: "Innovative Technology",
  },
  {
    backgroundImg:
      "https://media.ed.edmunds-media.com/lucid/air-grand-touring/2022/fe/2022_lucid_air-grand-touring_front_fe_901221_1600.jpg",
    title: "Prestige",
    desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "5/30/1992",
    miniTitle: "Exclusive Service",
  },
];
const MagazineSlider = () => {
  const lastSegmentRef = useRef(0);
  const sliderWrapperRef = useRef(null);
  const scrollSectionOuterRef = useRef(null);
  const sectionRefs = useRef([]);
  const progressBarRefs = useRef([]);
  //const splitParagraph = paragraph.split(" ");

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    const sliderWrapper = sliderWrapperRef.current;
    const scrollSectionOuter = scrollSectionOuterRef.current;

    gsap.to(`#create-${0}`, {
      y: "0%",
      opacity: 1,
      duration: 1,
      delay: 0.3,

      scrollTrigger: {
        trigger: sectionRefs.current[0],
        start: "top top",
      },
    });
    gsap.to(`#slide-${0}`, {
      y: "0%",
      delay: 0.3,

      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRefs.current[0],
        start: "top top",
      },
    });
    ScrollTrigger.create({
      trigger: scrollSectionOuter,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      pin: sliderWrapper,
      onUpdate: (self) => {
        const currentSegment = Math.floor(self.progress * sections.length);
        const progressInSegment = (self.progress * sections.length) % 1;
        const progressBar = progressBarRefs.current[currentSegment];

        if (progressBar) {
          gsap.to(progressBar, {
            width: `${progressInSegment * 100}%`,
            duration: 0.1,
          });
        }

        if (currentSegment !== lastSegmentRef.current) {
          sectionRefs.current.forEach((section, index) => {
            if (index <= currentSegment) {
              gsap.to(section, {
                x: "0vw",
                duration: 0.8,
                ease: "power4.Out",
                onComplete: () => {
                  gsap.to(`#create-${index}`, {
                    y: "0%",
                    opacity: 1,
                    duration: 1,
                  });
                  gsap.to(`#slide-${index}`, {
                    y: "0%",
                    duration: 0.5,
                    stagger: 0.1,
                  });
                },
              });

              /*
              gsap.to(sectionRefs.current[index - 1], {
                x: '-100vw',
                duration: 1.2,
                ease: 'power4.Out',
              });
              */
            } else {
              gsap.to(section, {
                x: "100vw",
                duration: 1.2,
                delay: 0.5,
                ease: "power4.Out",
              });
              /*
              gsap.to(`#create-${index}`, {
                y: "102%",
                duration: 0.4,
              });
              gsap.to(`#slide-${index}`, {
                y: "102%",
                duration: 0.4,
                stagger: 0.1,
              });
                 */
            }
          });
          lastSegmentRef.current = currentSegment;
        }
      },
    });
    return () => ScrollTrigger.refresh();
  });
/*
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      ScrollTrigger.refresh();
    }, 1000);

    setTimeout(() => {
      clearInterval(refreshInterval);
    }, 10000);

    return () => clearInterval(refreshInterval);
  }, []);
  

*/  



useEffect(() => {
    progressBarRefs.current = progressBarRefs.current.slice(0, sections.length);
  }, []);
  const splitParagraphIntoLines = (text, maxLength) => {
    const words = text.split(" ");
    let lines = [];
    let currentLine = "";

    words.forEach((word) => {
      if (currentLine.length + word.length <= maxLength) {
        currentLine += word + " ";
      } else {
        lines.push(currentLine.trim());
        currentLine = word + " ";
      }
    });

    // Push the last line
    if (currentLine !== "") {
      lines.push(currentLine.trim());
    }

    return lines;
  };

  // const lines = splitParagraphIntoLines(paragraph, 25);

  return (
    <div>
      <div
        className="scroll-section-outer"
        style={{
          height: `${sections.length * 100 * 4}vh`,
          position: "relative",
        }}
        ref={scrollSectionOuterRef}
      >
        <SliderWrapper id="sliderWrapper" ref={sliderWrapperRef}>
          {sections.map((section, index) => (
            <StyledSection
              key={index}
              background={section.backgroundImg}
              zIndex={index}
              ref={(el) => (sectionRefs.current[index] = el)}
            >
              <h1>
                <span id={`create-${index}`}> {section.title}</span>
              </h1>

              <LowerContainer>
                <TextLeft>
                  <h5
                    style={{
                      width: "150px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span id={`slide-${index}`}>{section.miniTitle} </span>
                  </h5>
                  <h5
                    style={{
                      width: "150px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span id={`slide-${index}`}>{section.date} </span>
                  </h5>
                </TextLeft>
                <ProgressBar>
                  <div
                    className="inner-bar"
                    ref={(el) => (progressBarRefs.current[index] = el)}
                  />
                </ProgressBar>{" "}
                <TextLeft style={{ justifyContent: "start" }}>
                  {splitParagraphIntoLines(section.desc, 25).map(
                    (line, lineIndex) => (
                      <h5 key={lineIndex}>
                        <span key={lineIndex} id={`slide-${index}`}>
                          {line}
                        </span>
                      </h5>
                    )
                  )}

                  {/*splitParagraph.map((line, lineIndex) => (
                    <h5 key={lineIndex}>
                      <span key={lineIndex} id={`slide-${index}`}>
                        {line}
                      </span>
                    </h5>
                  ))*/}

                  <StyledLink href={""}>
                    <span id={`slide-${index}`}>INSTAGRAM {">"}</span>
                  </StyledLink>
                </TextLeft>
              </LowerContainer>
            </StyledSection>
          ))}
        </SliderWrapper>
      </div>
    </div>
  );
};

export default MagazineSlider;
