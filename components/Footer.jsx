"use client";
import React from "react";
import styled from "@emotion/styled";
import { ArrowLongLeft } from "@/public/svgs/Arrow-Long-Left";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
const FooterContainer = styled.footer`
  background: black;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: fit-content;
  width: 100%;
  height: 100vh;
  position: relative;
  bottom: 0;
  left: 0;
  transition: transform 0.3s ease-out;
  z-index: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 0 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  h3 {
    font-size: 16px;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px; /* Adjust max-width as needed */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 15rem;
  text-align: center;
`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px 0 20px;
  h3 {
    margin-bottom: 13px;
  }
  p {
    margin-bottom: 10px;
    text-decoration: underline;
    font-size: 14px;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 250px;
`;
const Location = styled.div`
  display: flex;
  max-width: 250px;
`;
const Navigation = styled.div`
  color: #555050;
  display: flex;
  align-items: center;
  max-width: 250px;
  div {
    * {
      transition: color 0.3s ease-in-out;
      &:hover {
        color: #fffded;
      }
    }
  }
`;
const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 250px;
  gap: 13px;
`;
const StyledFacebookIcon = styled(FontAwesomeIcon)`
  color: #555050;
  transition: color 0.3s ease-in-out;
  width: 32px;
  height: 32px;

  &:hover {
    color: #fffded;
  }
`;

export default function Footer({ isVisible }) {
  return (
    <FooterContainer isVisible={true}>
      <ContentWrapper>
        <Title>EXQUISIT</Title>
        <FlexContainer>
          <Contact>
            <h3>LET'S WORK TOGETHER</h3>
            <p>+96284934374</p>
            <p>y.salaim@gmail.com</p>
          </Contact>
          <Location>
            <h3>
              NUMBERED STUDIO HERENGRACHT 342-11016CG, AMSTERDAM THE SUNNY
              NETHERLANDS
            </h3>
          </Location>
          <Navigation>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "13px" }}
            >
              <Link href={"/newabout"}>ABOUT</Link>
              <Link href={"/contact"}> CONTACT</Link>
              <Link href={"/gallery"}> GALLERY</Link>
              <Link href={"/"}> SELL-YOURS</Link>
              <Link href={"/stock"}> STOCK</Link>
            </div>
          </Navigation>
          <SocialMedia>
            <h3>SOCIAL MEDIA</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "13px",
              }}
            >
              <StyledFacebookIcon icon={faFacebookF} />
              <StyledFacebookIcon icon={faInstagram} />
              <StyledFacebookIcon icon={faXTwitter} />
              <StyledFacebookIcon icon={faYoutube} />
            </div>
          </SocialMedia>
        </FlexContainer>
      </ContentWrapper>
    </FooterContainer>
  );
}
