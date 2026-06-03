"use client";

import React, { useLayoutEffect, useRef } from "react";
import styled from "@emotion/styled";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* =========================
   STYLED COMPONENTS
   ========================= */

const ParentGalleryWrapper = styled.div`
  padding: 95px 50px 50px 0;

  display: inline-block;
`;

const GalleryWrapper = styled.div`
  position: relative;
  width: 700px;
  height: 100vh;
`;

const ImageFrame = styled.div`
  position: absolute;
  overflow: hidden;
`;

const ImageInner = styled.div`
  width: 140%; /* Increased for better parallax range */
  height: 100%;
  background-size: cover;
  background-position: center;
  will-change: transform;
`;

export default function ChaosGalleryOne({ passedcontainerAnimation }) {
  const wrapperRef = useRef(null);
  const demoImageRef = useRef(null);
  console.log("this is container animation returned", passedcontainerAnimation);
  /*
  useGSAP(() => {
    const horizontalTween = gsap.to("#horizontal-track", {
      x: () =>
        -(
          document.querySelector("#horizontal-track").scrollWidth -
          window.innerWidth
        ),
      ease: "none",
      scrollTrigger: {
        id: "horizontalScroll",
        trigger: "#horizontal-track",
        start: "top top",
        end: () =>
          `+=${document.querySelector("#horizontal-track").scrollWidth - window.innerWidth}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        markers: true,
      },
    });

    horizontalTweenRef.current = horizontalTween;
  }, []);
  */
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const isRtl = typeof document !== 'undefined' && document.documentElement.dir === 'rtl';
      gsap.fromTo(
        demoImageRef.current,
        { x: isRtl ? 50 : -50 },
        {
          x: isRtl ? -50 : 50,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: isRtl ? "right center" : "left center",
            end: isRtl ? "left center" : "right center",
            scrub: true,
            markers: true,
            horizontal: true,
            containerAnimation: passedcontainerAnimation,
          },
        },
      );
    });

    return () => ctx.revert();
  });

  return (
    <ParentGalleryWrapper ref={wrapperRef}>
      <GalleryWrapper>
        {/* LEFT IMAGE */}
        <img
          ref={demoImageRef}
          style={{
            top: "0%",
            left: "0%",
            width: "260px",
            height: "360px",
            position: "absolute",
            objectFit: "cover",
            zIndex: 2,
          }}
          src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1600&q=80"
          alt="Gallery piece"
        />

        {/* CENTER OVERLAP IMAGE */}
        <img
          style={{
            top: "280px",
            left: "240px",
            width: "240px",
            height: "200px",
            position: "absolute",
            zIndex: 5,
          }}
          src="https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=1600&q=80"
          strength={20}
        />

        {/* RIGHT IMAGE */}
        <img
          style={{
            top: "120px",
            right: "0%",
            width: "240px",
            height: "320px",
            position: "absolute",
            zIndex: 1,
          }}
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
          strength={15}
        />
      </GalleryWrapper>
    </ParentGalleryWrapper>
  );
}
