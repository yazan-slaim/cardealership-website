"use client";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import nicecar from "@/public/images/C-Class-White.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechSlider from "./TechSlider";
import SplideWithThumbnails from "./SplideWithThumbnails";
import { motion, useScroll, useTransform } from "framer-motion";
import RightSmallContentBlock from "./EnumBlocks/RightSmallContentBlock";
import LeftSmallContentBlock from "./EnumBlocks/LeftSmallContentBlock";
import MakeItYours from "./MakeItYours";
import { useLenis } from "@studio-freight/react-lenis";
import SmoothScrolling from "./SmoothScroll";
import Parallax from "./Parallax";
import { usePathname } from "next/navigation";
import html2canvas from "html2canvas";
import { Car } from "@/models/Car";
import { useTransitionRouter } from "next-view-transitions";
import FinanceCalculator from "./FinanceCalculator";



const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  z-index: 12;
`;

const CarDisplay = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage}) ` : `white;`};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;
const CarDisplayBackground = styled.img`
  object-fit: cover;
`;
const ToggleButton = styled.button`
  position: absolute;
  opacity: 0;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  opacity: 0.5;
  transition: 0.5s;
  z-index: 20;
  font-size: 13px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    opacity: 1;
  }
`;
const StyledDiv = styled.div`
  height: 100vh;
  margin: 20px;
  border: 1px solid black;
`;

const ActiveDivIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  padding: 10px;
  font-family: "Halton-light-italic";
  font-size: 12px;
  z-index: 99;
  color: darkgrey;
`;

const Title = styled.h1`
  font-size: 13vw;
  line-height: 1;
  text-transform: uppercase;
  position: absolute;
  white-space: nowrap;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5, 2);
  margin: 0 auto;
  color: transparent;
  font-family: sans-serif;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GalleryContainer = styled.div`
  position: relative;
  max-width: 100vw;
  height: 100vh;
  margin: auto; /* Center the gallery */
`;
const ThumbnailsContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  background-color: #000;
  position: absolute;
  width: 100%;
  bottom: 10px;
  left: 50%;
  height: 64px;
  transform: translateX(-50%);
  z-index: 22;
  opacity: ${({ show }) => (show ? 1 : 0)};
  max-height: ${({ show }) => (show ? "64px" : "0")};
  transition: opacity 0.5s, max-height 0.5s;
  * {
    width: 100%;
    height: 100%;
  }
`;
const ThumbnailCarDisplay = styled(CarDisplay)`
  height: 64px; // Set the height for the thumbnail display
  background-size: cover; // Make sure the car image fits inside the container
  // Adjust child elements as necessary for the smaller size
  & > h1 {
    font-size: smaller; // Reduce the font size of titles for thumbnails
    // Add any other necessary styles for child elements
  }
  & > img {
    height: auto;
    max-height: 100%; // Make sure the image doesn't exceed the thumbnail height
  }
`;
const LogoImage = styled.img`
  height: 30px;
  width: auto;
  position: absolute;
  bottom: 5vh;
  left: 50%;
  z-index: 9;
  transform: translateX(-50%);
`;

const StyledImage = styled(Image)`
  z-index: 5;
  width: auto;
  height: 300px;
  position: absolute;
  object-fit: cover;
  top: 72%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const GlobalStyles = createGlobalStyle`
    body {
        overflow: ${({ isGlanceOpen }) => (isGlanceOpen ? "hidden" : "auto")}; 
    }
`;
const OtherStyledImage = styled.img`
  z-index: 5;
  width: auto;
  height: 350px;
  position: absolute;
  object-fit: cover;
  top: 72%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PurchaseCard = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: auto;
  transition: all 0.3s ease-in-out;

  width: 100%;
  z-index: 5;
`;
const PurchaseCardTop = styled.div`
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;

  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;
const PurchaseCardTopDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px 30px;

  h1 {
    font-size: 33px;
  }
  h2 {
    font-size: 26px;
  }
  p {
    font-size: 16px;
  }
  div {
    display: flex;
    gap: 10px;
  }
`;
const PurchaseCardButtons = styled.div`
  display: flex;
  flex-direction: column;

  a {
    flex: 1;
    padding: 15px 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    text-transform: uppercase;
    cursor: none;
  }
`;

const PurchaseCardGlance = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow-y: ${({ isOpen }) => (isOpen ? "auto" : "hidden")};
  background: ${({ isOpen }) => (isOpen ? "black" : "transparent")};
  display: none;
  top: 0;

  z-index: 999;

  h1 {
    font-size: 19px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 30px;
  }
  height: ${({ isOpen }) => (isOpen ? "99vh" : "60px")};
  transition: all 0.5s ease-in-out;
`;
const GlanceContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  flex: 1;
  padding: 50px;
  overflow-y: scroll;
  background: black;
  height: auto;
  div {
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 20px;
      font-weight: 600;
    }
    h3 {
      font-weight: 600;
    }
    div {
      margin: 20px 0px;
      min-width: 450px;
      max-width: 450px;
      gap: 10px;
    }
  }
`;
const CarDetails = styled.div`
  padding: 100px 0 0 0px;
  min-height: 100vh;
  width: 100%;

  margin-top: ${({ marginTop }) => marginTop}px;
  overflow: hidden;
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 150px 0px 0px 0px;
  position: relative;
`;

