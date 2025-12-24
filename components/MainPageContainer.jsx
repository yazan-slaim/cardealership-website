"use client"
import React, { useState, useEffect, useRef } from 'react';

import styled from "@emotion/styled";
import FirstSlide from '@/components/MainPageSlides/FirstSlide';
import CarSlider from '@/components/MainPageSlides/SecondSlide';
import { useActiveSection } from '@/contexts/ActiveSection';
import ThirdSlide from '@/components/MainPageSlides/ThirdSlide';

// Styled components
const Container = styled.div`
  overflow-y: scroll; // Ensure this is the scroll container
  height: 100vh; // Or adjust to the container's intended size
  scroll-snap-type: y mandatory; // Enable vertical snapping
  color:white;
`;

const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background-size: cover;
  scroll-snap-align: start;
  position: relative;
  color: white;

  /* Adding drop shadows */
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 10px; /* Adjust the height of the shadow */
    background: linear-gradient(to bottom, rgba(0,0,0,0.65), transparent);
    z-index: 2;
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.65), transparent);
  }
`;
const NavigationDots = styled.div`
  position: fixed;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 10;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? 'transparent' : 'white')};
  opacity: .5;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent; /* Ensure the space for the border in both states */
  
  /* Adjusting size and border for the active state */
  ${(props) =>
        props.isActive &&
        `
    width: 8px;
    height: 8px;
    border-color: white;
    margin: 2px; /* Adjust margin to center the dot within its original size plus border */
    opacity: 1;
  `}
`;

const Line = styled.div`
  height: 22px;
  width: 1px;
  background-color: #ddd;
  opacity: .5;
`;

export default function MainPageContainer() {
    const { currentSectionIndex, setCurrentSectionIndex } = useActiveSection();

    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(Number(entry.target.id.split('-')[1]));
                    }
                });
            },
            {
                // Adjust the root margin as needed to trigger changes sooner or later
                rootMargin: '0px',
                threshold: 0.5, // Trigger when 50% of the section is in view
            }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []);
    useEffect(() => {
        setCurrentSectionIndex(activeSection);


    }, [activeSection]);

    return (
        <Container>
            <NavigationDots>
                {[0, 1, 2].map((index, _, array) => (
                    <React.Fragment key={index}>
                        <Dot
                            isActive={index === activeSection}
                            onClick={() => {
                                document.getElementById(`section-${index}`).scrollIntoView({
                                    behavior: 'smooth',
                                });
                            }}
                        />
                        {index < array.length - 1 && <Line />}
                    </React.Fragment>
                ))}
            </NavigationDots>
            {[0, 1, 2].map((index) => (
                <Section
                    key={index}
                    id={`section-${index}`}
                    ref={(el) => (sectionRefs.current[index] = el)}
                >
                    {index == 0 ? <FirstSlide /> : <></>}
                    {index == 1 ? <CarSlider /> : <></>}
                    {index == 2 ? <ThirdSlide /> : <></>}
                </Section>
            ))}
        </Container>
    );
}