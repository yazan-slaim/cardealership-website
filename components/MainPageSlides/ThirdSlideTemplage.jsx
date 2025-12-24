import React, { useState } from "react";
import styled from "@emotion/styled";
import { ArrowLongLeft } from "@/public/svgs/Arrow-Long-Left";
import Footer from "../Footer";
import ContactUsPage from "@/app/contact/page";
import ReviewsPage from "../ReviewsPage";
import { Global, css } from "@emotion/react";
import SellYoursPage from "../SellYoursPage";

const Container = styled.section`
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  z-index: 0;
  bottom: 0;
  overflow: hidden;
  //background: url("https://lucidmotors.com/s3fs-public/2022-08/stealth_3quarter-front-2_web-16x9.webp") no-repeat center center;
  //background-size: cover;
  background: #f5f5f0;
  * {
    color: #151515;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  flex-basis: 100vw;
  display: flex;
  transition: transform 0.7s ease;
  transform: ${({ active }) =>
    active ? "translateX(-100vw)" : "translateX(0)"};
`;

const Section = styled.div`
  height: fit-content;
  width: 100vw;
  overflow: hidden;

  position: relative;
  top: 0;
  right: ${({ active }) => (active ? "0" : "-100vw")};
  transition: right 0.7s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.button`
  border-radius: 50%;
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  border: 3px dotted #151515;
  font-family: "TrajanPro-Regular";
  padding: 0px 10px;
`;

const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px 150px 0px 0px;
  gap: 20px;
  justify-content: space-evenly;
  flex: 1.5;
`;
const CoverDiv = styled.div`
  width: 70%;
  height: 90%;
  position: absolute;
  right: 30px;
  top: 25px;
  background: white;
  border-radius: 8px;
  border: 1px solid #151515;
  z-index: 9;
`;
const LeftContainer = styled.div`
  flex: 4;
  flex-direction: column;
  display: flex;
`;
const BackButton = styled.button`
  position: fixed;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    transition: all 0.3s ease-in-out;
    font-size: 0.7rem;
    text-transform: uppercase;
  }
  &:hover {
    h1 {
      transform: scale(1.2, 1.2);
    }
  }
`;
const HorizontalLine = styled.div`
  height: 1px;
  background-color: white;
`;
const SecondIdeaContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
`;
const TextDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: end;
  max-width: 80%;

  h1 {
    font-size: 11vw;
    line-height: 1;
  }
  p {
    font-size: 9px;
    max-width: 400px;
    margin-bottom: 30px;
  }
`;
const handleWheel = (e) => {
  e.preventDefault(); // Prevent default scrolling behavior
};

export default function ThirdSlideTemplage() {
  const [activeSection, setActiveSection] = useState();
  const circleOffset = 10;

  return (
    <>
      <Global
        styles={css`
          body {
            overflow-y: ${activeSection ? "hidden" : "auto"};
          }
        `}
      />

      <Container onWheel={activeSection ? null : handleWheel}>
        <Wrapper active={activeSection}>
          <div
            style={{ display: "flex", alignItems: "center", width: "100vw" }}
          >
            <SecondIdeaContainer>
              <TextDiv>
                <h1>EXPLORE</h1>
              </TextDiv>
              <TextDiv style={{ paddingLeft: "5%", marginTop: "-15px" }}>
                <h1>FURTHER</h1>
              </TextDiv>
              <div
                style={{
                  position: "absolute",
                  bottom: "-100px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "9px",
                  width: "100%",
                  left: "15%",
                }}
              >
                <p>ALL RIGHTS RESERVED FRANÇOIS FONTAINE 2023 ©</p>
                <p>CONTACT@FRANCOISFONTAINE.COM</p>
              </div>
            </SecondIdeaContainer>
            <CircleContainer>
              <Circle
                onClick={() => setActiveSection("contact")}
                style={{ transform: `translateX(${circleOffset * 1}px)` }}
              >
                CONTACT US
              </Circle>
              <Circle
                onClick={() => setActiveSection("sell")}
                style={{ transform: `translateX(${circleOffset * 12}px)` }}
              >
                SELL YOURS
              </Circle>
              <Circle
                onClick={() => setActiveSection("reviews")}
                style={{ transform: `translateX(${circleOffset * 1}px)` }}
              >
                REIVEWS
              </Circle>
            </CircleContainer>
          </div>
        </Wrapper>

        <Section active={activeSection === "contact"}>
          <ContactUsPage />
          {activeSection === "contact" && (
            <BackButton onClick={() => setActiveSection("")}>
              <ArrowLongLeft />
              back
            </BackButton>
          )}
        </Section>
        <Section active={activeSection === "sell"}>
          {activeSection === "sell" && (
            <BackButton onClick={() => setActiveSection("")}>
              <ArrowLongLeft />
              back
            </BackButton>
          )}
          <SellYoursPage />
        </Section>
        <Section active={activeSection === "reviews"}>
          {activeSection === "reviews" && (
            <BackButton onClick={() => setActiveSection("")}>
              <ArrowLongLeft />
              back
            </BackButton>
          )}
          <ReviewsPage />
        </Section>
      </Container>
    </>
  );
}
