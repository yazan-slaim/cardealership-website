"use client";
import { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import FirstSlide from "./FinalMainPageComponents/FirstSlide";
import SecondPage from "./FinalMainPageComponents/SecondPage";
import ThirdPage from "./FinalMainPageComponents/ThirdPage";
import FourthPage from "./FinalMainPageComponents/FourthPage";
import SixthPage from "./FinalMainPageComponents/SixthPage";
import ScrollSection from "@/app/test/horizontalscroll-test/ScrollSection";
import { usePathname } from "next/navigation";
import { onPageEnter, onPageLeave } from "@/utils/animation";
import gsap from "gsap";
import HorizontalSCrollSection from "./HorizontalScrollSection";
import ThirdSlideFinalTemplate from "./MainPageSlides/ThirdSlideFinalTemplate";
import ExpandableRectangle from "./SideCard";
import FinalTemplateForGallery from "./FinalTemplateForGallery";

// Styled Container component
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export default function HomePage({ featuredcars }) {
  const mainRef = useRef(null);
  const pathname = usePathname();

/*
useEffect(() => {
  const parent = document.querySelector(".parent-container");

  if (pathname === "/") {
    if (!parent.contains(mainRef.current)) {
      parent.appendChild(mainRef.current);
    }

    // 👉 Only run animation if this is not a hard refresh
    if (sessionStorage.getItem("hasVisited")) {
      // Already visited: skip animation
      gsap.set(mainRef.current, {
        position: "relative",
        top: 0,
        marginTop: 0,
      });
    } else {
      // First direct visit: set flag and skip animation
      sessionStorage.setItem("hasVisited", "true");
      gsap.set(mainRef.current, {
        position: "relative",
        top: 0,
        marginTop: 0,
      });
    }
  } else {
    // Always animate when leaving
    onPageLeave(mainRef);
  }
}, [pathname]);
*/
  const demoFeaturedCars = [
    {
      title: "BMW i7 M70",
      mileage: 5000,
      color: "Black",
      price: 130000,
      images: [
        "https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-136-650b22851401e.jpg?crop=0.628xw:0.529xh;0.319xw,0.394xh&resize=1200:*"
      ],
    },
    {
      title: "Audi e-tron GT",
      mileage: 8000,
      color: "White",
      price: 120000,
      images: [
        "https://cdn.motor1.com/images/mgl/9m4RBp/s3/2025-audi-e-tron-gt.jpg"
      ],
    },
    {
      title: "Tesla Model S",
      mileage: 3000,
      color: "Red",
      price: 110000,
      images: [
        "https://hips.hearstapps.com/hmg-prod/images/2025-tesla-model-s-1-672d42e172407.jpg?crop=0.465xw:0.466xh;0.285xw,0.361xh&resize=1200:*"
      ],
    },
  ];
  return (
    <Container ref={mainRef}>
      <ExpandableRectangle />
      <FirstSlide />
      <SecondPage />
      <ThirdPage featuredcars={featuredcars} />
      <FourthPage />
      <SixthPage />
      <ScrollSection />
      <div style={{height: '70vh', width: '100vw'}}></div>
    </Container>
  );
}
