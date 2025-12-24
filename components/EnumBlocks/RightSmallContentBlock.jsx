'use client'
import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from "framer-motion";
const Container = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: end;
  color:white;
`
const Rectangle = styled.div`
position: absolute;
right: 0;
height: 600px;
  aspect-ratio: 12/5;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: width 0.5s ease;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;

  h1 {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    left: 20px;
    font-size: 5rem;
    span {
      display: inline-block;
      transform: translateY(100%);
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    box-shadow: 200px 0px 110px 150px black inset;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  overflow: hidden;
`;
const StyledMotionDiv = styled(motion.div)`

  position: absolute;
  height: 100%;
  left: 0;
  width: 100%;
  z-index: 1;

`;
const CarMinorTextContainerRight = styled.div`
  position: absolute;
  left: 50px;
  top: 50%;

  transform: translateY(-50%);
  width: 400px;
  display: flex;
  gap: 10px;
  z-index: 999;
  div {
    h3 {
      font-size: 24px;
      font-weight: 400;
      text-transform: uppercase;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      margin-top: 5px;
      margin-left: 4px;
      line-height: 1.3rem;
    }
  }
`;
const HorizontalLine = styled.div`
  min-width: 80px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.384);
  margin-top: 15px;
`;

export default function RightSmallContentBlock({ block }) {
  const sectionRef = useRef(null);
  const motionDivRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  return (
    <Container>
      <Rectangle
        className="rectangle"
        ref={sectionRef}
      >
        <StyledMotionDiv
          ref={motionDivRef}
          style={{ top: y }}
        >
          <StyledImage
            src={block.image}
            alt="Overview"
          />
        </StyledMotionDiv>

        <CarMinorTextContainerRight>
          <HorizontalLine></HorizontalLine>
          <div>
            <h3>{block.title}</h3>
            <p>{block.description}</p>
          </div>
        </CarMinorTextContainerRight>

      </Rectangle>
    </Container>

  )
}
