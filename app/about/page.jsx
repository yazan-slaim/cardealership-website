"use client";
import React from "react";
import styled from "@emotion/styled";
import Parallax from "@/components/Parallax";
import Section from "@/components/DynamicImage";
const Wrapper = styled.div`
  min-height: 100vh;
  z-index: 2;
  position: relative;
  padding: 100px;

`;
const Container = styled.div`
  display: flex;
  gap: 40px;
  margin: 20px 0;
  `

const Title = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  text-align: start;

  h1 {
    font-size: 22.5vw;
    line-height: 1;
    margin: 0;
  }

  h2 {
    font-size: 95px;
    line-height: .001;
    margin: 0;
    padding-left: 20px;
  }
`;
const RightDiv = styled.div`
  padding-top: 150px;

  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  div {
    height: 350px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 15px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const LeftDiv = styled.div`
  padding-top: 250px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 75px;

  div {
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
`;
const PhoneAndOpeningHours = styled.div`
    margin: 30px 0px;
    width: 300px;
    display: flex;

    flex-direction: column;
`
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;

    h1{
        font-size: 26px;
        text-transform: uppercase;
        margin: 15px 0px;
    }
    
    div{
        display: flex;
        flex-direction: row;
        gap: 10px;
        margin-bottom: 5px;
        align-items: center;
        span{
                text-transform: uppercase;
                min-width: 70px;

            }
        p{
            color: gray;
            font-size: 13px;
            
        }
    }

`
export default function page() {
    return (
        <Wrapper>
            <Title>
                <h1>PLATTYS</h1>
                <h2>about us</h2>
            </Title>
            <Container>
                <LeftDiv>
                    <div>
                        <img
                            src="https://i.pinimg.com/736x/83/fb/75/83fb7536a4ecdf273478fef6d67fbcba.jpg"
                            style={{ width: "100%", height: "450px" }}
                        />
                    </div>


                </LeftDiv>{" "}
                <RightDiv>
                    <div style={{ alignItems: "end" }}>
                        <Parallax speed={1} className="self-center">

                            <Section
                                image={'https://picsum.photos/200/350?random=1'}
                                tag=""
                                title=""
                                description=""
                            />
                        </Parallax>
                    </div>{" "}
                    <div>
                        <h2 style={{ fontSize: '8px', maxWidth: '200px' }}>BUDDY'S DOGWEAR AND THE DOG THAT INSPIRED US</h2>
                        <p>
                            We are specialists in creating the best accessories for our dogs.
                            Thinking about the needs of our buddys, we design and handcraft our
                            straps and collars in a limited way using the best natural
                            materials: French-origin cowhide tanned by hand in Italy together
                            with canvas, cotton and Italian rubber, all handcrafted in our Spain
                            workshop.
                        </p>
                    </div>{" "}

                </RightDiv>
            </Container>

            <Container style={{ display: "flex", flexDirection: "row", gap: "25px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "25px", maxWidth: "800px", justifyContent: 'center' }}>
                    <p>Clive Sutton has been at the forefront of the luxury and performance car industry for over 35 years and has built an unrivalled reputation for providing a first class, multifaceted service, which includes comprehensive after-sales care, as well as a bespoke styling service. The company specialises in offering immediate or shorter delivery of new and premium cars. Clive Sutton offers a personal shopping service, sourcing, locating and purchasing any luxury saloon, sports, 4WD or premium American vehicles from the UK, Europe, USA and Asia.</p>

                    <p>Contact us if you are in the market for Aston Martin, Ferrari, Lamborghini, Porsche, Mercedes-Benz, Rolls-Royce, Bentley, Range Rover, American imports and classics – we will be able to help find you the perfect car. We are often able to offer shorter leads times on short supply vehicles as well as current market prices for all prestige brands. Put us to the test and let us know what you want to buy. We always have a range of American cars for sale on our website so it’s worth keeping a check.</p>

                    <p>We work with a selection of the world’s best tuning and custom upgrade brands to deliver special vehicles. Talk to us about what it is you’re looking for and how we help make your vehicle one of a kind. Our team of in-house experts are ready to answer your questions regarding sales, imports, sourcing, aftersales, coach-builds, specialist services such as car customisation and our tuning programme.</p>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: "1", height: 'fit-content' }}>
                    <h1 style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "95px", whiteSpace: "nowrap" }}>CONTACT US</h1>
                </div>
            </Container>
            <Container>
                <div>
                    <PhoneAndOpeningHours>
                        <TextContainer>
                            <h1>Opening Hours</h1>
                            <div><span>Mon-Fri</span><p>10 am - 8 pm</p></div>
                            <div><span>Sat,Sun</span><p>Closed</p></div>

                        </TextContainer>
                        <TextContainer>
                            <h1>Contact</h1>
                            <div><span>Phone</span><p>+96284934374</p></div>
                            <div><span>Email</span><p>y.salaim@gmail.copm</p></div>

                        </TextContainer>
                    </PhoneAndOpeningHours>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: "1" }}>
                    <div style={{ width: '250px', height: '250px', borderRadius: '50%', background: 'black', border: '2px solid #eee', position: 'relative', boxShadow: '0 0 25px 5px rgba(255, 255, 255, 0.2)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#fff" />
                            <path fill="none" d="M0 0h24v24H0V0z" />
                        </svg>
                    </div>
                </div>

            </Container>
        </Wrapper>
    );
}
