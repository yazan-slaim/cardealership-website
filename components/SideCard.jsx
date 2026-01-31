"use client";
import { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import gsap from "gsap";
import Link from "next/link";

// Styled Components
const FixedRectangle = styled.div`
  position: fixed;
  right: -10px;
  top: 50%;
  transform: translateY(-50%) translateX(215px);

  height: 120px;
  width: 250px;
  background-color: black;
  /*
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
*/
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  *{
    font-family: "TrajanPro-Regular";
  }
`;

const ExpandedContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  flex: 1;
  height: 100%;
`;

const LinkButton = styled(Link)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
 // border-left: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background:white;
    color:black;
  }
`;

const Title = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;

  block-size: auto;    /* allows full text height */

  display: flex;
  align-items: center;
  justify-content: center;

  white-space: nowrap;
  overflow: hidden;
`;


const ExpandableRectangle = () => {
  const rectangleRef = useRef(null);

  useEffect(() => {
    const rectangle = rectangleRef.current;

    const handleEnter = () => {
      gsap.to(rectangle, { x: 0, duration: 0.5, ease: "power2.out" });
    };
    const handleLeave = () => {
      gsap.to(rectangle, { x: 215, duration: 0.5, ease: "power2.out" });
    };

    rectangle.addEventListener("mouseenter", handleEnter);
    rectangle.addEventListener("mouseleave", handleLeave);

    return () => {
      rectangle.removeEventListener("mouseenter", handleEnter);
      rectangle.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <FixedRectangle ref={rectangleRef}>
      <Title>Quick Links</Title>
      <ExpandedContent>
        <LinkButton href="/newabout">Find Us</LinkButton>
      <LinkButton
  href="/contact"
  style={{
    borderTop: "1px solid rgba(255, 255, 255, 0.3)",
  }}
>
  Contact Us
</LinkButton>

      </ExpandedContent>
    </FixedRectangle>
  );
};

export default ExpandableRectangle;
