'use client'
import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { createGlobalStyle } from 'styled-components';

import Image from 'next/image'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import nicecar from '@/public/images/C-Class-White.png'




const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    z-index: 12;
    background: black;
  
`
const CarDisplay = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${({ backgroundImage }) => backgroundImage ? `url(${backgroundImage}) ` : '#ede6d8'};
  background-size: cover;
  background-position:center;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;
const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7); 
  color: white;
  padding: 10px 20px;
  border-radius: 20px; 
  opacity: .5;
  transition: opacity 0.5s;
  z-index: 20;
  font-size: 13px;
  border: 1px solid rgba(255, 255, 255, 0.632);

  
  &:hover {
    background-color: rgba(0, 0, 0, 0.9); 
  }
`;
const Title = styled.h1`
  font-size: 13vw; 
  line-height: 0.8;  
  text-transform: uppercase;
  position: absolute;
  white-space: nowrap;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1, 2.5);
  margin: 0 auto; 
  color: black;
    
`;

const GalleryContainer = styled.div`
  position: relative;
  max-width: 100vw; 
  height: 100vh;
  margin: auto; /* Center the gallery */
 
`;
const ThumbnailsContainer = styled.div`
  display: flex;
  justify-content: center; /* Center thumbnails horizontally */
  overflow: hidden;
  flex-wrap: wrap; /* Allow thumbnails to wrap */
  gap: 10px; /* Space between thumbnails */
  padding: 10px; /* Padding around thumbnails */
  background-color: #000; 
  position: absolute;
  width: 100%; 
  bottom: 10px;
  left: 50%;
  height: 64px;
  transform: translateX(-50%); /* Center thumbnails container */
  z-index: 22;
  opacity: ${({ show }) => (show ? 1 : 0)};
  max-height: ${({ show }) => (show ? '64px' : '0')};
  transition: opacity 0.5s, max-height 0.5s;
  *{
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
`

const StyledImage = styled(Image)`
  z-index: 5;
  width: auto;
  height: 300px;
  position: absolute;
  object-fit: cover;
  top: 72%;
  left: 50%;
  transform: translate(-50%, -50%);

`
const GlobalStyles = createGlobalStyle`
    body {
        overflow: ${({ isGlanceOpen }) => (isGlanceOpen ? 'hidden' : 'auto')}; 
    }
`;
const OtherStyledImage = styled.img`
  z-index: 5;
  width: auto;
  height: 300px;
  position: absolute;
  object-fit: cover;
  top: 72%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const PurchaseCard = styled.div`
  display: flex;
  flex-direction: column;
  position: ${({ fixed }) => (fixed ? 'fixed' : 'static')}; // Start as static
  top: ${({ fixed }) => (fixed ? '0' : 'auto')};
  transition: all 0.3s ease-in-out;

  width: 100%;
  z-index: 5;
  background: black;
 
`;
const PurchaseCardTop = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease-in-out;
    max-height: ${({ isCollapsed }) => (isCollapsed ? '0' : '300px')}; 
   
    overflow: hidden; 
`;
const PurchaseCardTopDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px 30px;

    h1{
        font-size: 33px;
    }
    h2{
        font-size: 26px;
    }
    p{
        font-size: 16px;
    }
    div{
        display: flex;
        gap: 10px;
    }
`
const PurchaseCardButtons = styled.div`
display: flex;
flex-direction: column;


button{
    flex: 1;
    padding: 15px 160px;
    border: 1px solid rgba(255, 255, 255, 0.3) ;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    text-transform: uppercase;
    cursor: none;
}
`

const PurchaseCardGlance = styled.div`
  display: flex;
    flex-direction: column;
    border: 1px solid rgba(255, 255, 255, 0.3) ;
    overflow-y: ${({ isOpen }) => isOpen ? 'auto' : 'hidden'};

z-index: 99;

    h1{
        font-size: 19px;
    }

    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        padding: 30px;
    }
    height: ${({ isOpen }) => (isOpen ? '99vh' : '60px')};
    transition: all 0.5s ease-in-out;
`
const GlanceContent = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    flex: 1;
    padding: 50px;
    overflow-y: auto;
    div{
        display: flex;
        flex-direction: column;
        flex: 1;
        h2{
            font-size: 20px;
            font-weight: 600;
        }
        h3{
            font-weight: 600;

        }
        div{
            margin: 20px 0px;
            min-width: 450px;
            max-width: 450px;
            gap: 10px;

        }
        
    }
`
const CarDetails = styled.div`
padding: 100px 0px;
min-height: 100vh;
  width: 100%;
 
  margin-top: ${({ marginTop }) => marginTop}px;
  overflow: hidden;


   
`
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 250px 0px 0px 0px;


    
`

const CarContainerCenter = styled.div`


