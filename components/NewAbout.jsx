"use client";
import styled from "@emotion/styled";
import AnimatedParagraph from "./AnimatedParagraph";
import ImageParallax from "./Parallax/ImageParallax";
import MagazineSlider from "./MagazineSlider";
import { useRef } from "react";
import HeritageCarousel from "./HeritageCarousel";

const Wrapper = styled.div`
  padding: 200px 0 0 0;
  display: flex;
  flex-direction: column-reverse;
  background: black;
  gap: 50px;
  z-index: 2;
`;

const ParagprahContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin: 25px 0 25px 0;
`;

const LittleTitle = styled.h1`
  font-size: 16px;
`;

const ImagesSpacer = styled.div`
  position: relative;
  height: 120vh;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const Image = styled.img`
  width: 500px;
  aspect-ratio: 1/1.5;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  height: 800px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  width: 550px;

  height: 800px;
  p {
    padding: 15px 0;
    max-width: 200px;
  }
  h1 {
    font-family: "TrajanPro-Bold";
  }
`;

const NewAbout = () => {
  const mainRef = useRef(null);
  const firstParagraphRef = useRef(null);
  const secondParagraphRef = useRef(null);
  const thirdParagraphRef = useRef(null);

  return (
    <Wrapper ref={mainRef}>
      <HeritageCarousel />

      <div
        style={{
          padding: "25px 150px",
          gap: "50px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AnimatedParagraph
          passedref={thirdParagraphRef}
          paragraph={`At Exquisit Motors, we believe every vehicle tells a story. From the provenance of each acquisition to the meticulous standards of our preparation process, we ensure that every car in our collection meets the highest benchmarks of quality, authenticity, and desirability. Our commitment extends beyond the transaction \u2014 we build relationships with collectors and enthusiasts who share our passion for automotive excellence. Whether sourcing a rare European import or a pristine modern classic, our global network and deep industry expertise ensure an unparalleled experience.`}
        ></AnimatedParagraph>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <h1>Written By: The Founders</h1>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 30px",
          fontSize: "12px",
        }}
      >
        <h1>EXQUISIT</h1>
        <h3
          style={{ color: "#2E2E2E", maxWidth: "600px", textAlign: "center" }}
        >
          Open the door to the world of automotive excellence. Our collection
          reflects the pinnacle of engineering, provenance, and design.
        </h3>
        <h3>AMMAN [ EST. 2024 ]</h3>
      </div>

      <MagazineSlider />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0 100px",
          gap: "50px",
        }}
      >
        <ParagprahContainer>
          <LittleTitle>[about]</LittleTitle>
          <AnimatedParagraph
            passedref={firstParagraphRef}
            paragraph={`Exquisit Motors specializes in curating the finest luxury and performance vehicles. With decades of industry expertise, we source, acquire, and deliver exceptional automobiles to discerning clients worldwide.`}
          />
        </ParagprahContainer>
        <ImagesSpacer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "55px",
              marginTop: "50px",
            }}
          >
            <ImageParallax speed={3}>
              <Container>
                <StyledImage
                  src="https://hips.hearstapps.com/hmg-prod/images/2024-lucid-air-sapphire-117-64cd3bf322c9a.jpg?crop=0.776xw:0.871xh;0.0705xw,0.0576xh&resize=768:*"
                  alt="Luxury vehicle exterior"
                  loading="lazy"
                />
              </Container>
            </ImageParallax>
            <ImageParallax speed={2}>
              <Container>
                <StyledImage
                  src="https://www.electrive.com/media/2023/10/lucid-air-pure-rear-wheel-drive-06-10-2023-1400x933.jpg.webp"
                  alt="Performance vehicle rear"
                  loading="lazy"
                />
              </Container>
            </ImageParallax>
          </div>
          <div
            style={{
              position: "absolute",
              top: "140px",
              left: "58%",
              transform: "translateX(-50%)",
            }}
          >
            <ImageParallax speed={-4.5}>
              <Container>
                <StyledImage
                  src="https://lucidmotors.com/s3fs-public/2023-11/lucid-gravity-exterior_0.webp"
                  alt="Luxury SUV exterior"
                  loading="lazy"
                />
              </Container>
            </ImageParallax>
          </div>
        </ImagesSpacer>

        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}></div>
          <ParagprahContainer style={{ flex: 1 }}>
            <LittleTitle>[exquisit]</LittleTitle>
            <AnimatedParagraph
              passedref={secondParagraphRef}
              paragraph={`EXQUISIT MOTORS IS A PREMIER AUTOMOTIVE HOUSE DEDICATED TO MERGING HERITAGE WITH INNOVATION, DELIVERING AN UNMATCHED VEHICLE ACQUISITION EXPERIENCE TO COLLECTORS AND ENTHUSIASTS WORLDWIDE.`}
            />
          </ParagprahContainer>
        </div>
      </div>
    </Wrapper>
  );
};

export default NewAbout;
