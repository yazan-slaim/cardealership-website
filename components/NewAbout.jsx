"use client";
import styled from "@emotion/styled";
import AnimatedParagraph from "./AnimatedParagraph";
import ImageParallax from "./Parallax/ImageParallax";
import MagazineSlider from "./MagazineSlider";
import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { onPageEnter, onPageLeave } from "@/utils/animation";
import HistoryCarousel from "@/app/test/historyCarousel/page";
import HeritageCarousel from "./HeritageCarousel";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

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
  height: 170vh;
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
  const pathname = usePathname();
/*
  useGSAP(() => {
    const parent = document.querySelector(".parent-container");

    if (pathname === "/newabout") {
      if (!parent.contains(mainRef.current)) {
        parent.appendChild(mainRef.current);
      }

      onPageEnter(mainRef, parent);
    } else {
      onPageLeave(mainRef);
    }
  }, [pathname]);
*/
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
          paragraph={`“ There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. ”`}
        ></AnimatedParagraph>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <h1>Written By: Founder Name</h1>
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
        <h1>(Logo)</h1>
        <h3
          style={{ color: "#2E2E2E", maxWidth: "600px", textAlign: "center" }}
        >
          Open the door to the world of creativity! Our works not only reflect
          the beauty of art, they provoke thought, inspire new discoveries, and
          evoke delight.
        </h3>
        <h3>NYC [ 1:46 AM ]</h3>
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
            paragraph={`is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.`}
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
                  alt="Image 1"
                />
              </Container>
            </ImageParallax>
            <ImageParallax speed={2}>
              <Container>
                <StyledImage
                  src="https://www.electrive.com/media/2023/10/lucid-air-pure-rear-wheel-drive-06-10-2023-1400x933.jpg.webp"
                  alt="Image 2"
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
                  alt="Image 3"
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
              paragraph={`SASHA KASIUHA IS A NEW YORK BASED MULTIDISCIPLINARY ARTIST WITH A FOCUS ON MERGING CREATIVITY AND TECHNOLOGY, CONSISTENTLY PUSHES ARTISTIC BOUNDARIES TO DELIVER UNIQUE AND EMOTIONALLY RESONANT EXPERIENCE.`}
            />
          </ParagprahContainer>
        </div>
      </div>
    </Wrapper>
  );
};

export default NewAbout;


