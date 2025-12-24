import React from 'react'
import styled from "@emotion/styled";
import { motion, useScroll, useTransform } from "framer-motion";
const Title = styled.h1`
    padding-bottom: 15px;
    text-transform: uppercase;
    padding-left: 10px;
    font-size: x-large;

`
const Rectangle = styled.div`
  width: 400px;
  height: 600px;
  position: relative;
  overflow: hidden;
    background-size: cover;
  background-position:center ;
  cursor: pointer;
  transition: width 0.5s ease;
  overflow: hidden;
  position: relative;
  display:flex;
    justify-content:end;
    align-items:center;

  h1 {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    left:20px;
    font-size: 5rem;
    span {
      display: inline-block;
      transform: translateY(100%);
    }
}



`;
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  position: relative;
  background: black;
`;
export default function FifthPage() {
  return (
    <div style={{
      zIndex: "2",
      background: "black",
      padding: "20px"
    }}>
      <Title>GALLERY</Title>
      <Container>
        <Rectangle>  <motion.div style={{ top: 0, height: '100%', left: "0", position: "absolute", width: "100%", zIndex: "1" }}>
          <img src={"https://ml5enisp4q1t.i.optimole.com/cb:avo9~b5e4/w:auto/h:auto/q:mauto/ig:avif/f:best/https://interiorarchitects.com/wp-content/uploads/2022/02/Lucid-1.jpg"} alt="Overview" className="object-cover w-full h-full" style={{ objectFit: 'cover' }} />
        </motion.div>  <motion.div style={{ top: 0, height: '100%', left: "0", position: "absolute", width: "100%", zIndex: "1" }}>
            <img src={"https://ml5enisp4q1t.i.optimole.com/cb:avo9~b5e4/w:auto/h:auto/q:mauto/ig:avif/f:best/https://interiorarchitects.com/wp-content/uploads/2022/02/Lucid-1.jpg"} alt="Overview" className="object-cover w-full h-full" style={{ objectFit: 'cover' }} />
          </motion.div></Rectangle>
        <Rectangle>  <motion.div style={{ top: 0, height: '100%', left: "0", position: "absolute", width: "100%", zIndex: "1" }}>
          <img src={"https://ml5enisp4q1t.i.optimole.com/cb:avo9~b5e4/w:auto/h:auto/q:mauto/ig:avif/f:best/https://interiorarchitects.com/wp-content/uploads/2022/02/Lucid-1.jpg"} alt="Overview" className="object-cover w-full h-full" style={{ objectFit: 'cover' }} />
        </motion.div></Rectangle>
        <Rectangle>  <motion.div style={{ top: 0, height: '100%', left: "0", position: "absolute", width: "100%", zIndex: "1" }}>
          <img src={"https://ml5enisp4q1t.i.optimole.com/cb:avo9~b5e4/w:auto/h:auto/q:mauto/ig:avif/f:best/https://interiorarchitects.com/wp-content/uploads/2022/02/Lucid-1.jpg"} alt="Overview" className="object-cover w-full h-full" style={{ objectFit: 'cover' }} />
        </motion.div></Rectangle>
      </Container>
    </div>
  )
}
