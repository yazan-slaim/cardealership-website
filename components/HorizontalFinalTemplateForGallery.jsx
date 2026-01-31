"use client";
import React from "react";
import styled from "@emotion/styled";

const GalleryContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 600vw;
  height: 100vh;

  box-sizing: border-box;
  padding: 2rem;
  scroll-snap-type: x mandatory;
  z-index: 99000000000;
`;


const GalleryColumn = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: ${({ imagePosition }) => imagePosition};
  height: 100%;
  color: white;
  scroll-snap-align: start;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 250px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;
const ImageDuplicate = styled.img`
  position: absolute;
  left: 0;
  top: 0;          /* controls overflow direction */
  width: 400px;
  height: 600px;
  object-fit: cover;
  pointer-events: none;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  z-index: 2;
`;

export default function HorizontalFinalTemplateForGallery({ numColumns = 30 }) {
  const carImages = [
    "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
    "https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg",
    "https://images.pexels.com/photos/30832649/pexels-photo-30832649.jpeg",
    "https://images.pexels.com/photos/11822719/pexels-photo-11822719.jpeg",
    "https://images.pexels.com/photos/20495143/pexels-photo-20495143.jpeg",
    "https://images.pexels.com/photos/19067359/pexels-photo-19067359.jpeg",
    "https://images.pexels.com/photos/11685485/pexels-photo-11685485.jpeg",
    "https://images.pexels.com/photos/12142821/pexels-photo-12142821.jpeg",
    "https://images.pexels.com/photos/29355966/pexels-photo-29355966.jpeg",
    "https://images.pexels.com/photos/29734616/pexels-photo-29734616.jpeg",
     "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
    "https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg",
    "https://images.pexels.com/photos/30832649/pexels-photo-30832649.jpeg",
    "https://images.pexels.com/photos/11822719/pexels-photo-11822719.jpeg",
    "https://images.pexels.com/photos/20495143/pexels-photo-20495143.jpeg",
    "https://images.pexels.com/photos/19067359/pexels-photo-19067359.jpeg",
    "https://images.pexels.com/photos/11685485/pexels-photo-11685485.jpeg",
    "https://images.pexels.com/photos/12142821/pexels-photo-12142821.jpeg",
    "https://images.pexels.com/photos/29355966/pexels-photo-29355966.jpeg",
    "https://images.pexels.com/photos/29734616/pexels-photo-29734616.jpeg",
       "https://images.pexels.com/photos/29734616/pexels-photo-29734616.jpeg",
     "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
    "https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg",
    "https://images.pexels.com/photos/30832649/pexels-photo-30832649.jpeg",
    "https://images.pexels.com/photos/11822719/pexels-photo-11822719.jpeg",
    "https://images.pexels.com/photos/20495143/pexels-photo-20495143.jpeg",
    "https://images.pexels.com/photos/19067359/pexels-photo-19067359.jpeg",
    "https://images.pexels.com/photos/11685485/pexels-photo-11685485.jpeg",
    "https://images.pexels.com/photos/12142821/pexels-photo-12142821.jpeg",
    "https://images.pexels.com/photos/29355966/pexels-photo-29355966.jpeg",
    "https://images.pexels.com/photos/29734616/pexels-photo-29734616.jpeg",
  ];

  return (
    <GalleryContainer>
      {Array.from({ length: numColumns }).map((_, index) => {
        const imagePosition = index % 2 === 0 ? "flex-start" : "flex-end";
        const imageUrl = carImages[index % carImages.length];

        return (
     <GalleryColumn key={index} imagePosition={imagePosition}>
  <ImageWrapper>
    <Image
      src={`${imageUrl}?auto=compress&cs=tinysrgb&w=800`}
      alt={`Car Image ${index + 1}`}
      loading="lazy"
    />

    {index === 5 && (
      <ImageDuplicate
        src={`${imageUrl}?auto=compress&cs=tinysrgb&w=800`}
        alt=""
        aria-hidden
      />
    )}
  </ImageWrapper>
</GalleryColumn>

        );
      })}
    </GalleryContainer>
  );
}
