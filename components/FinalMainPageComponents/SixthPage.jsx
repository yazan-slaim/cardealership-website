"use client";
import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";

const PageContainer = styled.div`
  padding-top: 28px;
  position: relative;
  background: black;
  z-index: 2;
`;

const Title = styled.h1`
  margin-bottom: 15px;
  text-transform: uppercase;
  padding-left: 10px;
  font-size: 2.5rem;
  color: white;
`;

const Container = styled.button`
  display: flex;
  min-width: 200vw;
  height: 600px;
  position: relative;
  cursor: pointer;
`;

const Review = styled.div`
  position: absolute;
  padding: 10px;
  max-height: 500px;
  width: 350px;
  display: flex;
  color: white;
  flex-direction: column;
  opacity: 0;
  user-select: none;
`;

const Circle = styled.div`
  border-radius: 175px 175px 0 0;
  min-height: 175px;
  max-width: 350px;
  border-right: 1px solid white;
  border-top: 1px solid white;
  border-left: 1px solid white;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  h1 {
    font-size: 2rem;
  }
`;

const StarsWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const Square = styled.div`
  background: black;
  display: flex;
  width: 100%;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px;

  p {
    font-size: 13px;
    padding: 15px;
  }
`;

function Star({ filled, half, index }) {
  const gradientId = `half-grad-${index}`;

  if (half) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor="white" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 
             1.548 8.279L12 18.896l-7.484 4.517 
             1.548-8.279L0 9.306l8.332-1.151z"
          fill={`url(#${gradientId})`}
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path
        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 
           1.548 8.279L12 18.896l-7.484 4.517 
           1.548-8.279L0 9.306l8.332-1.151z"
        fill={filled ? "white" : "transparent"}
        stroke="white"
        strokeWidth="1"
      />
    </svg>
  );
}

function Stars({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} index={i} filled />);
    } else if (rating >= i - 0.5) {
      stars.push(<Star key={i} index={i} half />);
    } else {
      stars.push(<Star key={i} index={i} />);
    }
  }
  return <div style={{ display: "flex", gap: "4px" }}>{stars}</div>;
}

export default function SixthPage() {
  const containerRef = useRef(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [activeReviews, setActiveReviews] = useState([]);

  // 🔥 Fetch reviews dynamically from API
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    }
    fetchReviews();
  }, []);

  const handleContainerDoubleClick = (e) => {
    if (!reviews.length) return;

    e.preventDefault();
    e.stopPropagation();

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const reviewWidth = 200;
    const reviewHeight = 350;

    const newReview = {
      ...reviews[currentReviewIndex],
      x: x - reviewWidth / 2,
      y: y - reviewHeight / 2,
    };

    setActiveReviews((prev) => {
      let updated;
      if (prev.length === 3) {
        updated = prev.slice(1).concat(newReview);
      } else {
        updated = prev.concat(newReview);
      }
      return updated;
    });

    setCurrentReviewIndex((prevIndex) =>
      prevIndex + 1 >= reviews.length ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (activeReviews.length > 0) {
      const newReview = activeReviews[activeReviews.length - 1];
      animateReviewIn(newReview._id || newReview.id);
    }
  }, [activeReviews]);

  const animateReviewIn = (id) => {
    gsap.to(`#review-${id}`, { opacity: 1, duration: 0.5 });
  };

  return (
    <PageContainer>
      <Title>Reviews</Title>
      <Container ref={containerRef} onClick={handleContainerDoubleClick}>
        {activeReviews.map((review) => (
          <Review
            key={review._id || review.id}
            id={`review-${review._id || review.id}`}
            style={{ left: review.x, top: review.y }}
          >
            <Circle>
              <h1>{review.author}</h1>
              <Stars rating={review.rating} />
            </Circle>
            <Square>
              <p>{review.text}</p>
            </Square>
          </Review>
        ))}
      </Container>
    </PageContainer>
  );
}
