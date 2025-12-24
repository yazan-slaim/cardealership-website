"use client";
import React from "react";
import styled from "@emotion/styled";

const GalleryContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 300vw;
  height: 100vh;
  overflow-x: auto;
  box-sizing: border-box;
  padding: 2rem;
  scroll-snap-type: x mandatory; /* smooth snapping */
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

const Image = styled.img`
  width: 400px;
  height: 250px;
  object-fit: cover;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
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
            <Image
              src={`${imageUrl}?auto=compress&cs=tinysrgb&w=800`} 
              alt={`Car Image ${index + 1}`}
              loading="lazy" // ✅ lazy-load offscreen images
            />
          </GalleryColumn>
        );
      })}
    </GalleryContainer>
  );
}
