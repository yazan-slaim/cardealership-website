"use client";
import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";

const PageContainer = styled.button`
  all: unset; /* resets all default button styles */
  min-height: 100vh;
  padding-top: 28px;
  z-index: 2;
  background: black;
  display: block;
  text-align: left;
`;

const Title = styled.h1`
  margin-bottom: 15px;
  text-transform: uppercase;
  padding-left: 10px;
  font-size: 2.5rem;
`;

const SliderWrapper = styled.section`
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  font-family: "TrajanPro-Regular";
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  scroll-snap-align: start;
  padding: 0px 35px;
  display: flex;
  align-items: end;
  z-index: 2;
`;

const BottomStuff = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px 15px;
  width: 100%;
  z-index: 9;
  padding-bottom: 50px;

  h1 {
    font-size: 45px;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  }

  h2 {
    font-size: 32px;
    color: #141414;
    font-weight: 600;
  }
`;

const CarDetails = styled.div`
  display: flex;
  gap: 15px;

  span {
    font-size: 35px;
    color: #ffffff51;
    padding: 5px 10px;
  }
`;

const ActionButton = styled.div`
  padding: 10px 20px;
  border-radius: 25px;
  color: white;
  font-size: 15px;
  text-align: center;
  border: 1px solid white;
  transition: 0.3s;
  white-space: nowrap;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid white;
  }
`;

const StyledMotionDiv = styled(motion.div)`
  width: calc(100vw - 50px);
  height: calc(100% - 50px);
  object-fit: cover;
  position: absolute;
  top: 15px;
  left: 15px;
  transition: opacity 0.5s ease;
  border-radius: 10px;
  top: 0;
  z-index: 0;
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  overflow: hidden;
`;

export default function ThirdPage({ featuredcars }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const motionDivRef = useRef(null);
  const imageRef = useRef(null);

  if (!featuredcars || featuredcars.length === 0) {
    return (
      <PageContainer>
        <Title>Featured</Title>
        <p style={{ color: "white", padding: "20px" }}>
          No featured cars available.
        </p>
      </PageContainer>
    );
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "5%"]);

  const nextCar = () => {
    const nextIndex = (currentIndex + 1) % featuredcars.length;

    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentIndex(nextIndex);
        gsap.to(imageRef.current, {
          opacity: 1,
          duration: 0.5,
        });
      },
    });
  };

  useEffect(() => {
    gsap.fromTo(imageRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, [currentIndex]);

  return (
    <PageContainer>
      <Title>Featured</Title>
      <SliderWrapper ref={sectionRef}>
        <BottomStuff>
          <div>
            <h1>{featuredcars[currentIndex].title}</h1>
            <CarDetails>
              <span>
                {featuredcars[currentIndex].mileage} km mileage,{" "}
                {featuredcars[currentIndex].color} color, $
                {featuredcars[currentIndex].price}
              </span>
            </CarDetails>
          </div>
          <div>
            <ActionButton>View Details -{">"}</ActionButton>
          </div>
        </BottomStuff>

        <StyledMotionDiv style={{ top: y }}>
          <CarImage
            ref={imageRef}
            src={
              featuredcars[currentIndex].images[0]
              //"https://www.goodcarbadcar.net/wp-content/uploads/2023/05/Lucid-Air.webp"
            }
            onClick={nextCar}
          />
        </StyledMotionDiv>
      </SliderWrapper>
    </PageContainer>
  );
}
