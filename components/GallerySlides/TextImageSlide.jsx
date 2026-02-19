"use client";

import React from "react";
import styled from "@emotion/styled";

/* =========================
   WRAPPER
   ========================= */

const SlideWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  padding: 80px 0;
  display: flex;
  gap: 80px;
  justify-content: space-evenly;
`;

/* =========================
   LEFT — IMAGE
   ========================= */

const ImageColumn = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
`;

const ImageFrame = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  background-image: url("https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=1600&q=80");
  background-size: cover;
  background-position: center;
`;

const ImageCaption = styled.div`
  margin-top: 16px;
  font-size: 0.85rem;
  color: #3a3a3a;
`;

/* =========================
   RIGHT — TEXT
   ========================= */

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/* Header row */
const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #2e2e2e;
  margin-bottom: 60px;
`;

/* Index */
const Index = styled.span`
  color: #7b3f3f;
  margin-right: 12px;
  font-weight: 500;
`;

/* Title */
const Title = styled.h1`
  font-size: 2rem;
  line-height: 1.05;
  font-weight: 500;
  max-width: 620px;
  margin: 0 0 40px 0;
  color: white;
`;

/* Paragraph */
const BodyText = styled.p`
  max-width: 520px;
  p {
    font-size: 21px;
  }
  line-height: 1.6;
  color: white;
  margin-bottom: 32px;
`;

/* Link */
const Link = styled.a`
  font-size: 1rem;
  color: #1e1e1e;
  text-decoration: underline;
  width: fit-content;
  cursor: pointer;
`;

const CarMinorTextContainerRight = styled.div`
  flex: 1;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    z-index: 999;
    font-size: 16px;
    text-transform: uppercase;
    color: rgb(255, 253, 237);
    gap: 12px;
    display: flex;
    flex-direction: column;
    h2 {
    }
    p {
      font-size: 21px;
    }
  }
`;

/* =========================
   COMPONENT
   ========================= */

export default function TextImageSlide() {
  return (
    <SlideWrapper>
      {/* LEFT */}
      <ImageColumn>
        <ImageFrame />
      </ImageColumn>

      {/* RIGHT */}
      <ContentColumn>
        {/*
        <MetaRow>
          <span>GA</span>
          <span>MENU</span>
        </MetaRow>

          <div style={{ marginBottom: "24px" }}>
            <Index>03</Index> te cianoa
          </div>
 */}
        <CarMinorTextContainerRight>
          <div style={{ width: "500px" }}>
            <h2>BARBER & STORE MANAGER (STADTMITTE)</h2>
            <p>
              Die Barbier-Szene bekommt im Jahre 2015 einen regelrechten Hype.
              Während dieser Zeit erlernt Ahmed das Barbierhandwerk von Hagi.
              Nach der Gründung der ersten Filiale hat er schnell erkannt, dass
              er in die Fußstapfen seines Vaters treten möchte. Heute übernimmt
              er die Rolle des Store Managers in der Stadtmitte und arbeitet als
              Barbier.
            </p>
          </div>
        </CarMinorTextContainerRight>
      </ContentColumn>
    </SlideWrapper>
  );
}
