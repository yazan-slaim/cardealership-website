"use client";
import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: black;
`;
const StyledImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  z-index: 1;
`;
export default function LogoComponent() {
  return (
    <Container>
      <StyledImage
        src={
          "https://envelopeworks.com/wp-content/uploads/chess-pieces-knight-white.png"
        }
      />
    </Container>
  );
}
