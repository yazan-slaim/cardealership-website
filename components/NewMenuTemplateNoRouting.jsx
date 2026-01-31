"use client";

import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import gsap from "gsap";
import { useMenu } from "@/contexts/MenuContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


/* =========================
   STYLES
   ========================= */

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;
  z-index: 999999;
  transform: translateY(-100%);
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

export default function NewMenuTemplateNoRouting() {
  const { isMenuOpen, closeMenu } = useMenu();

const menuRef = useRef(null);
const pushLayer = document.getElementById("menu-push-layer");

useEffect(() => {
  if (isMenuOpen) {
    document.body.style.overflow = "hidden";

    gsap.to(menuRef.current, {
      y: "0%",
      duration: 1.2,
      ease: "expo.out",
    });

    gsap.to(pushLayer, {
      y: "0%",
      duration: 1.2,
      ease: "expo.out",
    });
  } else {
    gsap.to(menuRef.current, {
      y: "-100%",
      duration: 1.1,
      ease: "expo.inOut",
    });

    gsap.to(pushLayer, {
      y: "-100%",
      duration: 1.1,
      ease: "expo.inOut",
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });
  }
}, [isMenuOpen]);



  return (
    <Wrapper ref={menuRef}>
      <CloseButton onClick={closeMenu}>Close</CloseButton>

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
