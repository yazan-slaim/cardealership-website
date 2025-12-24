'use client'
import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background: url('https://newsroomcdn.bugatti.com/w_3200/f014c3ff-2a67-4034-912a-2028aa1841aa.jpg');
  padding: 30px 100px;
  background-size: cover;
  background-position: center;

`;
const SquarishP = styled.p`
  width: fit-content; 
  border-radius: 8px;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
`;
const Container = styled.div`
  display: flex;
  min-height: 1000px;
  background: black;
  flex-direction: column;
  padding: 40px;
  flex-direction: column;
  gap: 40px;
`;

const UpperContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LowerDiv = styled.div`
  flex: 1;
  display: flex;
  gap: 80px;
  h1{
    font-size: 12px;
    margin-bottom: 40px;

  }
`;

const FirstDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    color: white;
    margin-bottom: 8px;
  }


`;

const Button = styled.button`
  padding: 2px 20px;
  border-radius: 20px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ffffff;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;

const SecondDiv = styled.div`
  flex: 1;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;


const ThirdDiv = styled.div`
  flex: 1;
  background-image: url('https://newsroomcdn.bugatti.com/w_3200/f014c3ff-2a67-4034-912a-2028aa1841aa.jpg');
  background-size: cover;
  border-radius: 8px;
`;

export default function SellYoursPage() {
    return (
        <Wrapper>
            <Container>
                <UpperContainer>
                    <h1 style={{ maxWidth: '600px', fontSize: '22px' }}>Being visible is just no longer enough. It’s all about leveraging attention. And then moving forward together. Synced.</h1>
                </UpperContainer>
                <LowerDiv>
                    <FirstDiv>
                        <h1>cars we are looking for</h1>
                        <ul>
                            <li>Toyota Camry</li>
                            <li>Ford Mustang</li>
                            <li>BMW 3 Series</li>
                        </ul>
                    </FirstDiv>
                    <SecondDiv>
                        <h1>Section Title</h1>
                        <SquarishP>We deliver brands with high objectives the strategy and the creativity it takes to have that impact, by teaming up with some of the best talents out there. Without ever compromising on keeping your teams happy and sane.</SquarishP>
                        <Button>Sell Your Car</Button>
                    </SecondDiv>
                    <ThirdDiv />
                </LowerDiv>
            </Container>
        </Wrapper>
    );
}
