"use client";

import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import gsap from "gsap";
import { useMenu } from "@/contexts/MenuContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from 'next-intl';
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

/* =========================
   VIEW TRANSITION ANIMATION
   ========================= */
function slideInOut() {
  document.documentElement.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0.2, transform: "translateY(-35%)" },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}

/* =========================
   STYLES
   ========================= */

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
  cursor: none;
  background: none;
  border: none;
  padding: 8px 12px;
  
  &:hover {
    opacity: 0.7;
  }
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
    cursor: none;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 0.6;
    }
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
  const t = useTranslations('Menu');
  const tHeader = useTranslations('Header');
  const menuRef = useRef(null);
  const { isMenuOpen, closeMenu } = useMenu();
  const router = useTransitionRouter();
  const pathname = usePathname();

  // Close menu when the route changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const appContent = document.getElementById("app-content");
    // Get all elements that need to be pushed down together
    const elementsToMove = [appContent].filter(Boolean);

    if (isMenuOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";

      // Slide the menu down from above
      gsap.to(menuRef.current, {
        y: "0%",
        duration: 1.2,
        ease: "expo.out",
      });

      // Push all content elements down
      elementsToMove.forEach(el => {
        gsap.to(el, {
          y: "100vh",
          duration: 1.2,
          ease: "expo.out",
        });
      });
    } else {
      // Slide menu back up
      gsap.to(menuRef.current, {
        y: "-100%",
        duration: 1.1,
        ease: "expo.inOut",
      });

      // Pull everything back to normal
      elementsToMove.forEach((el, i) => {
        gsap.to(el, {
          y: "0%",
          duration: 1.1,
          ease: "expo.inOut",
          onComplete: i === 0 ? () => {
            document.body.style.overflow = "";
          } : undefined,
        });
      });
    }
  }, [isMenuOpen]);

  const handleNavigation = (path) => {
    closeMenu();
    router.push(path, { onTransitionReady: slideInOut });
  };

  return (
    <Wrapper ref={menuRef}>
      <CloseButton onClick={closeMenu}>{tHeader('close')}</CloseButton>

      <DivLeft />

      <DivRight>
        <SmallDivLeft>
          <h1 onClick={() => handleNavigation("/")}>{t('home')}</h1>
          <h1 onClick={() => handleNavigation("/stock")}>{t('projects')}</h1>
          <h1 onClick={() => handleNavigation("/about")}>{t('expertise')}</h1>
          <h1 onClick={() => handleNavigation("/about")}>{t('about')}</h1>
          <h1 onClick={() => handleNavigation("/contact")}>{t('contact')}</h1>
        </SmallDivLeft>

        <SmallDivRight>
          <div>
            <p>{t('plans')}</p>
            <p>{t('vision')}</p>
            <p>{t('research')}</p>
          </div>

          <div>
            <p>+31 (0)26 2344 904</p>
            <p>mail@studiod.nu</p>
            <p>{tHeader('logo')}</p>
          </div>
        </SmallDivRight>
      </DivRight>
    </Wrapper>
  );
}
