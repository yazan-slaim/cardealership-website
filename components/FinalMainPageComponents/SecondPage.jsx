import React from "react";
import styled from "@emotion/styled";
const PageContainer = styled.div`
  z-index: 2;
background: black;
`;
const UpperDiv = styled.div`
  padding: 80px;
  h1 {
    font-size: 30px;
    max-width: 800px;
  text-justify: inter-word;
  hyphens: auto;
  }
`;

const LowerDiv = styled.div`
  display: flex;
  padding: 80px;

`;
const LowerDivLeft = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LowerDivRight = styled.div`
  flex: 2;
  p{
    max-width: 700px;
    font-size: 18px;
    text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
  }
`;
export default function SecondPage() {
  return (
    <PageContainer>

      <LowerDiv>
        <LowerDivLeft>
          <h1>LOGO</h1>

        </LowerDivLeft>
        <LowerDivRight>
          <h1>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of
            Lorem Ipsum.
          </h1>
        </LowerDivRight>
      </LowerDiv>
    </PageContainer>
  );
}
