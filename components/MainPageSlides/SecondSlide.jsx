"use client"
import React, { useState } from 'react';
import styled from "@emotion/styled";

// Sample data for the cars. Replace with your actual data source
const cars = [
  { id: 1, name: '2017 Mercedes GLC500e Plug-in Hybrid', price: '$100,000', image: 'https://www.topgear.com/sites/default/files/2023/08/P90492179_highRes_bmw-i7-xdrive60-m-sp%20%281%29.jpg', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png' },
  { id: 2, name: 'Car B', price: '$200,000', image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/2022_Land_Rover_Range_Rover_SE_P440e_AWD_Automatic_3.0_Front.jpg', logo: 'https://logos-world.net/wp-content/uploads/2021/10/Land-Rover-Logo.png' },
  { id: 3, name: 'Car C', price: '$200,000', image: 'https://www.topgear.com/sites/default/files/2021/11/Mercedes_C300D_0000.jpg', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1024px-Mercedes-Logo.svg.png' },
  // Add more cars as needed
];
const SliderWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
    scroll-snap-align: start;
    background: black;

`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.5s ease;
  opacity: ${props => props.isvisible ? '1' : '0'};

`;

const TextAndLogoFade = styled.div`
  transition: opacity 0.5s ease;
  opacity: ${({ hover }) => hover ? 0.1 : 1}; // Adjust opacity based on hover
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
  background-color: ${({ selected }) => (selected ? 'white' : 'rgba(255, 255, 255, 0.5)')}; // White for selected, translucent for others
  width: 100%;
  position: absolute;
  bottom: -10px; // Adjust as needed
  left: 0;
`;
const DetailsContainer = styled.div`
  position: absolute;
  top: 140px; // Adjust this value to position the container directly under the logos
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  transition: opacity 0.5s ease;
  opacity: ${({ hover }) => hover ? 0.1 : 1}; // Adjust opacity based on hover
`;

const CarName = styled.h2`
  margin: 0;
  color: #fff;
  font-size: 24px;
  font-weight: normal;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.7);
`;
const LogoContainer = styled.div`
  display: inline-block;
  position: relative;
  padding: 0 10px;
  transition: opacity 0.5s ease;

  &:hover {
    opacity: 1; // Ensure the logo itself does not fade out on hover
  }
`;
const ViewDetailsButton = styled.button`
  margin-top: 10px; // Space between text and button
  padding: 10px 20px;
  border: none;
  border-radius: 20px; // Rounded edges
  background-color: #fff; // White background
  color: #000; // Text color
  font-size: 16px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #000; // Button color on hover
    color: #fff; // Text color on hover
  }
`;

const CarSlider = () => {
  const [selectedCar, setSelectedCar] = useState(cars[0].id);
  const selectedCarObj = cars.find(car => car.id === selectedCar);
  const [hover, setHover] = useState(false); // Track hover state
  // New state to track hoveing


  // Function to handle view details action
  const handleViewDetails = () => {
    alert('Viewing details for ' + (selectedCarObj ? selectedCarObj.name : ''));
    // Replace alert with your action, like navigation to a detail page.
  };

  return (
    <SliderWrapper>
      {cars.map(car => (
        <CarImage
          key={car.id}
          src={car.image}
          alt={car.name}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          isvisible={selectedCar == car.id}
        />
      ))}
      <LogoBar hover={hover}>
        {cars.map(car => (
          <LogoContainer key={car.id}>
            <Logo
              src={car.logo}
              alt={`${car.name} Logo`}
              onClick={() => setSelectedCar(car.id)}
            />
            <LogoUnderline selected={selectedCar === car.id} />
          </LogoContainer>
        ))}
      </LogoBar>
      <DetailsContainer hover={hover}>
        <CarName>{selectedCarObj ? selectedCarObj.name : ''}</CarName>
        <ViewDetailsButton onClick={handleViewDetails}>
          View Details →
        </ViewDetailsButton>
      </DetailsContainer>
    </SliderWrapper>
  );
};

export default CarSlider;
