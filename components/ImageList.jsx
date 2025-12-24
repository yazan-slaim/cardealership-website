"use client";
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Parallax from "./Parallax/Horizontal-Gallery-Parallax";
import { useLenis } from "@studio-freight/react-lenis";
import styled from "@emotion/styled";

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  aspect-ratio: ${({ aspect }) =>
    aspect === "vertical" ? "1080 / 1920" : "1920 / 1080"};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  p {
    padding: 15px 0;
    max-width: 200px;
  }
`;
const Wrapper = styled.div`
  display: flex;
`;

const Section = ({ image, tag, title, description }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-[200px] h-[350px] overflow-hidden mb-52"
    >
      <motion.div className="absolute w-full h-[120%] -z-10" style={{ top: y }}>
        <img src={image} alt="Overview" fill className="object-cover" />
      </motion.div>
    </section>
  );
};

export default function ImageList() {
  const lenis = useLenis((scroll) => {
    //   console.log(scroll)
  });
  return (
    <Wrapper>
      <Parallax speed={1} className="self-center">
        <Container>
          <StyledImage
            src={"https://picsum.photos/1200?random=1"}
            alt="Image"
            width={1200}
            height={400}
            priority
            sizes="50vw"
            aspect={"horizontal"}
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Container>
      </Parallax>

      <Parallax speed={-2} className="self-end overflow-hidden">
        <Container>
          <StyledImage
            src={"https://picsum.photos/600?random=9"}
            alt="Image"
            width={600}
            height={400}
            sizes="50vw"
            aspect={"horizontal"}
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Container>
      </Parallax>

      <Parallax speed={-1} className="self-start">
        <Container>
          <StyledImage
            src={"https://picsum.photos/600?random=9"}
            alt="Image"
            width={600}
            height={400}
            sizes="50vw"
            aspect={"horizontal"}
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Container>
      </Parallax>

      <Parallax speed={-1} className="self-cetner">
        <Container>
          <StyledImage
            src={"https://picsum.photos/600?random=9"}
            alt="Image"
            width={600}
            height={400}
            sizes="50vw"
            aspect={"vertical"}
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Container>
      </Parallax>

      <Parallax speed={-2} className="self-end">
        <Container>
          <StyledImage
            src={"https://picsum.photos/800?random=9"}
            alt="Image"
            width={600}
            height={400}
            sizes="50vw"
            aspect={"horizontal"}
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Container>
      </Parallax>

      <Parallax speed={2} className="self-start">
        <Container>
          <StyledImage
            src={"https://picsum.photos/600?random=9"}
            alt="Image"
            width={600}
            height={400}
            sizes="50vw"
            aspect={"vertical"}
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Container>
      </Parallax>

      <Parallax speed={-1} className="self-center">
        <Container>
          <StyledImage
            src={"https://picsum.photos/800?random=9"}
            alt="Image"
            width={600}
            height={400}
            sizes="50vw"
            aspect={"horizontal"}
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Container>
      </Parallax>

      <Parallax speed={1} className="self-end">
        <Container>
          <StyledImage
            src={"https://picsum.photos/900?random=3"}
            alt="Image"
            width={600}
            height={400}
            sizes="50vw"
            aspect={"vertical"}
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Container>
      </Parallax>

      <Parallax speed={-12} className="self-start">
        <Container>
          <StyledImage
            src={"https://picsum.photos/600?random=3"}
            alt="Image"
            width={600}
            height={400}
            sizes="50vw"
            aspect={"horizontal"}
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Container>
      </Parallax>

      <Parallax speed={-1} className="self-center">
        <Container>
          <StyledImage
            src={"https://picsum.photos/600?random=3"}
            alt="Image"
            width={600}
            height={400}
            sizes="50vw"
            aspect={"vertical"}
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Container>
      </Parallax>
    </Wrapper>
  );
}
