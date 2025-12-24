"use client";
import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

gsap.registerPlugin(ScrollTrigger);

const GalleryContainer = styled.div`
  width: 100vw;
  height: 650vh;
  position: relative;
  background: #241e1b;
`;

const TitleWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
`;

const Title = styled.h1`
  font-size: 10rem;
  color: white;
`;

export default function FinalTemplateForGallery() {
  const galleryRef = useRef(null);
  const titleWrapperRef = useRef(null);

  useGSAP(() => {
    const gallery = galleryRef.current;
    const titleWrapper = titleWrapperRef.current;

    gsap.to(titleWrapper, {
      scrollTrigger: {
        trigger: gallery,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        scrub: true,
        markers: true, // For debugging
      },
    });
  });

  return (
    <GalleryContainer ref={galleryRef}>
      <TitleWrapper ref={titleWrapperRef}>
        <Title>GALLERY</Title>
      </TitleWrapper>
    </GalleryContainer>
  );
}
