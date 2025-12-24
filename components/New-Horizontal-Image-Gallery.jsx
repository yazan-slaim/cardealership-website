"use client";
import Image from "next/image";
import { useLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled from "@emotion/styled";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const NewStyledImage = styled.img`
  width: 600px;
  height: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  p {
    padding-top: 10px;
    max-width: 200px;
    font-size: 12px;
    color: #555;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-bottom: 100px;
`;

const Title = styled.h1`
  margin-bottom: 15px;
  text-transform: uppercase;
  padding-left: 10px;
  font-size: 3rem;
  color: black;
  position: relative;
  left: 10px;
`;

const NumberedColumn = styled.div`
  background-color: #0e0e0e; /* Very dark grey */
  width: 300px; /* Half the width of the image */
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  position: relative;
`;

const Number = styled.h1`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 0.8rem;
  color: #fff;
`;

const Description = styled.h1`
  font-size: 15px;
  color: #ddd;
  margin-top: auto;
`;

const ImagePair = styled.div`
  display: flex;
  align-items: stretch;
`;

// Data for dynamic rendering
const data = [
  {
    images: [
      { src: "https://picsum.photos/1200?random=1", aspect: "horizontal" },
      { src: "https://picsum.photos/600?random=2", aspect: "horizontal" },
    ],
    number: "(01)",
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    images: [
      { src: "https://picsum.photos/600?random=3", aspect: "horizontal" },
      { src: "https://picsum.photos/600?random=4", aspect: "vertical" },
    ],
    number: "(02)",
    paragraph:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    images: [
      { src: "https://picsum.photos/800?random=5", aspect: "horizontal" },
      { src: "https://picsum.photos/600?random=6", aspect: "vertical" },
    ],
    number: "(03)",
    paragraph: "Curabitur ut lectus ut odio suscipit efficitur.",
  },
  {
    images: [
      { src: "https://picsum.photos/800?random=7", aspect: "horizontal" },
      { src: "https://picsum.photos/900?random=8", aspect: "vertical" },
    ],
    number: "(04)",
    paragraph: "Ut enim ad minim veniam, quis nostrud exercitation.",
  },
  {
    images: [
      { src: "https://picsum.photos/600?random=9", aspect: "horizontal" },
      { src: "https://picsum.photos/600?random=10", aspect: "vertical" },
    ],
    number: "(05)",
    paragraph: "Duis aute irure dolor in reprehenderit in voluptate.",
  },
];

export default function NewHorizontalImageGallery() {
  const lenis = useLenis((scroll) => {
    // console.log(scroll)
  });
  const wrapperRef = useRef(null);
  const imageRefs = useRef([]);

  useGSAP(() => {
    const wrapper = wrapperRef.current;

    // Horizontal scroll pinning
    gsap.to(".pinned-title", {
      scrollTrigger: {
        trigger: wrapper,
        start: "top top", // Pin at the start
        end: () => `+=${wrapper.scrollWidth}`, // Pin until the end of the scrollable width
        scrub: true, // Smooth scrolling effect
        pin: true, // Pin the title in place
        anticipatePin: 1,
        horizontal: true, // Enable horizontal scroll pinning
      },
    });
  }, []);

  useEffect(() => {
    imageRefs.current.forEach((img) => {
      gsap.set(img, { y: 0 }); // Ensure initial position

      gsap.to(img, {
        y: -10,
        duration: 0.3,
        ease: "ease",
        paused: true,
        onStart: () => gsap.set(img, { y: 0 }), // Reset position on start
      });

      img.addEventListener("mouseover", () => gsap.to(img, { y: -10 }));
      img.addEventListener("mouseout", () => gsap.to(img, { y: 0 }));
    });

    return () => {
      imageRefs.current.forEach((img) => {
        img.removeEventListener("mouseover", () => gsap.to(img, { y: -10 }));
        img.removeEventListener("mouseout", () => gsap.to(img, { y: 0 }));
      });
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <div style={{ display: "flex", alignItems: "center", flex: ".3" }}>
        <Title className="pinned-title">GALLERY</Title>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: "1",
          marginBottom: "50px",
        }}
      >
        {data.map((item, index) => (
          <ImagePair key={index}>
            {item.images.map((img, imgIndex) => (
              <Container key={imgIndex}>
                <NewStyledImage
                  src={img.src}
                  alt={`Image ${imgIndex + 1}`}
                  ref={(el) => (imageRefs.current[imgIndex] = el)}
                />
              </Container>
            ))}

            <NumberedColumn>
              <Number>{item.number}</Number>
              <Description>{item.paragraph}</Description>
            </NumberedColumn>
          </ImagePair>
        ))}
      </div>
    </Wrapper>
  );
}
