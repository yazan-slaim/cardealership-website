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
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 100px 100px 60px 60px;
  color: white;
`;

/* TOP TITLE */
const TitleWrapper = styled.div`
  transform-origin: top left;
`;

const BigTitle = styled.h1`
  font-size: 2rem;
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
  background-image: url("https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2400&auto=format&fit=crop");
  background-size: cover;
  background-position: center;
`;

function NewSlideforGallery() {
  return (
    <Wrapper>
      <LeftDiv>
        <TitleWrapper>
          <BigTitle>Gallery</BigTitle>
        </TitleWrapper>

        <BottomInfo></BottomInfo>
      </LeftDiv>

      <RightDiv />
    </Wrapper>
  );
}

export default NewSlideforGallery;
