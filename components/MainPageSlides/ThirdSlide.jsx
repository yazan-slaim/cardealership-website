'use client'
import React from 'react';
import styled from '@emotion/styled';
import bugatti from '@/public/images/bugatti.png'
import Image from 'next/image';
import Link from 'next/link';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { css } from '@emotion/react';

import '@splidejs/splide/dist/css/splide.min.css';
import { keyframes } from '@emotion/react';

const slideText = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
`;


const PageContainer = styled.section`
  height: 200vh;
  display: flex;
  flex-direction: column;
  background: black;
  margin-top: 30px;
  padding: 40px 50px;
  gap: 100px;
  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 20px; // Height of the shadow
    z-index: 2;
    pointer-events: none; // Ensure clicks pass through to elements below
  }

  &:before {
    top: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent);
  }

  &:after {
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
  }
`;
const reviews = [
  {
    id: 1,
    title: 'John Doe',
    text: 'I had a fantastic experience with the luxury car service. The attention to detail and customer service was exceptional.'
  },
  {
    id: 2,
    title: 'John Doe',
    text: 'I had a fantastic experience with the luxury car service. The attention to detail and customer service was exceptional.'
  },
  {
    id: 3,
    title: 'John Doe',
    text: 'I had a fantastic experience with the luxury car service. The attention to detail and customer service was exceptional.'
  },
  // ...more reviews
];



const UpperDiv = styled.div`
flex: 2;
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 45px;



`
const ContactUs = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 50px 0px 50px;
align-items: center;
justify-content: center;
h1{
    font-size: 42px;
    margin-bottom: 10px;
}
p{
    font-size: 16px;
    text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
}
div{
    max-width: 300px;
}
    
`
const marquee = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const SellCar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11vw;
  -webkit-text-stroke: 0.05vw white;
  color: transparent;
  padding: 20px 0;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: -2px;
  margin: 0 auto;
  text-align: center;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
  cursor: pointer;
    div{
        display: flex;
  align-items: center;
  white-space: nowrap;
  animation: ${marquee} 15s linear infinite;
    }
  &:hover div {
    animation-play-state: running;
  }
  .arrow-icon {
    width: 64px;
    height: 64px;
    margin-left: 20px;
  }
  
`;




const LowerDiv = styled.div`
flex: 2;
display:flex;
flex-direction: column;
justify-content: end;
align-items: center;
h1{
    font-size: 42px;
    margin-bottom: 50px;

}
p{
    font-size: 16px;
    text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
}
div{
    max-width: 500px;
}
`
const ExploreFurtherContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
justify-content: center;
flex-direction: column;

  h2 {
    font-size: 24px; 
    color: white;
    padding: 0 10px; 
    white-space: nowrap;
    text-align: center;
  }
`;
const ReviewsSection = styled.section`
  margin: 40px 0; 
  flex:2;
  display: flex;
  align-items: end;
  justify-content: end;
`;

const ReviewTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  


`;

const ReviewCard = styled.div`

  border-radius: 10px;
  padding: 20px;
  margin: 0 10px; 
  height: 200px;
  max-width:300px; 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div{
    display: flex;
    justify-content: space-evenly;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
  border: 1px solid white;

`;
const ReviewCarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 0 auto; 
  gap: 20px;
  padding-right: 40px;
`;
const arrowStyles = css`
  .splide__arrow {
    background: none; // Remove the default background
    color: white; // Set the color of the arrow icon to white
    width: auto; // Default width, adjust as necessary
    height: auto; // Default height, adjust as necessary
    &:hover {
      background: none; // Remove hover background
    }
    &.splide__arrow--prev {
      left: 10px; // Adjust the position from the left
    }
    &.splide__arrow--next {
      right: 10px; // Adjust the position from the right
    }
  }
  .splide__arrow svg {
    fill: white; // Set the SVG fill to white for arrow icons
  }
`;

export default function ThirdSlide() {
  return (
    <PageContainer css={arrowStyles}>
      <UpperDiv>
        <ExploreFurtherContainer>
          <h2>EXPLORE FURTHER</h2>

        </ExploreFurtherContainer>
        <SellCar>
          <div>
            <h1>SELL YOUR CAR</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="arrow-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
        </SellCar>

        <ContactUs>
          <div>
            <h1>Contact Us</h1>
            <p>Whether you need help buying or selling a car, please do not hesitate to contact us. We will be happy to assist you in any way we can and will get you the customer service you deserve.</p>
          </div>
        </ContactUs>
      </UpperDiv>

      <LowerDiv>
        <div>
          <h1>Discover our story and learn more about what makes us unique.
          </h1>
          <p>is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        </div>
      </LowerDiv>
      <ReviewsSection>
        <ReviewCarouselContainer>
          <ReviewTitle>Customer Reviews</ReviewTitle>
          <Splide
            options={{
              type: 'loop',
              perPage: 3,
              width: '90%',
              arrows: false,
              pagination: false,
              focus: 'center',


            }}
          >
            {reviews.map((review, index) => (
              <SplideSlide key={index}>
                <ReviewCard>
                  <h3>{review.title}</h3>
                  <p>{review.text}</p>
                  <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>

                  </div>
                </ReviewCard>
              </SplideSlide>
            ))}
          </Splide>
        </ReviewCarouselContainer>
      </ReviewsSection>
    </PageContainer >
  )


}
