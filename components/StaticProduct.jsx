'use client'
import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { createGlobalStyle } from 'styled-components';
import mercedes from '@/public/images/C-Class-White.png'
import Image from 'next/image'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { SP } from 'next/dist/shared/lib/utils';




const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    z-index: 5;
    hr{
        background: paleturquoise;
        width: 100px;
    }
`
const CarDisplay = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ backgroundImage }) => backgroundImage ? `url(${backgroundImage}) ` : '#faf9f6'};
  background-size: cover;
  background-position:center;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;
const ToggleButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7); 
  color: white;
  padding: 10px 20px;
  border-radius: 20px; 
  cursor: pointer;
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
  width: 100%;
  text-align: center;
  position: absolute;
  white-space: nowrap;
  text-size-adjust: none;
  font-family: sans-serif;
  overflow: hidden;
  text-align: start;
  display: flex;
  padding-top: 80px;
  top: 0;
  flex-direction: column;
  align-items: center;


  p{
    width: 100%;
    text-align: center;
    font-size: small;
    color: black;
    font-family: 'Halton-bold-italic';

    line-height: 0;
  }
  span{
    line-height: 1;
width: 100%;
    color: black;
    text-align: center;

  }
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
  background-size: contain; // Make sure the car image fits inside the container
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
    bottom: 7vh;
    right: 7vw;
`

const StyledImage = styled(Image)`
z-index: 5;
width: auto;
height: 450px;
position: absolute;
top: 200px ;
left: 50%;
transform: translateX(-50%);

`
const GlobalStyles = createGlobalStyle`
    body {
        overflow: ${({ isGlanceOpen }) => (isGlanceOpen ? 'hidden' : 'auto')}; // Hide scrollbar when PurchaseCardGlance is open
    }
`;
const OtherStyledImage = styled.img`
z-index: 5;
width: auto;
height: 400px;
position: absolute;
object-fit: cover;
bottom: 5% ;
left: 50%;
transform: translateX(-50%);
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
}
`

