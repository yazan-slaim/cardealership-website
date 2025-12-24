"use client";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Wrapper = styled.div`
  height: 700vh; /* 200vh for the wrapper + 500vh for the slider */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.image});
`;

const slides = [
  "https://lucidmotors.com/s3fs-public/2022-04/gt-launch-pr-hero.webp",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXDXLeWAIYp6uQYagatSIjUAvqshaPMkHISQ&s",
  "https://www.motortrend.com/uploads/sites/5/2021/08/2022-Lucid-Air-Dream-Edition-R-Driving-Front-34.jpg",
  "https://lucidmotors.com/s3fs-public/2023-08/lucid-air-sapphire-side.webp",
  "https://lucidmotors.com/s3fs-public/2024-02/pure-stealth-front-qtr.webp",
];

const DemoMagazine = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const slider = sliderRef.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slider,
          start: "top top",
          end: "+=500vh",
          pin: true,
          scrub: true,
        },
      });

      slides.forEach((_, i) => {
        if (i === slides.length - 1) return; // No animation for the last slide
        tl.fromTo(
          `#slide-${i + 1}`,
          { xPercent: 100 },
          { xPercent: 0 },
          `+=${i === 0 ? 0 : 1}`
        );
      });
    }
  }, []);

  return (
    <Wrapper>
      <Slider ref={sliderRef}>
        {slides.map((image, index) => (
          <Slide key={index} id={`slide-${index + 1}`} image={image} />
        ))}
      </Slider>
    </Wrapper>
  );
};

export default DemoMagazine;
