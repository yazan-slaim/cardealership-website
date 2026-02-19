"use client";

import React from "react";
import styled from "@emotion/styled";

/* =========================
   WRAPPER
   ========================= */

const CollageWrapper = styled.div`
  position: relative;
  width: 900px;
  height: 100vh;
  margin: 0;
`;

/* =========================
   IMAGE
   ========================= */

const Image = styled.div`
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

/* =========================
   COMPONENT
   ========================= */

export default function ChaosCollageTwo() {
  return (
    <CollageWrapper>
      {/* TOP LEFT IMAGE */}
      <Image
        style={{
          top: "10%",
          left: "0",
          width: "520px",
          aspectRatio: "3 / 2",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=80)",
        }}
      />

      {/* BOTTOM RIGHT IMAGE */}
      <Image
        style={{
          top: "40%",
          right: "0",
          width: "450px",
          aspectRatio: "4 / 3",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80)",
        }}
      />
    </CollageWrapper>
  );
}
