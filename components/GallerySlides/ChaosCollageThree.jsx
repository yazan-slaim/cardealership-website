"use client";

import React from "react";
import styled from "@emotion/styled";

/* =========================
   OUTER WRAPPER
   ========================= */

const ParentGalleryWrapper = styled.div`
  padding: 80px 60px;
  min-height: 100vh;
  display: flex;
  align-items: center; /* centers the canvas itself */
`;

/* =========================
   COLLAGE CANVAS
   ========================= */

const GalleryWrapper = styled.div`
  position: relative;
  width: 1000px;
`;

/* =========================
   IMAGE BLOCK
   ========================= */

const ImageBlock = styled.div`
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

/* =========================
   COMPONENT
   ========================= */

export default function ChaosCollageThree() {
  return (
    <ParentGalleryWrapper>
      <GalleryWrapper>
        {/* LEFT IMAGE */}
        <ImageBlock
          style={{
            top: "40%",
            left: "0%",
            transform: "translateY(-40%)",
            width: "200px",
            aspectRatio: "3 / 4",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80)",
          }}
        />

        {/* CENTER / MAIN IMAGE */}
        <ImageBlock
          style={{
            top: "60%",
            right: "0%",
            transform: "translateY(-45%)",
            height: "400px",
            aspectRatio: "5 / 4",
            zIndex: 5,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=1600&q=80)",
          }}
        />

        {/* OVERLAPPING IMAGE */}
        <ImageBlock
          style={{
            top: "50%",
            left: "20%",
            transform: "translateY(-50%)",
            width: "300px",
            aspectRatio: "3 / 4",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80)",
          }}
        />
      </GalleryWrapper>
    </ParentGalleryWrapper>
  );
}
