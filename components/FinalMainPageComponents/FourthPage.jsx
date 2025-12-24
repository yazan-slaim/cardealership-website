'use client'

import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from "framer-motion";
import Parallax from '../Parallax';
import Rightblock from '../Right-Left-about-us/Right-block';
import Leftblock from '../Right-Left-about-us/Left-block';
const PageContainer = styled.div`
  min-height: 100vh;
  padding-top: 28px;
  z-index: 2;

  background: black;

`;
const Title = styled.h1`
    margin-bottom: 15px;
    text-transform: uppercase;
    padding-left: 10px;
    font-size: 2.5rem;`
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
const HorizontalLine = styled.div`
  min-width: 80px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.384);
  margin-top: 15px;
`;
export default function FourthPage() {

    return (
        <PageContainer><Title>ABOUT US</Title>
            <Rightblock />
            <Leftblock />
        </PageContainer>
    )
}
