'use client'

import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from "framer-motion";

const Container = styled.div`
    display: flex;
    padding: 0 0 50px 0;
   
`
const Rectangle = styled.div`
position: absolute;
right: 0;
flex: 1.5;
        height: 150vh;
        position: relative;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
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
 
  flex: 1;

  position: relative;

  div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-100%, -50%);
  z-index: 999;
  font-size: 16px;
  text-transform: uppercase;
  color: rgb(255, 253, 237);
  gap: 12px;
  display: flex;
  flex-direction: column;
  h2{
  }
  p{
    font-size: 21px;
  }

}
`;
export default function Rightblock() {
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
                        src={'https://wtop.com/wp-content/uploads/2021/11/110521_lucid.jpg'}
                        alt="Overview"
                    />
                </StyledMotionDiv>



            </Rectangle>
            <CarMinorTextContainerRight>
                <div style={{ width: "500px" }}>
                    <h1>AHMED RADA
                    </h1><h2>BARBER &
                        STORE MANAGER (STADTMITTE)</h2><p>Die Barbier-Szene bekommt im Jahre 2015 einen regelrechten Hype. Während dieser Zeit erlernt Ahmed das Barbierhandwerk von Hagi. Nach der Gründung der ersten Filiale hat er schnell erkannt, dass er in die Fußstapfen seines Vaters treten möchte. Heute übernimmt er die Rolle des Store Managers in der Stadtmitte und arbeitet als Barbier.
                    </p>
                </div>
            </CarMinorTextContainerRight>
        </Container>)
}
