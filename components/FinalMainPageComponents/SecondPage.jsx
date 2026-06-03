import React from "react";
import styled from "@emotion/styled";
import { useTranslations } from 'next-intl';

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
  p {
    max-width: 700px;
    font-size: 18px;
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
  }
`;
export default function SecondPage() {
  const t = useTranslations('SecondPage');
  const tHeader = useTranslations('Header');
  return (
    <PageContainer>
      <LowerDiv>
        <LowerDivLeft>
          <h1>{tHeader('logo')}</h1>
        </LowerDivLeft>
        <LowerDivRight>
          <h1>
            {t('text')}
          </h1>
        </LowerDivRight>
      </LowerDiv>
    </PageContainer>
  );
}
