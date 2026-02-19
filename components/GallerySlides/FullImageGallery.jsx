"use client";

import React from "react";
import styled from "@emotion/styled";

/* =========================
   WRAPPER
   ========================= */

const ParentGalleryWrapper = styled.div`
  //padding: 95px 50px;
`;

const GalleryWrapper = styled.div`
  position: relative;
  width: 950px;
  height: 100vh;
  overflow: hidden;
`;

/* =========================
   FULL IMAGE
   ========================= */

const FullImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

/* =========================
   COMPONENT
   ========================= */

export default function FullImageGallery() {
  return (
    <ParentGalleryWrapper>
      <GalleryWrapper>
        <FullImage />
      </GalleryWrapper>
    </ParentGalleryWrapper>
  );
}
