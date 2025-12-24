"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useMenu } from "@/contexts/MenuContext";
import { usePathname } from "next/navigation";
import { ArrowLongLeft } from "@/public/svgs/Arrow-Long-Left";
import { gsap } from "gsap";
import { useTransitionRouter } from 'next-view-transitions'

const Wrapper = styled.div`
  background: black;
  height: 300px;
  width: 100vw;
  position: fixed;
  top: -300px; /* Initially hidden above */
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  overflow: hidden;
  z-index: 999999;
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex: 0.2;
  align-items: center;
  padding: 0px 20px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledA = styled.a`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  cursor: none;
  text-decoration: none;
    color: #ccc;
  transition: color 0.3s ease;


  &:hover {
    //text-decoration: underline;
  color: white;
  }
`;


const CloseButton = styled.button`
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    transition: all 0.3s ease-in-out;
    font-size: 1rem;
    text-transform: uppercase;
  }
  &:hover {
    h1 {
      transform: scale(1.2, 1.2);
    }
  }
`;
function slideInOut() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translateY(0)"
      },
      {
        opacity: 0.2,
        transform: "translateY(-35%)"
      }
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)"
    }
  );

  document.documentElement.animate(
    [
        {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
        },
        {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        }
    ],
     {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)"
    }
  )
}

export default function MenuTemplate() {
      const router = useTransitionRouter()

  const { closeMenu, isMenuOpen } = useMenu();
  const pathname = usePathname();
  const wrapperRef = useRef(null);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(wrapperRef.current, {
        y: 300, // Slide down 300px (height of the menu)
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(wrapperRef.current, {
        y: -300, // Slide back up when closed
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [isMenuOpen]);

  return (
    <Wrapper ref={wrapperRef}>
      <BottomContainer>
  <StyledA
    href="/"
    onClick={(e) => {
      e.preventDefault();
      router.push("/", { onTransitionReady: slideInOut });
    }}
  >
    HOME
  </StyledA>

  <StyledA
    href="/stock"
    onClick={(e) => {
      e.preventDefault();
      router.push("/stock", { onTransitionReady: slideInOut });
    }}
  >
    STOCK
  </StyledA>

  <StyledA
    href="/newabout"
    onClick={(e) => {
      e.preventDefault();
      router.push("/newabout", { onTransitionReady: slideInOut });
    }}
  >
    ABOUT
  </StyledA>

  <StyledA
    href="/contact"
    onClick={(e) => {
      e.preventDefault();
      router.push("/contact", { onTransitionReady: slideInOut });
    }}
  >
    CONTACT
  </StyledA>

  <StyledA
    href="/gallery"
    onClick={(e) => {
      e.preventDefault();
      router.push("/gallery", { onTransitionReady: slideInOut });
    }}
  >
    GALLERY
  </StyledA>
    <StyledA
    href="/stock/66f9bfe39d94d5d534920be5"
    onClick={(e) => {
      e.preventDefault();
      router.push("/stock/66f9bfe39d94d5d534920be5", { onTransitionReady: slideInOut });
    }}
  >
    CAR DEMO
  </StyledA>

</BottomContainer>

      <TopContainer>
        <CloseButton onClick={closeMenu}>
          <ArrowLongLeft />
          back
        </CloseButton>
        <h1>LOGO</h1>
      </TopContainer>
    </Wrapper>
  );
}