const PurchaseCardGlance = styled.div`
  display: flex;
    flex-direction: column;
    border: 1px solid rgba(255, 255, 255, 0.3) ;
    overflow-y: ${({ isOpen }) => isOpen ? 'auto' : 'hidden'};

z-index: 99;

    h1{
        font-size: 26px;
    }

    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        padding: 30px;
    }
    max-height: ${({ isOpen }) => (isOpen ? '1100px' : '60px')};
    transition: all 0.5s ease-in-out;
`
const GlanceContent = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    
    padding: 50px;
    max-height: 80vh; // Set a maximum height for closed state
    overflow-y: auto;
    div{
        display: flex;
        flex-direction: column;
        flex: 1;
        h2{
            font-size: 26px;
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
min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: ${({ marginTop }) => marginTop}px;
  overflow: hidden;

    p{
        font-size: 16px;
       margin: 10px 0; 
    }

   
`

const CarContainerCenter = styled.div`


width: 100%;
height: fit-content;
padding: 50px;
margin: 50px 0px;

position: relative;



`;
const CarBackgroundContainer = styled.div`
      box-shadow: 0px 0px 90px 110px black inset;
    height: 650px;
    aspect-ratio: 8/5;
    background: url('https://opensooq-images.os-cdn.com/previews/0x720/65/f3/65f33a5b62e73f67422a7523e3fe6c98bdbfa8a48a6346da4134af63bb0d4568.jpg.webp');
    background-size: cover;
    background-position: center;
    position: relative;
    left: 50px;
    filter: brightness(100%);
    display: flex;
    justify-content: end;
    align-items: end;
`



const CarContainerSmallLeft = styled.div`


width: 100%;
height: fit-content;
position: relative;
display: flex;
justify-content: start;
align-items: start;
padding: 0px 0px;
margin: 0px 0px;


`;
const CarContainerSmallRight = styled.div`
width: 100%;
height: fit-content;
position: relative;
display: flex;
justify-content: end;
align-items: end;
padding: 50px 0px;
margin: 50px 0px;

 
`;
const CarContainerRight = styled.div`


width: 100%;
height: fit-content;
position: relative;
display: flex;
justify-content: end;
align-items: end;
padding: 50px 0px;
margin: 50px 0px;

  
  
`;


const MainTextContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
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
  width: 300px; // Adjust the width of the line as needed
  height: 1px; // Adjust the height according to your needs
  background-color: white; // Set the line color: ;
  margin-top: 10px;
`;
const CarMinorTextContainer = styled.div`
 position: absolute;
        right: 50px;
        bottom: 50px;
       width: 400px;
       display: flex;
       gap: 10px;
       div{}
   
       
`
const CarMinorTextContainerRight = styled.div`
 position: absolute;
        left: 50px;
        top: 50px;
       width: 400px;
       display: flex;
       gap: 10px;
       div{}
   
    
`
const CarMinorTextContainerLeft = styled.div`
 position: absolute;
        right: 50px;
        top: 50px;
       width: 400px;
       display: flex;
       gap: 10px;
       div{}
   
    
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
    cursor: pointer;
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

`


const BigSquare = styled.div`
flex: 2;
background: url('https://opensooq-images.os-cdn.com/previews/0x720/c8/13/c81356a8361d8c410ee6c1b754c721fa3d957e0555b36281fdbb8b2bf5336671.jpg.webp');
background-position: center;
background-size: cover;
`;

const Rectangle = styled.div`
flex: 1;
background: url('https://opensooq-images.os-cdn.com/previews/0x720/4a/0c/4a0c6d4f4b900559d56cd910cc3d59ec838dc801cec848d5255a46e192a39488.jpg.webp');
background-position: center;
background-size: cover;

`;

const SmallSquareContainer = styled.div`
    display: flex;
    flex: 1;
    background: url('https://i.insider.com/592f4169b74af41b008b5977?width=1136&format=jpeg');
background-position: center;
background-size: cover;
`
const SmallSquare = styled.div`
flex: 1;
background: url('https://opensooq-images.os-cdn.com/previews/0x720/4f/5e/4f5e96c2ff3ae58eb2cb56a522f34be163df0aef54d82847720fe22ab3ae9634.jpg.webp');
background-position: center;
background-size: cover;
`;

const CarBackgroundContainerRight = styled.div`
    box-shadow: 200px 0px 110px 150px black inset;
    height: 800px;
    aspect-ratio: 12/10;
  background: ${({ imageUrl }) => `url(${imageUrl}) center/cover no-repeat`};

    background-size: contain;
    background-position: center;
    position: relative;
    filter: brightness(100%);
`
const CarBackgroundContainerRightSmall = styled.div`
    box-shadow: 200px 0px 110px 150px black inset;
    height: 500px;
    aspect-ratio: 12/5;
    background: url('https://opensooq-images.os-cdn.com/previews/0x720/1d/eb/1debbbfad9f1024a14980dff138a39cb89f74b71c1cc3b4a833cd7986667e1ee.jpg.webp');
    background-size: contain;
    background-position: center;
    position: relative;
    filter: brightness(100%);
`
const CarBackgroundContainerLeftSmall = styled.div`
    box-shadow: -200px 0px 110px 150px black inset;
    height: 500px;
    aspect-ratio: 12/5;
    background: url('https://opensooq-images.os-cdn.com/previews/0x720/e2/37/e2377ad5f8b3bc5f0256f7303d3ddac743b86d254c0403146d06bd5a20eddc07.jpg.webp') ;
    background-size: cover;
    background-position: center;
    position: relative;
    filter: brightness(100%);
   
    
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
        right: 50px;
        bottom: 50px;
        div{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
`


export default function StaticProduct() {
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
        // Add more image URLs as needed
    ];
    useEffect(() => {
        console.log('Title ref:', titleRef.current);
    }, [titleRef]);
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
    const images = [
        'https://opensooq-images.os-cdn.com/previews/0x720/c8/13/c81356a8361d8c410ee6c1b754c721fa3d957e0555b36281fdbb8b2bf5336671.jpg.webp',
        'https://opensooq-images.os-cdn.com/previews/0x720/4a/0c/4a0c6d4f4b900559d56cd910cc3d59ec838dc801cec848d5255a46e192a39488.jpg.webp',
        'https://opensooq-images.os-cdn.com/previews/0x720/ac/cc/accc60fc881c457f4101b211e9a060da26256e1d974249266d2122718651b2e5.jpg.webp',
        'https://opensooq-images.os-cdn.com/previews/0x720/a5/de/a5dec6ed07e871d61cb97e866e035f91b9e56a61b7997692c27bef20d3164c33.jpg.webp',
        'https://opensooq-images.os-cdn.com/previews/0x720/e6/a8/e6a839b22498b5703562cac4c941d505b376a5bf6a5d0233407743b4e75fc9f3.jpg.webp',
    ];
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
                            <CarDisplay>
                                <Title  >
                                    <span style={{ fontSize: `19vw`, }}>E-CLASS</span>
                                </Title>



                                <OtherStyledImage src={'https://www.maseratiofwilmingtonpike.com/assets/stock/colormatched_01/transparent/1280/cc_2019mbc90_01_1280/cc_2019mbc900019_01_1280_040.png'} />
                                <LogoImage src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1024px-Mercedes-Logo.svg.png' />
                            </CarDisplay>
                        </SplideSlide>
                        {images.map((img, index) => (
                            <SplideSlide key={index}>
                                <CarDisplay backgroundImage={img} />
                            </SplideSlide>
                        ))}

                    </Splide>
                    <ToggleButton onClick={() => setGalleryVisible(prev => !prev)}>
                        VIEW ALL IMAGES
                    </ToggleButton>

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
                                <ThumbnailCarDisplay>
                                    <Title  >
                                        <span style={{ fontSize: `19vw`, }}>C-CLASS</span>
                                    </Title>



                                    <OtherStyledImage src={'https://mystrongad.com/MBL_MercedesBenzLynchburg/Interactive/E-Class/2022/22-Mercedes-E-Class.png'} />
                                    <LogoImage src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1024px-Mercedes-Logo.svg.png' />
                                </ThumbnailCarDisplay>
                            </SplideSlide>

                            {images.map((img, index) => (
                                <SplideSlide key={index} onClick={() => handleThumbnailClick(index + 1)}>
                                    <img src={img} alt={`Thumbnail ${index}`} />
                                </SplideSlide>
                            ))}
                        </Splide>
                    </ThumbnailsContainer>


                </GalleryContainer>
                <PurchaseCard fixed={fixed} ref={purchaseCardRef}>
                    <PurchaseCardTop isCollapsed={(!scrollUp && fixed && lastScrollY >= 100) || isGlanceOpen}>


                        <PurchaseCardTopDetails>
                            <h1>2019 Mercedes E200
                            </h1>
                            <h2>Price JOD41,500</h2>
                            <p>
                                From £442.39 (Hire Purchase) per month
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
                            <h1>THE E-CLASS AT A GLANCE
                            </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </header>
                        <GlanceContent>
                            <div>
                                <h2>Specifications</h2>
                                <p>Car Make: Mercedes Benz</p>
                                <p>Model: E-Class</p>
                                <p>Trim: E 200</p>
                                <p>Year: 2019</p>
                                <p>Condition: Used</p>
                                <p>Kilometers: 90,000 - 99,999</p>
                                <p>Transmission: Automatic</p>
                                <p>Fuel: Gasoline</p>
                                <p>Color: Black</p>
                                <p>Payment Method: Cash or Installments</p>
                                <p>Body Type: Sedan</p>
                                <p>Car License: Licensed</p>
                                <p>Insurance: Compulsory Insurance</p>
                                <p>Car Customs: With Customs</p>
                                <p>Regional Specs: European Specs</p>
                                <p>Body Condition: Excellent with no defects</p>
                                <p>Paint: Original Paint</p>
                                <p>Mileage: 91,000 kilometers</p>
                                <h2>Engine</h2>
                                <p>4 Cylinder</p>
                                <p>2000 cc</p>
                                <p>Petrol Engine</p>
                                <h2>Safety & Features</h2>
                                <p>Lane Keeping Assist</p>
                                <p>Collision Prevention System</p>
                                <p>Blind Spot Sensors</p>
                                <p>Auto park</p>
                                <p>Rear View Camera</p>
                            </div>


                            <div>
                                <h2>Specifications</h2>
                                <p>AMG Package</p>
                                <p>Keyless Entry</p>
                                <p>Heated Front Seats</p>
                                <p>Black Wood Interior</p>
                                <p>Touchscreen Display</p>
                                <p>Steering Wheel Controls</p>
                                <p>Paddle Shifters</p>
                                <p>Panoramic Sunroof</p>
                                <p>Ambient Lighting</p>
                                <p>Front and Rear Parking Sensors</p>
                                <p>Collision Prevention System</p>
                                <p>Blind Spot Monitoring</p>
                                <p>Auto Park</p>
                                <p>19-Inch Alloy Wheels</p>
                                <p>Mileage: 91,000 kilometers</p>
                            </div>
                        </GlanceContent>

                    </PurchaseCardGlance>
                </PurchaseCard>
                <CarDetails marginTop={marginTop}>

                    <MainTextContainer>
                        <p style={{ fontFamily: 'Halton-light-italic' }}>luxury</p>
                        <Line></Line>
                        <h1>EXTERIOR OPTIONS</h1>
                        <p>Xenon Lights, Sunroof, Sports Package, Rear Sensors, Front Sensors, Rim Wheels, Back Hook, Daytime Running Lights, Electric Mirrors, LED Lights, Electrically Folding Mirrors
                        </p>
                    </MainTextContainer>
                    <CarContainerCenter>

                        <CarBackgroundContainer>

                        </CarBackgroundContainer>

                        <CarMinorTextContainer>
                            <HorizontalLine></HorizontalLine>
                            <div>
                                <h3>Xenon Lights</h3>
                                <p>Xenon lights are high-intensity discharge (HID) lights known for their bright and white illumination, providing improved visibility and safety while driving at night or in adverse weather conditions.</p>
                            </div>
                        </CarMinorTextContainer>

                    </CarContainerCenter>

                    <MinorTextContainer>
                        <h1>Sports Package</h1>
                        <p>A sports package typically includes performance-enhancing features such as upgraded suspension, sport-tuned exhaust systems, sportier exterior styling elements, and possibly enhancements to the interior, offering a more dynamic and engaging driving experience tailored for enthusiasts.</p>
                    </MinorTextContainer>

                    <CarContainerRight>

                        <CarBackgroundContainerRight imageUrl="https://opensooq-images.os-cdn.com/previews/0x720/04/bc/04bc4c408e414bdf8e5c01af3eb34344b42b476f54288ae5f71636a358ed91d9.jpg.webp" />

                        <CarMinorTextContainerRight>
                            <HorizontalLine></HorizontalLine>
                            <div>
                                <h3>Sunroof</h3>
                                <p>A sunroof is a panel in the roof of a vehicle that can be opened or tilted to allow fresh air and sunlight into the cabin, enhancing the driving experience and providing a sense of spaciousness.</p>
                            </div>
                        </CarMinorTextContainerRight>

                    </CarContainerRight>


                    <MainTextContainer>
                        <p style={{ fontFamily: 'Halton-light-italic' }}>technology</p>
                        <Line></Line>
                        <h1>YOUR LIFE, CONNECTED
                        </h1>
                        <p>From intuitive displays to advanced safety systems, the technology in the 2019 Mercedes Bebz E-Class  works in harmony to make your life easier.</p>

                    </MainTextContainer>
                    <CarouselWrapper>
                        <Splide
                            options={{
                                width: '75vw',
                                height: '600px',
                                gap: '1rem',
                                cover: true,
                                type: 'loop',
                                pagination: true, // Enable pagination
                                arrows: true, // Enable navigation arrows
                            }}
                        >
                            <SplideSlide >
                                <CarSlide>
                                    <CarSlideImage imageUrl="https://opensooq-images.os-cdn.com/previews/0x720/a2/46/a246917138b1d8f15344628c705e6f3552651e17ff01b836cfb9410e8f30887e.jpg.webp" />
                                    <MiddleTextContainer>
                                        <h3>Touch Screen</h3>
                                        <p>A sleek touch screen interface adds modern convenience to the Mercedes-Benz E-Class 2019 AMG Package, putting control at your fingertips with intuitive functionality.</p>
                                    </MiddleTextContainer>
                                </CarSlide>
                            </SplideSlide>

                            <SplideSlide >
                                <CarSlide>
                                    <CarSlideImage imageUrl="https://opensooq-images.os-cdn.com/previews/2048x0/0e/a9/0ea9dd3853a1742ec87c52270b142fe7139c5b8afd60d1b397530cce7a2bc82c.jpg.webp" />
                                    <MiddleTextContainer>
                                        <h3>Auto park</h3>
                                        <p>Experience effortless parking with auto park feature, making tight spots a breeze in the Mercedes-Benz E-Class 2019 AMG Package.</p>
                                    </MiddleTextContainer>
                                </CarSlide>
                            </SplideSlide>

                            <SplideSlide >
                                <CarSlide>
                                    <CarSlideImage imageUrl="https://opensooq-images.os-cdn.com/previews/0x720/e2/37/e2377ad5f8b3bc5f0256f7303d3ddac743b86d254c0403146d06bd5a20eddc07.jpg.webp" />
                                    <MiddleTextContainer>
                                        <h3>BLIND SPOT</h3>
                                        <p>Stay aware of your surroundings with the blind spot monitoring system, providing added safety and confidence in the Mercedes-Benz E-Class 2019 AMG Package.</p>
                                    </MiddleTextContainer>
                                </CarSlide>
                            </SplideSlide>
                        </Splide>
                    </CarouselWrapper>
                    <MainTextContainer>
                        <p style={{ fontFamily: 'Halton-light-italic' }}>comfort</p>
                        <Line></Line>
                        <h1>INTERIOR OPTIONS</h1>
                        <p>Navigation system / maps, AUX / USB Input, Voice Control, Blind Spot Alert, Cruise Control, Bluetooth, Sport Seats, Lane Departure Alert, Air Condition, ABS Brakes, Radar, Forward Collision Alert, Rear Camera, Center Lock, Sport Suspension, Diff Lock, Park assist, Alarm System, Traction Control, Auto Lock System, Leather Seats, Android Auto, Tyre Pressure Monitoring, Heated Seats, Apple CarPlay, Steering Wheel Controls, Touch Screen, Airbags, Electric Windows, Media Screen</p>
                    </MainTextContainer>
                    <CarContainerRight>
                        <CarBackgroundContainerRight imageUrl="https://opensooq-images.os-cdn.com/previews/0x720/fa/3d/fa3db5bc5d9c66cfe861e3d05a193c01f5cbb552ca0caf50d9900f3ffd28305c.jpg.webp" />                        <CarMinorTextContainerRight>
                            <HorizontalLine></HorizontalLine>
                            <div>
                                <h3>Seats</h3>
                                <p>Enjoy comfortable rides with sporty seats, cozy heated seats, and luxurious leather seats.

                                </p>
                            </div>
                        </CarMinorTextContainerRight>
                    </CarContainerRight>
                    <CarContainerSmallLeft>
                        <CarBackgroundContainerLeftSmall>
                            {/* Background for visual emphasis */}
                        </CarBackgroundContainerLeftSmall>
                        <CarMinorTextContainerLeft>
                            <HorizontalLine></HorizontalLine>
                            <div>
                                <h3>dashboard</h3>
                                <p>Stay entertained and connected with navigation, AUX/USB inputs, Bluetooth, and touchscreen controls for easy access to your favorite features.</p>
                            </div>
                        </CarMinorTextContainerLeft>
                    </CarContainerSmallLeft>
                    <CarContainerSmallRight>
                        <CarBackgroundContainerRightSmall>
                            {/* Background for visual emphasis */}
                        </CarBackgroundContainerRightSmall>
                        <CarMinorTextContainerRight>
                            <HorizontalLine></HorizontalLine>
                            <div>
                                <h3>Safety</h3>
                                <p>Drive safely with alerts for blind spots and lane departures, cruise control for long trips, and collision prevention systems. Plus, features like rear cameras, parking assistance, and airbags keep you safe on the road.</p>
                            </div>
                        </CarMinorTextContainerRight>
                    </CarContainerSmallRight>
                    <MainTextContainer>
                        <p style={{ fontFamily: 'Halton-light-italic' }}>performance</p>
                        <Line></Line>
                        <h1>Power Unleashed</h1>
                        <p>
                            Unleash the thrill of unparalleled performance. Feel the adrenaline as you take control of the road.
                        </p>
                    </MainTextContainer>
                    <CarContainerCenter>

                        <CarBackgroundContainer>

                        </CarBackgroundContainer>
                        <EngineTextContainer>
                            <div><h1>Engine Type</h1><h1>4 cylinder</h1></div>
                            <div><h1>Displacement</h1><h1>2000 CC</h1></div>
                            <div><h1>Horsepower</h1><h1>394hp</h1></div>
                        </EngineTextContainer>
                    </CarContainerCenter>




                </CarDetails>
                <LastPart>

                    <LeftLastPart>  <BigSquare></BigSquare>
                        <Rectangle></Rectangle>
                        <SmallSquareContainer>
                            <SmallSquare></SmallSquare>
                            <SmallSquare></SmallSquare>
                        </SmallSquareContainer></LeftLastPart>
                    <RightLastPart>                    <div>
                        <span>MAKE IT YOURS
                        </span>
                        <h1>EXPERIENCE THE BMW X7
                        </h1>
                        <p>With premium luxury features and room for everyone, the 2024 BMW X7 full-size SUV proves to be larger than life. Start shopping for yours online today, or contact your local BMW Center.
                        </p>
                        <button>Start Shopping</button>
                        <button>Contact Dealer</button>

                    </div></RightLastPart></LastPart>


            </Wrapper >
        </>
    )
}