width: 100%;
height: fit-content;
padding: 50px;
margin: 40px 0px;

position: relative;
display: flex;
justify-content: center;



`;
const CarBackgroundContainer = styled.div`

  box-shadow: inset 0 0 160px 200px rgba(0, 0, 0, 1);    
  height: 650px;
    aspect-ratio: 8/5;
    background: ${({ imageUrl }) => `url(${imageUrl})`};
    background-size: cover;
    background-position: center;
    position: relative;
    filter: brightness(100%);

`



const CarContainerSmallLeft = styled.div`


width: 100%;
height: fit-content;
position: relative;
display: flex;
justify-content: start;
align-items: start;
padding: 50px;
margin: 40px 0px;


`;
const CarContainerSmallRight = styled.div`
width: 100%;
height: fit-content;
position: relative;
display: flex;
justify-content: end;
align-items: end;
padding: 50px 0px;
margin: 40px 0px;

 
`;
const CarContainerRight = styled.div`


width: 100%;
height: fit-content;
position: relative;
display: flex;
justify-content: end;
align-items: end;
padding: 50px 0px;
margin: 40px 0px;

  
  
`;


const MainTextContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: 70px;
    p{
        font-size: 16px;
       text-align: center;
       max-width: 50%;
    }
    h1{
        font-size: 33px;
        text-align: center;
    }
    
`
const MiddleTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    p{
        max-width: 550px;
        
    }
    h3{
        font-size: 26px;
    }
`
const MinorMiddleTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
   
 

h1{
    font-size: 24px;
    white-space: nowrap;
    font-weight: 400;
    text-transform: uppercase;
  
}
p{
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
    margin-left: 4px;
    line-height:1.3rem;
    max-width: 400px;

}

`
const MinorTextContainer = styled.div`
        position: relative;
        width: 100%;
        right: 0px;
        bottom: 0px;
       width: 400px;
       display: flex;
       flex-direction: column;
       align-items: start;
       *{
        text-align: start;
       }
       

    
`
const Line = styled.div`

border-left: 1px solid white;
  height: 183px;`


