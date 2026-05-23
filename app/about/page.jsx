"use client";
import React from "react";
import styled from "@emotion/styled";
import Parallax from "@/components/Parallax";
import Section from "@/components/DynamicImage";
const Wrapper = styled.div`
  min-height: 100vh;
  z-index: 2;
  position: relative;
  padding: 100px;
`;
const Container = styled.div`
  display: flex;
  gap: 40px;
  margin: 20px 0;
`;

const Title = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  text-align: start;

  h1 {
    font-size: 22.5vw;
    line-height: 1;
    margin: 0;
  }

  h2 {
    font-size: 95px;
    line-height: 0.001;
    margin: 0;
    padding-left: 20px;
  }
`;
const RightDiv = styled.div`
  padding-top: 150px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  div {
    height: 350px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const LeftDiv = styled.div`
  padding-top: 250px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 75px;
  div {
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
`;
const PhoneAndOpeningHours = styled.div`
  margin: 30px 0px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  h1 {
    font-size: 26px;
    text-transform: uppercase;
    margin: 15px 0px;
  }

  div {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 5px;
    align-items: center;
    span {
      text-transform: uppercase;
      min-width: 70px;
    }
    p {
      color: gray;
      font-size: 13px;
    }
  }
`;
export default function page() {
  return (
    <Wrapper>
      <Title>
        <h1>EXQUISIT</h1>
        <h2>about us</h2>
      </Title>
      <Container>
        <LeftDiv>
          <div>
            <img
              src="https://i.pinimg.com/736x/83/fb/75/83fb7536a4ecdf273478fef6d67fbcba.jpg"
              alt="Showroom interior"
              style={{ width: "100%", height: "450px" }}
              loading="lazy"
            />
          </div>
        </LeftDiv>{" "}
        <RightDiv>
          <div style={{ alignItems: "end" }}>
            <Parallax speed={1} className="self-center">
              <Section
                image={
                  "https://i.pinimg.com/736x/83/fb/75/83fb7536a4ecdf273478fef6d67fbcba.jpg"
                }
                tag=""
                title=""
                description=""
              />
            </Parallax>
          </div>{" "}
          <div>
            <h2 style={{ fontSize: "16px", maxWidth: "200px" }}>
              OUR PHILOSOPHY &amp; THE PURSUIT OF PERFECTION
            </h2>
            <p>
              We are specialists in sourcing the finest automobiles from around
              the globe. With a focus on provenance, condition, and exclusivity,
              we handpick every vehicle in our collection — ensuring only the
              most exceptional machines reach our showroom floor.
            </p>
          </div>{" "}
        </RightDiv>
      </Container>

      <Container
        style={{ display: "flex", flexDirection: "row", gap: "25px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            maxWidth: "800px",
            justifyContent: "center",
          }}
        >
          <p>
            Exquisit Motors has been at the forefront of the luxury and
            performance car industry, building an unrivalled reputation for
            providing a first-class, multifaceted service. Our comprehensive
            offering includes after-sales care, bespoke styling, and a personal
            vehicle sourcing service across the globe.
          </p>

          <p>
            Whether you are in the market for a rare European exotic, a refined
            luxury saloon, or a performance-tuned import — our specialists will
            locate and acquire the perfect vehicle tailored to your exact
            specifications.
          </p>

          <p>
            We work with a selection of the world&apos;s best tuning and custom
            upgrade partners to deliver vehicles that are truly one of a kind.
            Our in-house team of experts are ready to assist with sales, imports,
            sourcing, aftersales, and specialist customisation services.
          </p>
          <p>
            From initial consultation to final delivery, every interaction is
            designed to exceed expectations. We believe that acquiring a vehicle
            should be as exceptional as driving one.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: "1",
            height: "fit-content",
          }}
        >
          <h1
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "95px",
              whiteSpace: "nowrap",
            }}
          >
            CONTACT US
          </h1>
        </div>
      </Container>
      <Container>
        <div>
          <PhoneAndOpeningHours>
            <TextContainer>
              <h1>Opening Hours</h1>
              <div>
                <span>Mon-Fri</span>
                <p>10 am - 8 pm</p>
              </div>
              <div>
                <span>Sat,Sun</span>
                <p>Closed</p>
              </div>
            </TextContainer>
            <TextContainer>
              <h1>Contact</h1>
              <div>
                <span>Phone</span>
                <p>+962 7 999 1234</p>
              </div>
              <div>
                <span>Email</span>
                <p>info@exquisitmotors.com</p>
              </div>
            </TextContainer>
          </PhoneAndOpeningHours>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: "1",
          }}
        >
          <div
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background: "black",
              border: "2px solid #eee",
              position: "relative",
              boxShadow: "0 0 25px 5px rgba(255, 255, 255, 0.2)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="#fff"
              />
              <path fill="none" d="M0 0h24v24H0V0z" />
            </svg>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}
