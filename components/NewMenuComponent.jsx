"use client";

import React from "react";
import styled from "@emotion/styled";
import { useTransitionRouter } from "next-view-transitions";

/* =========================
   VIEW TRANSITION (CLOSE)
   ========================= */
function closeMenuTransition() {
  // MENU → slides up + fades out
  document.documentElement.animate(
    [
      { transform: "translateY(0%)", opacity: 1 },
      { transform: "translateY(-100%)", opacity: 0.85 },
    ],
    {
      duration: 1300,
      easing: "cubic-bezier(0.77, 0, 0.175, 1)", // smoother than power curve
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  // HOME → slides up from bottom + fades in
  document.documentElement.animate(
    [
      { transform: "translateY(100%)", opacity: 0.85 },
      { transform: "translateY(0%)", opacity: 1 },
    ],
    {
      duration: 1300,
      easing: "cubic-bezier(0.77, 0, 0.175, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}



/* =========================
   STYLES
   ========================= */

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;
  will-change: transform;
`;


const CloseButton = styled.button`
  position: fixed;
  top: 100px;
  left: 35px;
  z-index: 10;
  color: white;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
`;

const DivLeft = styled.div`
  flex: 1;
  background: #111;
`;

const DivRight = styled.div`
  flex: 1.3;
  display: flex;
  color: white;
`;

const SmallDivLeft = styled.div`
  flex: 1.2;
  padding: 100px 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  h1 {
    font-size: 2.5rem;
    font-family: "TrajanPro-Regular";
  }
`;

const SmallDivRight = styled.div`
  flex: 0.8;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 25px;
  font-size: 0.85rem;
  opacity: 0.85;
`;

/* =========================
   COMPONENT
   ========================= */

export default function MenuPage() {
  const router = useTransitionRouter();

  return (
    <Wrapper>
      <CloseButton
        onClick={() =>
          router.push("/", {
            scroll: false,
            onTransitionReady: closeMenuTransition,
          })
        }
      >
        Close
      </CloseButton>

      <DivLeft />

      <DivRight>
        <SmallDivLeft>
          <h1>Home</h1>
          <h1>Projecten</h1>
          <h1>Thema&apos;s</h1>
          <h1>Expertise</h1>
          <h1>Over ons</h1>
          <h1>Contact</h1>
        </SmallDivLeft>

        <SmallDivRight>
          <div>
            <p>Plannen</p>
            <p>Visie & strategie</p>
            <p>Ontwerpend onderzoek</p>
          </div>

          <div>
            <p>+31 (0)26 2344 904</p>
            <p>mail@studiod.nu</p>
            <p>English</p>
          </div>
        </SmallDivRight>
      </DivRight>
    </Wrapper>
  );
}
