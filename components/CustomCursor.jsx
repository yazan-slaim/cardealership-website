'use client'
import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const CursorCircle = styled.div`
  position: fixed;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
 transition: width 0.3s ease, height 0.3s ease,background-color 0.3s ease; 
  animation: ${props => props.$display ? css`${rotate} 10s linear infinite` : 'none'};
  mix-blend-mode: ${props => props.$display ? 'normal' : 'difference'};





  ${({ size, clicked }) => css`
    width: ${size === 'small' ? '5px' : size === 'text' ? '4px' : '120px'};
    height: ${size === 'small' ? '5px' : size === 'text' ? '20px' : '120px'};
    background-color: ${clicked ? 'rgba(255, 255, 255, 0.3)' : 'white'};
    border-radius: ${size === 'text' ? '10px' : '50%'};
    background: ${props => props.$display ? 'transparent' : 'white'};
  `}
`;




const CurvedText = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  transform-origin: center; 

  transform-style: preserve-3d;
  color: white;
  isolation: isolate;
  opacity: ${props => props.$display ? '1' : '0'};
  transition: opacity 0.5s ease;


`;


const TextSegment = styled.div`
  position: absolute;
  transform-origin: center;
  transform: rotate(${props => props.angle}deg) translateX(10px) rotate(${props => -props.angle}deg);
  font-size: 2.5px;
  color: white;
`;

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [size, setSize] = useState('small');
    const [isTextVisible, setIsTextVisible] = useState(false);

    const text = "next slide-next slide-";

    const characters = text.split('');
    const angleIncrement = 16;

    useEffect(() => {
        console.log(isTextVisible)
    }, [isTextVisible])
    useEffect(() => {
        const handleMouseMove = (e) => {
            const xPos = e.clientX;
            const yPos = e.clientY;
            setPosition({ x: xPos, y: yPos });


        };

        const handleMouseDown = () => {
            setClicked(true);
            setTimeout(() => setClicked(false), 800);
        };

        const updateCursorSize = (e) => {


            if (e.target.className.includes('bye')) {
                setIsTextVisible(true)
            } else {
                setIsTextVisible(false)

            }
            if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('a, .next-link')) {
                setSize('large');
            } else if (['h1', 'h2', 'h3', 'p', 'span'].includes(e.target.tagName.toLowerCase())) {
                setSize('text');
            } else {
                setSize('small');



            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseover', updateCursorSize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseover', updateCursorSize);
        };
    }, []);



    return (
        <CursorCircle
            size={size}
            clicked={clicked}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            $display={isTextVisible}
        >

            <CurvedText $display={isTextVisible}>
                {characters.map((char, index) => (
                    <TextSegment key={index} angle={index * angleIncrement}>
                        {char}
                    </TextSegment>
                ))}
            </CurvedText>

        </CursorCircle>
    );
};

export default CustomCursor;