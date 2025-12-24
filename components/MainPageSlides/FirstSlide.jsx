"use client"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styled from "@emotion/styled";
import limo from "@/public/images/limo.jpg";

const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
  //background: url('https://media.newyorker.com/photos/657a06902355faaba012460d/master/pass/231225_r43030.jpg') no-repeat center center;
  background-size: cover;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4); /* Dark overlay for better readability */
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 100px; // Height of the shadow
    z-index: 2;
    pointer-events: none; // Ensure clicks pass through to elements below
  }


  &:after {
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent);
  }
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 1;
  font-family: "TrajanPro-Regular";
  gap: 25px;
  
  h2 {
    font-size: 1.5rem; /* Slightly larger for readability */
    font-family: "TrajanPro-Regular";
    letter-spacing: 0.05em;
    color: #EDEDED; /* Light grey for elegance */
  }

  h1 {
    font-size: 6rem; /* More prominent */
    margin-bottom: 1.3rem;
    letter-spacing: 0.1em;
    color: #FFFFFF; /* Pure white for emphasis */
  }
`;

const StyledLink = styled(Link)`
  padding: 12px 20px; /* Slightly larger padding */
  background: transparent;
  color: white;
  border-radius: 30px;
  width: auto; /* Adjust based on content */
  text-transform: uppercase;
  font-size: 1rem; /* Larger for readability */
  border: 2px solid white;
  box-sizing: border-box;
  transition: all ease-in-out 0.3s;
  &:hover{
    background: rgba(255, 255, 255, 0.2); /* Subtle hover effect */
    color:white;
  }
`;

export default function FirstSlide() {
  return (
    <Section>
      <iframe
        src="https://www.youtube.com/embed/t9-cMiEDNyk?autoplay=1&controls=0&loop=1&playlist=t9-cMiEDNyk&mute=1&modestbranding=1&rel=0"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          zIndex: "-1"
        }}
      ></iframe>
      <CenterContainer>
        <h2>luxury car service represents</h2>
        <h1>EXPLORE ELEGANCE</h1>

      </CenterContainer>
    </Section>
  );
}