const HorizontalLine = styled.div`
  min-width: 80px; // Adjust the width of the line as needed
  height: 1px; // Adjust the height according to your needs
  background-color: rgba(255, 255, 255, 0.384); // Set the line color: ;
  margin-top: 15px;
`;
const CarMinorTextContainer = styled.div`
 position: absolute;
        right: 50px;
        bottom: 50px;
       width: 400px;
       display: flex;
       gap: 10px;
       div{

h3{
    font-size: 24px;
    white-space: nowrap;
    font-weight: 400;
    text-transform: uppercase;
  
}
p{
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
    margin-left: 4px;
    line-height:1.3rem;
}
}
   
       
`
const CarMinorTextContainerRight = styled.div`
 position: absolute;
        left: 50px;
        top: 50px;
       width: 400px;
       display: flex;
       gap: 10px;
       div{

h3{
    font-size: 24px;
    white-space: nowrap;
    font-weight: 400;
    text-transform: uppercase;
  
}
p{
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
    margin-left: 4px;
    line-height:1.3rem;
}
}
    
`
const CarMinorTextContainerLeft = styled.div`
 position: absolute;
        right: 50px;
        top: 50px;
       width: 400px;
       display: flex;
       gap: 10px;
       div{

h3{
    font-size: 24px;
    white-space: nowrap;
    font-weight: 400;
    text-transform: uppercase;
  
}
p{
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
    margin-left: 4px;
    line-height:1.3rem;
}
}
   
    
`
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
`
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

    }

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const LeftLastPart = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
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
  box-shadow: inset 0 0 160px 160px rgba(0, 0, 0, 1);    
      height: 700px;
    aspect-ratio: 13/10;
  background: ${({ imageUrl }) => `url(${imageUrl})`};

    background-size: cover;
    background-position: center;
    position: relative;
    margin-right:80px;
    filter: brightness(80%);
`
const CarBackgroundContainerRightSmall = styled.div`
    box-shadow: 200px 0px 110px 150px black inset;
    height: 500px;
    aspect-ratio: 12/5;
    background: ${({ imageUrl }) => `url(${imageUrl})`};

    background-size: cover;
    background-position: center;
    position: relative;
    filter: brightness(70%);
`
const CarBackgroundContainerLeftSmall = styled.div`
    box-shadow: -200px 0px 110px 150px black inset;
    height: 500px;
    aspect-ratio: 12/5;
    background: ${({ imageUrl }) => `url(${imageUrl})`};

    background-size: cover;
    background-position: center;
    position: relative;
    filter: brightness(70%);
   
    
`
const CarSlide = styled.div`
position: relative; 
width: 100%;
height: 100%;
gap: 10px;
display: flex;
flex-direction: column;

`
const CarSlideImage = styled.div`
  background: ${({ imageUrl }) => `url(${imageUrl}) center/cover no-repeat`};

flex: 7;
    
`
const EngineTextContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    position: absolute;
        bottom: 50px;
        div{
            display: flex;
            flex-direction: column;
            align-items: center;
    
            gap: 10px;

h1{
    font-size: 24px;
    white-space: nowrap;
    font-weight: 400;
    text-transform: uppercase;
  
}
p{
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
    margin-left: 4px;
    line-height:1.3rem;
}
}
`


export default function DynamicProduct(props) {
    console.log(props.product)
    const [isGlanceOpen, setIsGlanceOpen] = useState(false);
    const [fixed, setFixed] = useState(false);
    const [marginTop, setMarginTop] = useState(0);
    const [lastScrollY, setLastScrollY] = useState(40);
    const [scrollUp, setScrollUp] = useState(true);
    const purchaseCardRef = useRef(null);
    const [fontSize, setFontSize] = useState(17);
    const [galleryVisible, setGalleryVisible] = useState(false);
    const [ishovering, setIsHovering] = useState(true)
    const [isGalleryOpen, setIsGalleryOpen] = useState(true)
    const getImage = (index) => props.product.images[index] || props.product.images[0];



    const mainSliderRef = useRef();
    const thumbnailSliderRef = useRef();

    const handleThumbnailClick = (index) => {
        mainSliderRef.current.splide.go(index);
        setGalleryVisible(false)
    };


    const titleRef = useRef(null);
    const [showGallery, setShowGallery] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const galleryImages = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
    ];

    const adjustTitleSize = () => {
        if (titleRef.current) {
            const maxWidth = titleRef.current.parentElement.offsetWidth;
            const actualWidth = titleRef.current.scrollWidth;
            if (actualWidth > maxWidth) {
                setFontSize((fontSize * maxWidth) / actualWidth);
            }
        }
    };

    useEffect(() => {
        adjustTitleSize();
        // Add resize event listener
        window.addEventListener('resize', adjustTitleSize);
        return () => {
            // Clean up resize event listener
            window.removeEventListener('resize', adjustTitleSize);
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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fixed, lastScrollY]);
    return (
        <>
            <GlobalStyles isGlanceOpen={isGlanceOpen} />

            <Wrapper>
                <GalleryContainer

                    style={{ opacity: isGalleryOpen ? 1 : 0, transition: 'opacity 0.5s ease' }}
                >            <Splide
                    options={{
                        heightRatio: 0.5,
                        pagination: false,
                        arrows: false,
                        cover: true,
                        height: '100vh',
                        type: 'loop',


                    }}
                    ref={mainSliderRef}
                >
                        <SplideSlide>
                            <CarDisplay backgroundImage={'https://static.vecteezy.com/system/resources/previews/002/157/120/non_2x/white-empty-room-abstract-background-horizontal-template-for-design-vector.jpg'}>
                                <Title>
                                    {props.product.model}
                                </Title>
                                <OtherStyledImage src={'https://bluesky-cogcms.cdn.imgeng.in/media/zlllzzo0/range-rover-hse-standard-wheelbase.png'} placeholder="blur" alt="limo" />


                                <LogoImage src={props.product.logoImage} />
                            </CarDisplay>
                        </SplideSlide>
                        {props.product.images.map((img, index) => (
                            <SplideSlide key={index}>
                                <CarDisplay backgroundImage={img} />
                            </SplideSlide>
                        ))}

                    </Splide>


                    <ThumbnailsContainer show={galleryVisible}>
                        <Splide
                            options={{
                                isNavigation: true,
                                gap: 10,
                                focus: 'center',
                                pagination: false,
                                cover: true,
                                arrows: false,
                                drag: 'free',
                                perPage: 10,
                                width: '100%'

                            }}
                            ref={thumbnailSliderRef}
                        >

                            <SplideSlide onClick={() => handleThumbnailClick(0)}>

                            </SplideSlide>

                            {props.product.images.map((img, index) => (
                                <SplideSlide key={index} onClick={() => handleThumbnailClick(index + 1)}>
                                    <img src={img} alt={`Thumbnail ${index}`} />
                                </SplideSlide>
                            ))}
                        </Splide>
                    </ThumbnailsContainer>


                </GalleryContainer>
                <PurchaseCard fixed={fixed} ref={purchaseCardRef}>
                    <PurchaseCardTop isCollapsed={fixed || isGlanceOpen}>


                        <PurchaseCardTopDetails>
                            <h1>{props.product.title}
                            </h1>
                            <h2>Price JOD{props.product.price}</h2>
                            <p>
                                From £{props.product.pricePerMonth} (Hire Purchase) per month
                            </p>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                <p>+962795283923</p>

                            </div>


                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />

                                </svg>
                                <p> San Francisco, California, USA.</p>
                            </div>
                        </PurchaseCardTopDetails>
                        <PurchaseCardButtons>
                            <button>enquire now</button>
                            <button>test drive</button>
                        </PurchaseCardButtons>
                    </PurchaseCardTop>
                    <PurchaseCardGlance onClick={() => setIsGlanceOpen(!isGlanceOpen)} isOpen={isGlanceOpen}>
                        <header>
                            <h1>THE {props.product.trim} AT A GLANCE
                            </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </header>
                        <GlanceContent>
                            <div>
                                <div>
                                    <h2>
                                        What defines this car body?
                                    </h2>
                                    <p>Car-Make: {props.product.carMake}</p>
                                    <p>Year: {props.product.year}</p>
                                    <p>Model: {props.product.model}</p>
                                    <p>Trim: {props.product.trim}</p>
                                    <p>Body-Type: {props.product.bodyType}</p>

                                    <p>Regional-Specs: {props.product.regionalSpecs}</p>
                                </div>
                                <div>
                                    <h2>
                                        How is the engine and transmission?
                                    </h2>
                                    <p>Cylinders: 4</p>
                                    <p>Displacement: {props.product.engineSize} cc</p>
                                    <p>HorsePower: not provided</p>
                                    <p>Fuel: {props.product.fuel}</p>
                                    <p>Transmission: {props.product.transmission}</p>
                                </div>
                                <div>
                                    <h2>
                                        How safe is this car?
                                    </h2>
                                    <p>Lane Keeping Assist</p>
                                    <p>Collision Prevention System</p>
                                    <p>Blind Spot Sensors</p>
                                    <p>Auto Park</p>
                                    <p>Rearview Camera</p>
                                </div>
                                <div>
                                    <h2>
                                        What makes this car unique? Discover its interior and exterior options.
                                    </h2>
                                    <h3>Exterior Options:</h3>
                                    {props.product.exteriorOptions.map(option => (
                                        <p>{option}</p>
                                    ))}
                                    <h3>Interior Options:</h3>
                                    {props.product.interiorOptions.map(option => (
                                        <p>{option}</p>
                                    ))}
                                </div>
                                <div>
                                    <h2>
                                        What to Discover more?
                                    </h2>
                                    <h3>Additional Features:</h3>
                                    {props.product.extra.map(feature => (
                                        <p>{feature}</p>
                                    ))}

                                </div>
                            </div>
                            <div>
                                <div>
                                    <h2>What's the color of the car, and is the paint original?</h2>
                                    <p>Color: {props.product.color}</p>
                                    <p>Original-Paint: {props.product.paint ? 'original' : 'not original'}</p>
                                </div>
                                <div>
                                    <h2>What's the history behind this car? </h2>
                                    <p>Mileage: {props.product.mileage}</p>
                                    <p>License Status: {props.product.carLicense ? 'Active' : 'Inactive'}</p>
                                    <p>Customs History: {props.product.carCustoms ? 'Imported' : 'No customs'}</p>
                                </div>
                                <div>
                                    <h2>What's the financial breakdown? </h2>
                                    <p>Price: ${props.product.price}</p>
                                    <p>Payment Options: {props.product.paymentMethod}</p>
                                    <p>Insurance Coverage: {props.product.insurance}</p>
                                </div>
                            </div>
                        </GlanceContent>


                    </PurchaseCardGlance>
                </PurchaseCard>
                <CarDetails marginTop={marginTop}>

                    {props.product.pages.map((page, index) => (
                        <PageContainer key={index}>
                            <MainTextContainer>
                                <p style={{ fontFamily: 'Halton-light-italic' }}>{page.title}</p>
                                <Line></Line>
                                <h1>{page.h2Title}</h1>
                                <p>{page.intro}
                                </p>
                            </MainTextContainer>

                            {page.splide && (
                                <CarouselWrapper>
                                    <Splide
                                        options={{
                                            width: '75vw',
                                            height: '600px',
                                            gap: '1rem',
                                            cover: true,
                                            type: 'loop',
                                            pagination: true,
                                            arrows: true,
                                        }}
                                    >
                                        {page.splide.map((splideslide, index) => (
                                            <SplideSlide key={index}>
                                                <CarSlide>
                                                    <CarSlideImage imageUrl={splideslide.img} />
                                                    <MiddleTextContainer>
                                                        <h3>{splideslide.title}</h3>
                                                        <p>{splideslide.description}</p>
                                                    </MiddleTextContainer>
                                                </CarSlide>
                                            </SplideSlide>
                                        ))}
                                    </Splide>
                                </CarouselWrapper>
                            )}
                            {page.blocks && Array.isArray(page.blocks) && (
                                page.blocks.map((block, blockIndex) => {
                                    if (block._type === 'contentBlock') {
                                        switch (block.enum) {
                                            case 'center':
                                                return <CarContainerCenter>

                                                    <CarBackgroundContainer imageUrl={block.img}>

                                                    </CarBackgroundContainer>

                                                    <CarMinorTextContainer>
                                                        <HorizontalLine></HorizontalLine>
                                                        <div>
                                                            <h3>{block.title}</h3>
                                                            <p>{block.description}</p>
                                                        </div>
                                                    </CarMinorTextContainer>

                                                </CarContainerCenter>;
                                            case 'right':
                                                return <CarContainerRight>

                                                    <CarBackgroundContainerRight imageUrl={block.img} />

                                                    <CarMinorTextContainerRight>
                                                        <HorizontalLine></HorizontalLine>
                                                        <div>
                                                            <h3>{block.title}</h3>
                                                            <p>{block.description}</p>
                                                        </div>
                                                    </CarMinorTextContainerRight>

                                                </CarContainerRight>;
                                            case 'small-right':
                                                return <CarContainerSmallRight>
                                                    <CarBackgroundContainerRightSmall imageUrl={block.img}>

                                                    </CarBackgroundContainerRightSmall>
                                                    <CarMinorTextContainerRight>
                                                        <HorizontalLine></HorizontalLine>
                                                        <div>
                                                            <h3>{block.title}</h3>
                                                            <p>{block.description}</p>
                                                        </div>
                                                    </CarMinorTextContainerRight>
                                                </CarContainerSmallRight>
                                            case 'small-left':
                                                return <CarContainerSmallLeft>
                                                    <CarBackgroundContainerLeftSmall imageUrl={block.img}>

                                                    </CarBackgroundContainerLeftSmall>
                                                    <CarMinorTextContainerLeft>
                                                        <HorizontalLine></HorizontalLine>
                                                        <div>
                                                            <h3>{block.title}</h3>
                                                            <p>{block.description}</p>
                                                        </div>
                                                    </CarMinorTextContainerLeft>
                                                </CarContainerSmallLeft>
                                            default:
                                                return null;
                                        }
                                    } else if (block._type === 'TextBlock') {
                                        return (
                                            <MinorMiddleTextContainer>
                                                <h1>{block.title}</h1>
                                                <p>{block.description}</p>
                                            </MinorMiddleTextContainer>
                                        );
                                    }
                                    return null;
                                })
                            )}
                            {page.title == 'Performance' && (
                                <CarContainerCenter>

                                    <CarBackgroundContainer imageUrl={props.product.images[0]}>

                                    </CarBackgroundContainer>
                                    <EngineTextContainer>
                                        <div><h1>Engine Type</h1><h2>4 cylinder</h2></div>
                                        <div><h1>Displacement</h1><h2>{props.product.engineSize} CC</h2></div>
                                        <div><h1>Horsepower</h1><h2>394hp</h2></div>
                                    </EngineTextContainer>
                                </CarContainerCenter>
                            )}

                        </PageContainer>
                    ))}

                </CarDetails>
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

            </Wrapper >
        </>
    )
}
