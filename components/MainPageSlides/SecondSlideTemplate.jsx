"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { ArrowLongLeft } from "@/public/svgs/Arrow-Long-Left";
import { ArrowLongRight } from "@/public/svgs/Arrow-Long-Right";

const SliderWrapper = styled.section`
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
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 100px;
    z-index: 2;
    pointer-events: none; // Ensure clicks pass through to elements below
  }

  &:before {
    top: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1), transparent);
  }

  &:after {
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent);
    height: 100px;
  }
`;

const CarImage = styled.img`
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  object-fit: cover;
  position: absolute;
  top: 15px;
  left: 15px;
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.isvisible ? "1" : "0")};
  filter: brightness(100%);
  border-radius: 10px;
  &:hover {
  }
`;

const TextAndLogoFade = styled.div`
  transition: opacity 0.5s ease;
  opacity: ${({ hover }) => (hover ? 0.02 : 1)};
`;

const LogoBar = styled(TextAndLogoFade)`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  text-align: center;
`;

const Logo = styled.img`
  width: 100px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.3s ease;
  object-fit: contain;
  -webkit-filter: drop-shadow(5px 5px 5px #222);
  filter: drop-shadow(0px 0px 12px #222);
`;

const LogoUnderline = styled.div`
  height: 1px;
  background-color: ${({ selected }) =>
    selected ? "white" : "rgba(255, 255, 255, 0.5)"};
  width: 100%;
  position: absolute;
  bottom: -10px;
  left: 0;
`;

const LogoContainer = styled.div`
  display: inline-block;
  position: relative;
  padding: 0 10px;
  transition: opacity 0.5s ease;

  &:hover {
    opacity: 1;
  }
`;

const OtherDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: opacity 0.5s ease;
  opacity: ${({ hover }) => (hover ? 0.02 : 1)};
  z-index: 3;
`;
const Title = styled.h1`
  color: #fff;
  font-size: 33px;
  max-width: 500px;
  text-transform: uppercase;
  font-weight: 500;
`;
const SmallCircle = styled.span`
  height: 8px;
  width: 8px;
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
  margin: 0 10px;
  align-self: center;
`;

const BottomStuff = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  width: 100%;
  margin-bottom: 15px;
  color: #bbb;
  div {
    display: flex;
    gap: 25px;
  }
  p {
    display: flex;
  }
`;
const CarSlider = ({ featuredcars }) => {
  const [selectedCar, setSelectedCar] = useState(featuredcars[0].id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const selectedCarObj = featuredcars.find((car) => car.id === selectedCar);

  const handleCarClick = () => {
    const currentIndex = featuredcars.findIndex(
      (car) => car.id === selectedCar
    );
    const nextIndex = (currentIndex + 1) % featuredcars.length;
    setSelectedCar(featuredcars[nextIndex].id);
  };
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };
  return (
    <SliderWrapper className="hello">
      {featuredcars.map((car, carIndex) => (
        <React.Fragment key={car.id}>
          <CarImage
            key={car.id}
            src={car.images[selectedImageIndex]}
            alt={car.name}
            onClick={handleCarClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            isvisible={selectedCar === car.id}
            className="bye"
          />
          <OtherDetailsContainer hover={hover}>
            <BottomStuff>
              <div>
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    style={{
                      color: selectedImageIndex === index ? "white" : "gray",
                    }}
                  >
                    Image {index + 1}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p>${car.price}</p>
                <p>{car.mileage}</p>
                <p style={{ display: "flex", alignItems: "center" }}>
                  {car.title} <ArrowLongRight />
                </p>
              </div>
            </BottomStuff>
          </OtherDetailsContainer>
        </React.Fragment>
      ))}
    </SliderWrapper>
  );
};

export default CarSlider;
