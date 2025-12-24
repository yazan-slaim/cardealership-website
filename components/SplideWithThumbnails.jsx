'use client'
import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import gsap from 'gsap';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: black;
z-index: 1000;
    img{
        object-fit: cover;
    }
`;

const StyledSplide = styled(Splide)`
    width: 60%;
    height: 60%;
`;

const Thumbnails = styled(Splide)`
    width: 60%;
    margin-top: 10px;
`;
const CarDisplay = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background-size: auto;
  background-position: center;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;
const CarDisplayBackground = styled.img`
  width: 50%;
  height: 50%;
  object-fit:cover;`

export default function SplideWithThumbnails({ images }) {
    const mainSplideRef = useRef();
    const thumbSplideRef = useRef();

    const [expandedIndex, setExpandedIndex] = useState(null); // Track the expanded image
    const imageRefs = useRef([]); // Refs to access DOM nodes of images

    const toggleImageExpansion = (index) => {
        if (expandedIndex === index) {
            // Collapse the image
            gsap.to(imageRefs.current[index], {
                width: '50%',
                height: '50%',
            });
            setExpandedIndex(null);
        } else {
            // Expand the image
            gsap.to(imageRefs.current[index], {
                width: '100vw',
                height: '100vh',
            });
            setExpandedIndex(index);
        }
    };

    useEffect(() => {
        if (mainSplideRef.current && thumbSplideRef.current) {
            mainSplideRef.current.sync(thumbSplideRef.current.splide);
        }
    }, []);

    return (
        <Container>
            <StyledSplide
                options={{
                    type: 'fade',
                    heightRatio: 0.5,
                    pagination: false,
                    arrows: false,
                    cover: true,
                }}
                ref={mainSplideRef}
            >
                {images.map((img, index) => (
                    <SplideSlide key={index} onClick={() => toggleImageExpansion(index)}>
                        <CarDisplay style={{ background: "black" }}>
                            <CarDisplayBackground
                                ref={el => imageRefs.current[index] = el}
                                src={img}
                            />
                        </CarDisplay>
                    </SplideSlide>
                ))}

            </StyledSplide>

            <Thumbnails
                options={{
                    fixedWidth: 100,
                    fixedHeight: 64,
                    isNavigation: true,
                    gap: 10,
                    focus: 'center',
                    pagination: false,
                    cover: true,
                    drag: 'free',
                    arrows: false,
                    breakpoints: {
                        600: {
                            fixedWidth: 66,
                            fixedHeight: 40,
                        }
                    }
                }}
                ref={thumbSplideRef}
            >
                {images.map((img, index) => (
                    <SplideSlide key={index}>
                        <img src={img} alt={index} />
                    </SplideSlide>
                ))}
            </Thumbnails>
        </Container>
    );
}