const CarContainerLeft = styled.div`
  width: 100%;
  height: fit-content;
  margin: 20px 0px;

  position: relative;
  display: flex;
  justify-content: left;
`;
const CarBackgroundContainer = styled.div`
  box-shadow: inset 0 0 160px 160px rgba(0, 0, 0, 1);
  height: 700px;
  aspect-ratio: 13/9;
  background: ${({ imageUrl }) => `url(${imageUrl})`};

  background-size: contain;
  background-position: center;
  position: relative;
  margin-left: 80px;
`;

const CarContainerSmallLeft = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: start;
`;
const CarContainerSmallRight = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: end;
`;
const CarContainerRight = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: end;
  margin: 20px 0px;
`;

const MainTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  max-width: 600px;
  background: black;
  z-index: 10;
  p {
    font-size: 16px;
    text-align: center;
  }
  h1 {
    font-size: 33px;
    text-align: center;
    white-space: nowrap;
    opacity: 0;
  }
  span {
    opacity: 0;
    font-size: 16px;
    text-align: center;
  }
`;
const MiddleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  p {
    max-width: 550px;
  }
  h3 {
    font-size: 26px;
  }
`;
const VerticalLine = styled.div`
  border-left: 1px solid white;
  height: 0px;
  position: relative;
`;
const MinorMiddleTextContainer = styled.div`
  opacity: 0;

  display: flex;
  flex-direction: column;
  max-width: 400px;
  background: black;
  z-index: 10;
  padding: 20px 0;

  h1 {
    font-family: "Halton-regular";
  }

  h1 {
    font-size: 24px;
    font-weight: 400;
    text-transform: uppercase;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
    margin-left: 4px;
    line-height: 1.3rem;
    max-width: 400px;
  }
`;
const MinorTextContainer = styled.div`
  position: relative;
  width: 100%;
  right: 0px;
  bottom: 0px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: start;
  * {
    text-align: start;
  }
`;
const Line = styled.div`
  border-left: 1px solid white;
  height: 0px;
  position: absolute;
  top: 0;
`;

const HorizontalLine = styled.div`
  width: 0px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.384);
  margin-top: 15px;
`;
const CarMinorTextContainer = styled.div`
  position: absolute;
  right: 50px;
  width: 400px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 10px;
  z-index: 100;

  div {
    h3 {
      font-size: 24px;
      font-weight: 400;
      text-transform: uppercase;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      margin-top: 5px;
      margin-left: 4px;
      line-height: 1.3rem;
    }
  }
`;
const CarMinorTextContainerRight = styled.div`
  position: absolute;
  left: 50px;
  top: 50%;
z-index: 100;
  transform: translateY(-50%);
  width: 400px;
  display: flex;
  gap: px;
  div {
    padding-left: 8px;
    h3 {
      font-size: 24px;
      font-weight: 400;
      text-transform: uppercase;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      margin-top: 5px;
      margin-left: 4px;
      line-height: 1.3rem;
    }
  }
`;
const CarMinorTextContainerLeft = styled.div`
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  width: 400px;
  display: flex;
  gap: 10px;
  z-index: 100;

  div {
    h3 {
      font-size: 24px;
      font-weight: 400;
      text-transform: uppercase;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      margin-top: 5px;
      margin-left: 4px;
      line-height: 1.3rem;
    }
  }
