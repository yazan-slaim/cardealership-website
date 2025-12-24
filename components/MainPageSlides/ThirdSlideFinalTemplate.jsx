import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
`;
const UpperDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 50px;

  button {
    font-family: "TrajanPro-Regular";
  }
`;
const MiddleDiv = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 75px;
`;
const LowerDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-weight: 900;
`;
const TextDiv = styled.div`
  display: flex;

  h1 {
    font-size: 7rem;
    line-height: 1;
  }
  p {
    font-size: 9px;
    max-width: 400px;
    margin-bottom: 30px;
  }
`;
const MiddleDivFiddles = styled.div`
  display: flex;
  justify-content: center;
  gap: 150px;
  p {
    font-size: 9px;
  }
`;
const BiggerPageContainer = styled.div`
  height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  background: url("https://wallpaper.forfun.com/fetch/ee/eec798b0fb74d61660672ac8d48b394b.jpeg");
  background-position: center;
  background-size: cover;
  z-index: 12;
`;
export default function ThirdSlideFinalTemplate() {
  return (
    <BiggerPageContainer>
      <div style={{ height: "150px" }}></div>
      <PageContainer>
        {" "}
        <UpperDiv>
          <button> Contact Us</button>
          <button> Reviews</button>
          <button> Sells yours</button>
        </UpperDiv>
        <MiddleDiv>
          <TextDiv>
            <h1>EXPLORE</h1>
          </TextDiv>
          <TextDiv style={{ paddingLeft: "15%", marginTop: "-15px" }}>
            <h1>FURTHER</h1>
          </TextDiv>
          <MiddleDivFiddles>
            <p>ALL RIGHTS RESERVED FRANÇOIS FONTAINE 2023 ©</p>
            <p>CONTACT@FRANCOISFONTAINE.COM</p>
          </MiddleDivFiddles>
        </MiddleDiv>
        <LowerDiv>
          <h3>SCROLL</h3>
          <h3>TO</h3>
          <h3>PROCEED</h3>
        </LowerDiv>
      </PageContainer>
    </BiggerPageContainer>
  );
}
