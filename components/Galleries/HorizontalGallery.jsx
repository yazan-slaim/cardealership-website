"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styled from "@emotion/styled";
const Slider = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const SliderWrapper = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  gap: 100px;
  padding: 0 600px;
  height: 100%;
  align-items: center;

  /* width expands automatically based on slides */
`;

const Slide = styled.div`
  width: 400px;
  height: 500px;
  background: white;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function HorizontalGallery({ imageCount = 160 }) {
  const wrapperRef = useRef(null);
  const slidesRef = useRef([]);

  // Generate same images as circular gallery
  const images = Array.from({ length: imageCount }, (_, i) => `/assets/img (${i + 1}).jpg`);

  useEffect(() => {
    let target = 0;
    let current = 0;
    const ease = 0.075;

    const wrapper = wrapperRef.current;
    const slides = slidesRef.current;

    let maxScroll = wrapper.scrollWidth - window.innerWidth;

    const lerp = (start, end, t) => start + (end - start) * t;

    function updateScaleAndPosition() {
      slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = center - window.innerWidth / 2;

        let scale, offsetX;

        if (distance > 0) {
          scale = Math.min(1.75, 1 + distance / window.innerWidth);
          offsetX = (scale - 1) * 300;
        } else {
          scale = Math.max(0.5, 1 - Math.abs(distance) / window.innerWidth);
          offsetX = 0;
        }

        gsap.set(slide, { scale, x: offsetX });
      });
    }

    function animate() {
      current = lerp(current, target, ease);

      gsap.set(wrapper, { x: -current });

      updateScaleAndPosition();

      requestAnimationFrame(animate);
    }

    window.addEventListener("wheel", (e) => {
      target += e.deltaY;
      target = Math.max(0, Math.min(maxScroll, target));
    });

    window.addEventListener("resize", () => {
      maxScroll = wrapper.scrollWidth - window.innerWidth;
    });

    animate();
  }, []);

  return (
    <Slider>
      <SliderWrapper ref={wrapperRef}>
        {images.map((src, i) => (
          <Slide
            key={i}
            ref={(el) => (slidesRef.current[i] = el)}
          >
            <img src={src} alt="" />
          </Slide>
        ))}
      </SliderWrapper>
    </Slider>
  );
}