`;
const CarouselWrapper = styled.div`
  .splide {
    width: 75vw;
    height: 600px;
    padding: 30px;
    margin-bottom: 100px;

    .splide__arrow {
      background-color: #fff;
      color: red;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .splide__pagination {
      bottom: 120px;
      .splide__pagination__page {
        background-color: black;
        width: 12px;
        height: 12px;
      }
    }
  }
`;
const LastPart = styled.div`
  display: flex;
  height: 1000px;
  margin-top: 150px;
`;
const RightLastPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 4rem;

  height: 100%;
  box-sizing: border-box;
  flex: 1;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  span {
    color: #333;
    font-size: 1.2rem;
    font-weight: 600;
  }

  h1 {
    color: #1a1a1a;
    font-size: 2.5rem;
    margin: 0.5rem 0;
  }

  p {
    color: #666;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  button {
    padding: 1rem 2rem;
    margin-right: 1rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #000;
    border: none;
    transition: background-color 0.3s ease;

    &:first-of-type {
      background-color: #ffffff;
      color: black;
      &:hover {
        background-color: #000;
        color: white;
      }
    }

    &:hover {
      background-color: #ffffff;
      color: black;
    }
  }
`;

const LeftLastPart = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;
const StyledHeading = styled.h1`
  padding: 80px 0px 0px 50px;
  font-size: 2rem;
`;
const BigSquare = styled.div`
  flex: 2;
  background: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-position: center;
  background-size: cover;
`;

const Rectangle = styled.div`
  flex: 1;
  background: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-position: center;
  background-size: cover;
`;

const SmallSquareContainer = styled.div`
  display: flex;
  flex: 1;
`;

const SmallSquare = styled.div`
  flex: 1;
  background: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-position: center;
  background-size: cover;
`;

const CarBackgroundContainerRight = styled.div`
  opacity: 0;
  box-shadow: inset 0 0 160px 160px rgba(0, 0, 0, 1);
  height: 700px;
  aspect-ratio: 13/9;
  background: ${({ imageUrl }) => `url(${imageUrl})`};

  background-size: contain;
  background-position: center;
  position: relative;
  margin-right: 80px;
`;
const CarBackgroundContainerRightSmall = styled.div`
  box-shadow: 200px 0px 110px 150px black inset;
  margin: 10px 0px;
  height: 600px;
  aspect-ratio: 12/5;
  background: ${({ imageUrl }) => `url(${imageUrl})`};

  background-size: cover;
  background-position: center;
  position: relative;
  filter: brightness(70%);
`;
const CarBackgroundContainerLeftSmall = styled.div`
  margin: 10px 0px;

  box-shadow: -200px 0px 110px 150px black inset;
  height: 600px;
  aspect-ratio: 12/5;
  background: ${({ imageUrl }) => `url(${imageUrl})`};

  background-size: cover;
  background-position: center;
  position: relative;
  filter: brightness(70%);
`;
const CarSlide = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;
const CarSlideImage = styled.div`
  background: ${({ imageUrl }) => `url(${imageUrl}) center/cover no-repeat`};

  flex: 7;
`;
const EngineTextContainer = styled.div`
  opacity: 0;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  background: black;
  margin-bottom: 100px;
  padding: 100px 50px;
  min-width: 80%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin: 50px 0;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 11px;

    h1 {
      font-size: 24px;
      font-weight: 400;
      text-transform: uppercase;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      margin-top: 5px;
      margin-left: 4px;
      line-height: 1.3rem;
    }
  }
`;
const ScrollToTheTopButton = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 10px;
  display: none  !important;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  z-index: 999;
  font-family: "TrajanPro-Regular";
  &:hover {
    * {
      color: white;
    }
  }
  * {
    color: darkgrey;
    transition: color 0.3s;
  }
  svg {
    width: 30px;
    height: 30px;
  }
`;
const ViewAtAGlance = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  padding: 10px;
  font-family: "TrajanPro-Bold";
  text-transform: uppercase;
  z-index: 99;
  //display: flex;
  flex-direction: column;
  gap: 10px;
  display: none !important;
    .actions {
    color: ${(props) => (props.isContentVisible ? "white" : "darkgrey")};
    transition: color 0.3s;

    &:hover {
      color: white;
    }
  }
`;
const Content = styled.div`
  color: darkgrey;
  opacity: ${(props) => (props.isContentVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isContentVisible ? "auto" : "none")};
  transition: color 0.3s, opacity 0.3s;
  display: flex;
  flex-direction: column;
  gap: 5px;
  div {
    color: darkgrey;
    transition: color 0.3s;

    &:hover {
      color: white;
    }
  }
`;
const ChildPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 50px 0 0 0;
`;
const NewRectangle = styled.div`
  position: relative;
  opacity: 0;
  right: 0;
  height: 700px;
  aspect-ratio: 13/9;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transition: width 0.5s ease;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  border: 10px solid black;
  box-shadow: inset 0 0 170px 180px rgba(0, 0, 0, 1);

  h1 {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    left: 20px;
    font-size: 5rem;
    span {
      display: inline-block;
      transform: translateY(100%);
    }
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    box-shadow: inset 0 0 170px 180px rgba(0, 0, 0, 1);
  }
`;

const NewStyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  overflow: hidden;
`;
const StyledMotionDiv = styled(motion.div)`
  position: absolute;
  height: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
`;
const FullscreenGallery = styled.div`
  position: fixed;
  inset: 0;
  background: white;
  z-index: 2147483647;
  overflow-y: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: translateY(100%);
  opacity: 0;

  .gallery-row {
    display: flex;
    gap: 20px;
    height: 400px;
  }

  .gallery-item {
    flex: 1;
    border-radius: 10px;
    overflow: hidden;
    border: 4px solid white;
    background: #f3f3f3;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }
`;



export default function DynamicProduct(props) {
console.log(props.product)
  const router = useTransitionRouter();
function slideInOut() {
  document.documentElement.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0.2, transform: "translateY(-35%)" },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}

  const [isContentVisible, setIsContentVisible] = useState(false);

  const lenis = useLenis((scroll) => {});
  const [isGlanceOpen, setIsGlanceOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [marginTop, setMarginTop] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(40);
  const [scrollUp, setScrollUp] = useState(true);
  const purchaseCardRef = useRef(null);
  const [fontSize, setFontSize] = useState(17);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [ishovering, setIsHovering] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname()
  const eventBuffer = useRef([]); // Stores interactions before sending
const lastMoveTime = useRef(0);
const heatmapInstance = useRef(null);
const heatmapContainer = useRef(null);
const [heatmapVisible, setHeatmapVisible] = useState(false);
const [screenshotData, setScreenshotData] = useState(null);
const screenshotContainer = useRef(null);
const [screenshotWidth, setScreenshotWidth] = useState(null);
const [screenshotHeight, setScreenshotHeight] = useState(null);
const [isWrapGalleryOpen, setIsWrapGalleryOpen] = useState(false);
const galleryRef = useRef(null);

useEffect(() => {
  if (heatmapContainer.current) {
    heatmapContainer.current.style.position = "absolute";
    heatmapContainer.current.style.top = "0";
    heatmapContainer.current.style.left = "0";
    heatmapContainer.current.style.height = `${screenshotHeight}px`;

    heatmapContainer.current.style.width = "100vw";
    heatmapContainer.current.style.pointerEvents = "none";
    heatmapContainer.current.style.zIndex = "10000";
  }
}, []);
useEffect(() => {
  if (heatmapVisible && heatmapContainer.current) {
    // Initialize heatmap only when container is available
    heatmapInstance.current = h337.create({
      container: heatmapContainer.current,
      radius: 30,
      maxOpacity: 0.6,
      minOpacity: 0.1,
      blur: 0.75,
    });
    heatmapContainer.current.style.position = "absolute";


    fetchHeatmapData(); // Fetch data when heatmap is shown
  }

  return () => {
    if (heatmapInstance.current) {
      heatmapInstance.current.setData({ data: [] }); // Clear data on unmount
      heatmapInstance.current = null;
    }
  };
}, [heatmapVisible]);

const normalizeCoords = (x, y) => {
  const width = document.documentElement.scrollWidth;
  const height = document.documentElement.scrollHeight;
  return {
    x: (x / width) * 100,  // Normalize to percentage of screen width
    y: (y / height) * 100  // Normalize to percentage of screen height
  };
};


const sendData = async () => {
  if (eventBuffer.current.length === 0) return;

  try {
      //console.log("Batch sent:", JSON.stringify(eventBuffer.current, null, 2));

    const response = await fetch("/api/heatmap/postheatmap", {
      method: "POST",
      body: JSON.stringify(eventBuffer.current),
    });

    if (!response.ok) {
      console.error("Failed to send heatmap data");
    }
  } catch (error) {
    console.error("Error sending heatmap data:", error);
  }

  eventBuffer.current = []; // Clear buffer after sending
};


const handleInteraction = (type, x, y) => {
  const { x: normX, y: normY } = normalizeCoords(x, y);
  eventBuffer.current.push({ type, x: normX, y: normY, pathname });

  if (eventBuffer.current.length >= 10) sendData(); // Send every 10 interactions
};

const handleClick = (e) => handleInteraction("click", e.pageX, e.pageY);

const handleMouseMove = (e) => {
  const now = Date.now();
  if (now - lastMoveTime.current < 500) return; // Limit movement tracking
  lastMoveTime.current = now;
  handleInteraction("move", e.pageX, e.pageY);
};

useEffect(() => {
  window.addEventListener("click", handleClick);
  window.addEventListener("mousemove", handleMouseMove);
  
  const interval = setInterval(sendData, 5000); // Log every 5s
  return () => {
    clearInterval(interval);
    window.removeEventListener("click", handleClick);
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);

  const getImage = (index) =>
    props.product.images[index] || props.product.images[0];

  const mainSliderRef = useRef();
  const thumbnailSliderRef = useRef();

  const handleThumbnailClick = (index) => {
    mainSliderRef.current.splide.go(index);
    setGalleryVisible(false);
    setActiveIndex(index);
  };

  const titleRef = useRef(null);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const galleryImages = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
  ];
  const verticalLineRef = useRef(null);

  useLayoutEffect(() => {
    const pages = Object.values(props.product.pages);

    pages.forEach((_, index) => {
      const pageElement = document.querySelector(`#page-container-${index}`);
      const childPageElement = document.querySelector(
        `#child-page-container-${index}`
      );
      const lineElement = pageElement.querySelector(`#line-${index}`);
      const VerticalLineElement = pageElement.querySelector(
        `#vertical-line-${index}`
      );

      if (lineElement && childPageElement) {
        gsap.fromTo(
          lineElement,
          { height: "initial" },
          {
            height: "100%",
            scrollTrigger: {
              trigger: childPageElement,
              start: "top center",
              end: "bottom center",
              scrub: 14,
              markers: false,
              toggleActions: "none restart none restart",
            },
          }
        );
      }
      if (VerticalLineElement) {
        gsap.to(VerticalLineElement, {
          height: "183px",
          duration: 1,
          scrollTrigger: {
            trigger: VerticalLineElement,
            start: "top center+=400",
            end: "bottom center",
            markers: false,
          },
        });
      }
    });

    ScrollTrigger.refresh();
  }, []);

  const adjustTitleSize = () => {
    if (titleRef.current) {
      const maxWidth = titleRef.current.parentElement.offsetWidth;
      const actualWidth = titleRef.current.scrollWidth;
      if (actualWidth > maxWidth) {
        setFontSize((fontSize * maxWidth) / actualWidth);
      }
    }
  };
  const titles = ["luxury", "technology", "comfort", "performance"];







  useEffect(() => {
    adjustTitleSize();
    // Add resize event listener
    window.addEventListener("resize", adjustTitleSize);
    return () => {
      // Clean up resize event listener
      window.removeEventListener("resize", adjustTitleSize);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const fixedPosition = window.innerHeight;

      // Determine if the scroll is upwards or downwards
      const scrollingUp = position < lastScrollY;
      setScrollUp(scrollingUp);
      setLastScrollY(position); // Update last scroll position

      const shouldBeFixed = position >= fixedPosition;
      if (shouldBeFixed !== fixed) {
        setFixed(shouldBeFixed);
        if (shouldBeFixed && purchaseCardRef.current) {
          setMarginTop(purchaseCardRef.current.offsetHeight);
        } else {
          setMarginTop(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fixed, lastScrollY]);
  const pagesArray = Object.values(props.product.pages);
  gsap.registerPlugin(ScrollTrigger);
  const [activeDiv, setActiveDiv] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pageContainers = document.querySelectorAll(".page-container");
    const pages = Object.values(props.product.pages);
    pageContainers.forEach((container, index) => {
      const pageTitle = titles[index];
  //    console.log(pageTitle)

      gsap.from(container, {
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom bottom",
          onEnter: () => setActiveDiv(`${pageTitle}`),
          onLeave: () => setActiveDiv(""),
          onEnterBack: () => setActiveDiv(`${pageTitle}`),
          onLeaveBack: () => setActiveDiv(""),
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  const [expandedIndex, setExpandedIndex] = useState(null); // Track the expanded image
  const imageRefs = useRef([]); // Refs to access DOM nodes of images

  const toggleImageExpansion = (index) => {
    if (expandedIndex === index) {
      // Collapse the image
      gsap.to(imageRefs.current[index], {
        width: "50%",
        height: "50%",
        duration: 0.5,
      });
      setExpandedIndex(null);
    } else {
      // Expand the image
      gsap.to(imageRefs.current[index], {
        width: "100vw",
        height: "100vh",
        duration: 0.5,
      });
      setExpandedIndex(index);
    }
  };
  const sectionRef = useRef(null);
  const motionDivRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const imageContainerRefs = useRef([]);
  imageContainerRefs.current = [];
  const textContainerRefs = useRef([]);
  textContainerRefs.current = [];

  const lineAndTextRefs = useRef([]);
lineAndTextRefs.current = [];

const addLineAndTextRef = (el) => {
  if (el && !lineAndTextRefs.current.includes(el)) {
    lineAndTextRefs.current.push(el);
  }
};

  const addToImageRefs = (el) => {
    if (el && !imageContainerRefs.current.includes(el)) {
      imageContainerRefs.current.push(el);
    }
  };
  const addToTextRefs = (el) => {
    if (el && !textContainerRefs.current.includes(el)) {
      textContainerRefs.current.push(el);
    }
  };
  const lineRefs = useRef([]);
  lineRefs.current = [];

  useEffect(() => {
    lineRefs.current.forEach((line, index) => {
      gsap.fromTo(
        line,
        { width: "0px" },
        {
          width: "150px",
          scrollTrigger: {
            trigger: line,
            start: "top center",
            toggleActions: "play none none none",
            markers: false,
          },
        }
      );
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !lineRefs.current.includes(el)) {
      lineRefs.current.push(el);
    }
  };

  useEffect(() => {
    imageContainerRefs.current.forEach((el, index) => {
      gsap.to(el, {
        autoAlpha: 1,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top center",
          end: "bottom top",
          toggleActions: "play none none none",
          once: true,
          markers:false,
        },
      });
    });
    textContainerRefs.current.forEach((el, index) => {
      gsap.to(el, {
        x: "0%",
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top center",
          end: "bottom top",
          toggleActions: "play none none none",
          once: true,
          markers:false,

        },
      });
    });
  }, []);
useEffect(() => {
  const blurTarget = document.querySelector("#page-wrapper");
  if (!galleryRef.current) return;

  const galleryEl = galleryRef.current;
 const header = document.querySelector(".NewHeader") || document.querySelector("header") || document.querySelector("[data-header]");
  
  //if (!header) return;
  if (isWrapGalleryOpen) {
    // 🚨 Stop Lenis loop to restore native scroll
    lenis?.stop?.();
gsap.to(header, {
      y: "-100%",
      opacity: 0,
      duration: 0.6,
      ease: "power3.inOut",
      pointerEvents: "none",
    });
    // Allow body scroll inside gallery
    document.body.style.overflow = "hidden";
    galleryEl.style.overflowY = "auto";
    galleryEl.style.pointerEvents = "auto";

    gsap.to(galleryEl, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
    });

    gsap.to(blurTarget, {
      filter: "blur(10px) brightness(0.6)",
      duration: 0.8,
    });
  } else {
    // Resume Lenis loop
    lenis?.start?.();
gsap.to(header, {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      ease: "power3.inOut",
      pointerEvents: "auto",
    });
    document.body.style.overflow = "";
    galleryEl.style.pointerEvents = "none";
    galleryEl.style.overflowY = "hidden";

    gsap.to(galleryEl, {
      y: "100%",
      opacity: 0,
      duration: 0.8,
      ease: "power4.in",
    });

    gsap.to(blurTarget, {
      filter: "blur(0px) brightness(1)",
      duration: 0.6,
    });
  }
}, [isWrapGalleryOpen]);



useEffect(() => {
  lineAndTextRefs.current.forEach((obj) => {
    if (obj.type !== "line") return;

    const line = obj.el;

    const textObj = lineAndTextRefs.current.find(
      (ref) => ref.index === obj.index && ref.type === "text"
    );
    if (!textObj) return;

    const text = textObj.el;

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: line,
        start: "center center",
        markers: false,
      },
    });

    tl.addLabel("lineStart")
      .fromTo(
        line,
        { width: 0 },
        {
          width: "150px",
          autoAlpha: 1,
          duration: 1,
          ease: "power1.out",
        }
      )

      // TEXT ANIMATION — fade + slide from left
      .addLabel("textStart", ">+=0.1")
      .fromTo(
        text,
        {
          autoAlpha: 0,
          x: -8,              // <--- starts 40px left
        },
        {
          autoAlpha: 1,
          x: 0,                // <--- ends at natural position
          duration: 1.2,
          ease: "power2.out",
        },
        "textStart"
      )

      .addLabel("end");
  });
}, []);



  useEffect(() => {
    gsap.set("#opacity", { opacity: 0, display: "none" });

    ScrollTrigger.create({
      trigger: "#purchasecard",
      start: "bottom top",
      toggleActions: "play none none reverse",
      onEnter: () => {
        gsap.set("#opacity", { display: "flex" });
        gsap.to("#opacity", { opacity: 1, duration: 0.5, ease: "power1.out" });
      },
      onLeaveBack: () => {
        gsap.to("#opacity", {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
          onComplete: () => gsap.set("#opacity", { display: "none" }),
        });
      },
    });
  }, []);

  const getRandomLayout = (images) => {
  const rows = [];
  let i = 0;

  while (i < images.length) {
    const groupSize = Math.floor(Math.random() * 3) + 1; // 1 to 3
    rows.push(images.slice(i, i + groupSize));
    i += groupSize;
  }

  return rows;
};

  return (
    <>
      <GlobalStyles isGlanceOpen={isGlanceOpen} />

      <Wrapper id="last-image">
        <GalleryContainer
        /*
          style={{
            opacity: isGalleryOpen ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
            */
        >
         {/*
          <ToggleButton onClick={() => setGalleryVisible((prev) => !prev)}>
            View Images
          </ToggleButton>
*/}
<ToggleButton onClick={() => setIsWrapGalleryOpen(true)}>
  {props.product.images.length} Images
</ToggleButton>


          <Splide
            options={{
              type: "slide",
              heightRatio: 0.5,
              pagination: false,
              arrows: false,
              cover: true,
              height: "100vh",
              autoplay: true,
              interval: 5000,
              autoplay: true,
              speed: 2500,
              pauseOnHover: true,
              pauseOnFocus: true,
              resetProgress: false,
              lazyLoad: true,
              rewind: true,
            }}
            ref={mainSliderRef}
          >
            <SplideSlide>
              <CarDisplay>
                <Title>{props.product.model}</Title>

                <LogoImage src={props.product.logoImage} />
              </CarDisplay>
            </SplideSlide>
            {props.product.images.map((img, index) => (
              <SplideSlide key={index} onClick={() => ""}>
                <CarDisplay backgroundImage={img}></CarDisplay>
              </SplideSlide>
            ))}
          </Splide>
          {/*
          <ThumbnailsContainer show={galleryVisible}>
            <Splide
              options={{
                isNavigation: true,
                gap: 10,
                focus: "center",
                pagination: false,
                cover: true,
                arrows: false,
                drag: "free",
                perPage: 10,
                width: "100%",
                lazyLoad: true,
              }}
              ref={thumbnailSliderRef}
            >
              <SplideSlide
                onClick={() => handleThumbnailClick(0)}
              ></SplideSlide>

              {props.product.images.map((img, index) => (
                <SplideSlide
                                  className="hovering-button"
                  key={index}
                  onClick={() => handleThumbnailClick(index + 1)}
                  style={{
                    border:
                      activeIndex - 1 === index ? "2px solid white" : "none",
                    cursor: "none",
                  }}
                >
                  <img
                  className="hovering-button"
                    src={img}
                    alt={`Thumbnail ${index}`}
                    style={{
                      border: "1px solid red",
                      cursor: "none",
                    }}
                  />
                </SplideSlide>
              ))}
            </Splide>b
          </ThumbnailsContainer>
*/}
        </GalleryContainer>
{/* Fullscreen Gallery */}
<div
  ref={galleryRef}
  className="lenis-ignore"
  data-lenis-prevent
  style={{
    position: "fixed",
    inset: 0,
    background: "white",
    zIndex: 2147483647,
    overflowY: "hidden", // <-- hidden by default
    overflowX: "hidden",
    WebkitOverflowScrolling: "touch",
    overscrollBehavior: "contain",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    transform: "translateY(100%)",
    opacity: 1,
    transition: "transform 0.8s cubic-bezier(0.87, 0, 0.13, 1)",
    paddingTop: "100px"
  }}
>


  {/* Close button */}
  <ToggleButton
    style={{
      position: "relative",
      color: "white",
      fontSize: "18px",
      zIndex: 10,
    }}
    onClick={() => setIsWrapGalleryOpen(false)}
  >
    Close
  </ToggleButton>

  {(() => {
    const layoutPattern = [2, 3, 2, 1]; // ✅ repeating pattern
    const rows = [];
    let i = 0;
    let patternIndex = 0;

    while (i < props.product.images.length) {
      const groupSize = layoutPattern[patternIndex % layoutPattern.length];
      rows.push(props.product.images.slice(i, i + groupSize));
      i += groupSize;
      patternIndex++;
    }

    return rows.map((row, rowIndex) => (
      <div
        key={rowIndex}
        style={{
          display: "flex",
          gap: "20px",
          height: "400px", // ✅ uniform height per row
          width: "100%",
          justifyContent: "center",
        }}
      >
        {row.map((img, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            <img
              src={img}
              alt={`Car image ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        ))}
      </div>
    ));
  })()}
</div>



        <PurchaseCard fixed={fixed} ref={purchaseCardRef} id="purchasecard">
          <PurchaseCardTop isCollapsed={fixed || isGlanceOpen}>
            <PurchaseCardTopDetails>
              <h1>{props.product.title}</h1>
              <h2>Price JOD{props.product.price}</h2>
              <p>
                From £{props.product.pricePerMonth} (Hire Purchase) per month
              </p>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <p>+962795283923</p>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <p> San Francisco, California, USA.</p>
              </div>
            </PurchaseCardTopDetails>
         <PurchaseCardButtons>
      <a
        href={`/enquiry/${props.product._id}`}
        onClick={(e) => {
          e.preventDefault();
          router.push(`/enquiry/${props.product._id}`, { onTransitionReady: slideInOut });
        }}
      >
        enquire now
      </a>

      <a
        href={`/testdrive/${props.product._id}`}
        onClick={(e) => {
          e.preventDefault();
          router.push(`/testdrive/${props.product._id}`, { onTransitionReady: slideInOut });
        }}
      >
        test drive
      </a>
    </PurchaseCardButtons>
          </PurchaseCardTop>
        </PurchaseCard>

        <CarDetails marginTop={100}>
          {Object.values(props.product.pages).map((page, index) => (
            <PageContainer
              id={`page-container-${index}`}
              className="page-container"
              key={index}
              data-id={index}
            >
              <MainTextContainer>
                <p style={{ fontFamily: "Halton-light-italic" }}>
                {titles[index]}
                </p>
                <VerticalLine id={`vertical-line-${index}`} />
                <h1 ref={addToImageRefs}>{page.h2Title}</h1>

                <span ref={addToImageRefs}>{page.intro}</span>
              </MainTextContainer>
              <ChildPageContainer id={`child-page-container-${index}`}>
                <Line ref={verticalLineRef} id={`line-${index}`} />

                {page.splide && <TechSlider data={page.splide} />}
                {page.blocks &&
                  Array.isArray(page.blocks) &&
                  page.blocks.map((block, blockIndex) => {
                    if (block.enum) {
                      switch (block.enum) {
                        case "center":
                          return (
                            <CarContainerLeft>
                              <NewRectangle ref={addToImageRefs}>
                                <StyledMotionDiv style={{ top: y }}>
                                  <NewStyledImage
                                    src={block.image}
                                    alt="Overview"
                                  />
                                </StyledMotionDiv>
                              </NewRectangle>
                              <CarMinorTextContainer>
                                <Parallax speed={-0.5}>
                                  <HorizontalLine key={index} ref={addToRefs} />
                                  <div
                                    ref={addToImageRefs}
                                    style={{
                                      opacity: "0",
                                    }}
                                  >
                                    <h3>{block.title}</h3>
                                    <p>{block.description}</p>
                                  </div>
                                </Parallax>
                              </CarMinorTextContainer>
                            </CarContainerLeft>
                          );
                        case "right":
                          return (
                            <CarContainerRight>
                              <CarBackgroundContainerRight
                                ref={addToImageRefs}
                                imageUrl={block.image}
                              />

                              <CarMinorTextContainerRight>
                                <Parallax speed={-0.5}>
<HorizontalLine ref={(el) => addLineAndTextRef({ type: "line", el })} />
                              <div
  ref={(el) => addLineAndTextRef({ type: "text", el })}
  style={{ opacity: 0 }}
>
  <h3>{block.title}</h3>
  <p>{block.description}</p>
</div>

                                </Parallax>
                              </CarMinorTextContainerRight>
                            </CarContainerRight>
                          );
                        case "small-right":
                          return <RightSmallContentBlock block={block} />;
                        case "small-left":
                          return <LeftSmallContentBlock block={block} />;
                        default:
                          return null;
                      }
                    } else {
                      return (
                        <MinorMiddleTextContainer ref={addToImageRefs}>
                          <h1>{block.title}</h1>
                          <p>{block.description}</p>
                        </MinorMiddleTextContainer>
                      );
                    }
                    return null;
                  })}
                {page.title == "Performance" && (
                  <EngineTextContainer ref={addToImageRefs}>
                    <div>
                      <h1>Engine Type</h1>
                      <h2>4 cylinder</h2>
                    </div>
                    <div>
                      <h1>Displacement</h1>
                      <h2>{props.product.engineSize} CC</h2>
                    </div>
                    <div>
                      <h1>Horsepower</h1>
                      <h2>394hp</h2>
                    </div>
                  </EngineTextContainer>
                )}
              </ChildPageContainer>
            </PageContainer>
          ))}
          <StyledHeading> {props.product.title} AT A GLANCE</StyledHeading>
          <GlanceContent isOpen={isGlanceOpen}>
            <div>
              <div>
                <h2>What defines this car body?</h2>
                <p>Car-Make: {props.product.carMake}</p>
                <p>Year: {props.product.year}</p>
                <p>Model: {props.product.model}</p>
                <p>Trim: {props.product.trim}</p>
                <p>Body-Type: {props.product.bodyType}</p>

                <p>Regional-Specs: {props.product.regionalSpecs}</p>
              </div>
              <div>
                <h2>How is the engine and transmission?</h2>
                <p>Cylinders: 4</p>
                <p>Displacement: {props.product.engineSize} cc</p>
                <p>HorsePower: not provided</p>
                <p>Fuel: {props.product.fuel}</p>
                <p>Transmission: {props.product.transmission}</p>
              </div>
              <div>
                <h2>How safe is this car?</h2>
                <p>Lane Keeping Assist</p>
                <p>Collision Prevention System</p>
                <p>Blind Spot Sensors</p>
                <p>Auto Park</p>
                <p>Rearview Camera</p>
              </div>

              <div>
                <h2>What to Discover more?</h2>
                <h3>Additional Features:</h3>
                {props.product.extra.map((feature) => (
                  <p>{feature}</p>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h2>What's the color of the car, and is the paint original?</h2>
                <p>Color: {props.product.color}</p>
                <p>
                  Original-Paint:{" "}
                  {props.product.paint ? "original" : "not original"}
                </p>
              </div>
              <div>
                <h2>What's the history behind this car? </h2>
                <p>Mileage: {props.product.mileage}</p>
                <p>
                  License Status:{" "}
                  {props.product.carLicense ? "Active" : "Inactive"}
                </p>
                <p>
                  Customs History:{" "}
                  {props.product.carCustoms ? "Imported" : "No customs"}
                </p>
              </div>
              <div>
                <h2>What's the financial breakdown? </h2>
                <p>Price: ${props.product.price}</p>
                <p>Payment Options: {props.product.paymentMethod}</p>
                <p>Insurance Coverage: {props.product.insurance}</p>
              </div>
              <div>
                <h2>
                  What makes this car unique? Discover its interior and exterior
                  options.
                </h2>
                <h3>Exterior Options:</h3>
                {props.product.exteriorOptions.map((option) => (
                  <p>{option}</p>
                ))}
                <h3>Interior Options:</h3>
                {props.product.interiorOptions.map((option) => (
                  <p>{option}</p>
                ))}
              </div>
            </div>
          </GlanceContent>
                    <FinanceCalculator price={props.product.price} />
          <MakeItYours
            mileage={props.product.mileage}
            color={props.product.color}
            price={props.product.price}
            title={props.product.title}
            year={props.product.year}
            background={props.product.images[1]}
          />
        </CarDetails>
        {/*
                <LastPart>
                    <LeftLastPart>
                        <BigSquare backgroundImage={getImage(0)} />
                        <Rectangle backgroundImage={getImage(1)} />
                        <SmallSquareContainer>
                            <SmallSquare backgroundImage={getImage(2)} />
                            <SmallSquare backgroundImage={getImage(3)} />
                        </SmallSquareContainer>
                    </LeftLastPart>
                    <RightLastPart>
                        <div>
                            <span>MAKE IT YOURS</span>
                            <h1>EXPERIENCE THE {props.product.title}</h1>
                            <p>{props.product.lastPageDescription}</p>
                            <button>Start Shopping</button>
                            <button>Contact Dealer</button>
                        </div>

                    </RightLastPart>

                </LastPart>
                */}
      </Wrapper>
      <ActiveDivIndicator id="opacity">{activeDiv}</ActiveDivIndicator>
      <ScrollToTheTopButton
        onClick={() => lenis.scrollTo("#last-image", { lerp: 0.09 })}
        id="opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
          />
        </svg>
        <span>SCROLL TO TOP</span>
      </ScrollToTheTopButton>
      <ViewAtAGlance isContentVisible={isContentVisible} id="opacity">
        <div
          className="actions"
          onClick={() => setIsContentVisible(!isContentVisible)}
        >
          (Actions)
        </div>
        <Content isContentVisible={isContentVisible}>
          <div onClick={() => setIsGlanceOpen(!isGlanceOpen)}>
            {props.product.title} AT A GLANCE
          </div>
          <div>ENQUIRE NOW FOR JOD{props.product.price}</div>
          <div>TEST DRIVE</div>
        </Content>
      </ViewAtAGlance>
    </>
  );
}
