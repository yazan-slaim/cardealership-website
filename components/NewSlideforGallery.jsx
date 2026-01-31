"use client";
import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: black;
  position: relative;
  overflow: hidden;
`;

/* LEFT */
const LeftDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 100px 100px 60px 60px;
  color: white;
`;

/* TOP TITLE */
const TitleWrapper = styled.div`
  transform-origin: top left;
`;

const BigTitle = styled.p`
  font-size: 6rem;
  font-weight: 500;
  line-height: 0.9;
  transform: scale(4);
  transform-origin: top left;
  margin: 0;
`;

/* BOTTOM INFO */
const BottomInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 0.8rem;
  opacity: 0.9;
`;

const BottomLeft = styled.div`
  max-width: 220px;
  line-height: 1.4;
`;

const BottomRight = styled.div`
  text-align: right;
  line-height: 1.4;
`;

/* RIGHT */
const RightDiv = styled.div`
  flex: 1;
  background-image: url("https://hips.hearstapps.com/hmg-prod/images/toyota-ft-se-sports-car-concept-exterior-110-65392a8ee4d33.jpg?crop=1xw:1xh;center,top");
  background-size: cover;
  background-position: center;
`;

function NewSlideforGallery() {
  return (
    <Wrapper>
      <LeftDiv>
        {/* TOP */}
        <TitleWrapper>
          <BigTitle>Gallery</BigTitle>
        </TitleWrapper>

        {/* BOTTOM */}
        <BottomInfo>
          <BottomLeft>
            A curated selection of visual work exploring form, motion, and
            identity through design.
          </BottomLeft>

          <BottomRight>
            © 2026<br />
            All Rights Reserved
          </BottomRight>
        </BottomInfo>
      </LeftDiv>

      <RightDiv />
    </Wrapper>
  );
}

export default NewSlideforGallery;
