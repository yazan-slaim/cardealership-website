'use client';
import React from 'react';
import styled from '@emotion/styled';
import { useTransitionRouter } from "next-view-transitions";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ imageUrl }) => `url(${imageUrl}) center/cover no-repeat`};
  background-position: center;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  line-height: 1;
  text-align: center;
  text-shadow:  2px 2px 100px 3px rgba(0, 0, 0, 0.7);

`;

const ActionButton = styled.div`
  padding: 5px 20px;
  border-radius: 25px;
  color: white;
  font-size: 8px;
  text-align: center;
  border: 1px solid white;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid white;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;

`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 45px;
  font-size: 8px;
  margin: 20px 0;
  color: #ffffff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

  div {
    display: flex;
    gap: 4px;
  }
`;

const ColorCircle = styled.div`
  width: 10px;
  height: 10px;
  background: ${({ background }) => background};
  border-radius: 50%;
  border: 2px solid white;
`;

function slideInOut() {
  document.documentElement.animate(
    [{ opacity: 1, transform: "translateY(0)" }, { opacity: 0.2, transform: "translateY(-35%)" }],
    { duration: 1500, easing: "cubic-bezier(0.87, 0, 0.13, 1)", fill: "forwards", pseudoElement: "::view-transition-old(root)" }
  );
  document.documentElement.animate(
    [{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }, { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" }],
    { duration: 1500, easing: "cubic-bezier(0.87, 0, 0.13, 1)", fill: "forwards", pseudoElement: "::view-transition-new(root)" }
  );
}

export default function MakeItYours({ price, title, mileage, color, year, background }) {
  const router = useTransitionRouter();

  const handleNavigate = () => {
    router.push('/contact', { onTransitionReady: slideInOut });
  };

  return (
    <Container imageUrl={"https://tolleson.com/wp-content/uploads/2020/09/Lucid-Retail-1-1.jpg"}>
      <MiddleContainer>
        <Text>Make {title} yours</Text>
        <InfoContainer>
          <div>color: <ColorCircle background={color} /></div>
          <div>price:<span> ${price}</span></div>
          <div>mileage: <span>{mileage}</span></div>
          <div>year: <span>{year}</span></div>
        </InfoContainer>
        <ButtonsContainer>
          <ActionButton onClick={handleNavigate}>enquire now</ActionButton>
          <ActionButton onClick={handleNavigate}>test drive</ActionButton>
        </ButtonsContainer>
      </MiddleContainer>
    </Container>
  );
}

