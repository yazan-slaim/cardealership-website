"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import styled from "@emotion/styled";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

const Container = styled.div`
  display: flex;
  overflow-x: hidden;
  width: 100vw;
  position: relative;
  cursor: none;
`;

const Preview = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  overflow: hidden;
  pointer-events: none;
  transform-origin: center;
  transform: scale(0);
  z-index: 9999;
  cursor: none;
`;
const PreviewImg = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
`;

const ImagesContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: none;
`;
const Column = styled.div`
  min-width: 25vw;
  padding: 20px;
  box-sizing: border-box;
  cursor: none;
`;
const Inner = styled.div`
  height: ${(props) => props.height || "100%"};
  display: flex;
  justify-content: end;
  gap: 10px;
  flex-direction: column;
  border-left: 1px solid rgba(186, 186, 186, 0.251);
  padding: 5px 10px;
  font-size: 1.4rem;
  div {
    font-size: 12px;
  }
`;

const ScrollButton = styled.button`
  border: 2px solid white;
  padding: 30px;
  margin-left: 15px;
  border-radius: 50%;
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 2.5rem;
  line-height: 1;
  margin: 0; /* Ensure no default margin */
`;

const columns = [
  {
    text: "THERE ARE MANY VARIATIONS OF PASSAGES OF LOREM IPSUM AVAILABLE,",
    height: "60vh",
    date: "1/10/1956",
  },
  {
    text: "THERE ARE MANY VARIATIONS OF PASSAGES OF LOREM IPSUM AVAILABLE,",
    height: "40vh",
    date: "2/15/1957",
  },
  {
    text: "THERE ARE MANY VARIATIONS OF PASSAGES OF LOREM IPSUM AVAILABLE,",
    height: "80vh",
    date: "3/20/1958",
  },
  {
    text: "THERE ARE MANY VARIATIONS OF PASSAGES OF LOREM IPSUM AVAILABLE,",
    height: "55vh",
    date: "4/25/1959",
  },
  {
    text: "THERE ARE MANY VARIATIONS OF PASSAGES OF LOREM IPSUM AVAILABLE,",
    height: "70vh",
    date: "5/30/1960",
  },
];

const HeritageCarousel = () => {
  const containerRef = useRef(null);
  const parentRef = useRef(null);
  const previewRef = useRef(null);
  const ImagesContainerRef = useRef(null);

  const columnRefs = useRef([]);

  const [variableInside, setVariableInside] = useState(false);

  useEffect(() => {
    const moveStuff = (e) => {
      if (variableInside) {
        gsap.to(previewRef.current, 0.3, {
          scale: 1,
        });
      } else {
        gsap.to(previewRef.current, 0.3, {
          scale: 0,
        });
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", moveStuff);

      return () => {
        window.removeEventListener("mousemove", moveStuff);
      };
    }
  }, [variableInside]);

  const handleScroll = (direction) => {
    const scrollAmount =
      direction === "right"
        ? containerRef.current.offsetWidth / 4
        : -containerRef.current.offsetWidth / 4;

    gsap.to(containerRef.current, {
      scrollLeft: containerRef.current.scrollLeft + scrollAmount,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  const bgPositions = {
    p1: "0",
    p2: "-300px",
    p3: "-600px",
    p4: "-900px",
    p5: "-1200px",
  };

  const moveProject = (e) => {
    const previewRect = previewRef.current.getBoundingClientRect();
    const offsetX = previewRect.width / 2;
    const offsetY = previewRect.height / 2;

    gsap.to(previewRef.current, 0.3, {
      left: e.pageX - offsetX,
      top: e.pageY - offsetY,
      ease: "power2.out",
    });
  };

  const moveProjectImg = (project) => {
    const projectId = project.id;
    gsap.to(ImagesContainerRef.current, 0.45, {
      y: bgPositions[projectId] || "0 0",
    });
  };

  useEffect(() => {
    columnRefs.current.forEach((project) => {
      project.addEventListener("mousemove", moveProject);
      project.addEventListener("mousemove", moveProjectImg.bind(null, project));
    });

    return () => {
      columnRefs.current.forEach((project) => {
        if (project) {
          project.removeEventListener("mousemove", moveProject);
          project.removeEventListener(
            "mousemove",
            moveProjectImg.bind(null, project)
          );
        }
      });
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        flexDirection: "column",
      }}
      ref={parentRef}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 40px",
        }}
      >
        <Title>Heritage</Title>
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          <ScrollButton onClick={() => handleScroll("left")}>←</ScrollButton>
          <ScrollButton onClick={() => handleScroll("right")}>→</ScrollButton>
        </div>
      </div>
      <Preview ref={previewRef}>
        <ImagesContainer ref={ImagesContainerRef}>
  <PreviewImg
    src="https://i.pinimg.com/1200x/e3/9f/c5/e39fc53cb945574bccbe1047698bbf66.jpg"
    className="preview-img"
    id="img1"
  />
  <PreviewImg
    src="https://i.pinimg.com/1200x/8f/b2/8a/8fb28acc91ef9552eb40b04b5de095fb.jpg"
    className="preview-img"
    id="img2"
  />
  <PreviewImg
    src="https://i.pinimg.com/1200x/0d/04/bc/0d04bc28676f4cbbe18d161236f9e9f1.jpg"
    className="preview-img"
    id="img3"
  />
  <PreviewImg
    src="https://i.pinimg.com/1200x/65/75/ad/6575ad45884236e3c38c8b29c0c1a784.jpg"
    className="preview-img"
    id="img4"
  />
  <PreviewImg
    src="https://i.pinimg.com/1200x/ee/7c/dd/ee7cdd796399054b3455c4bcb13f9e22.jpg"
    className="preview-img"
    id="img5"
  />
</ImagesContainer>

      </Preview>
      <Container
        ref={containerRef}
        onMouseEnter={() => setVariableInside(true)}
        onMouseLeave={() => setVariableInside(false)}
      >
        {columns.map((column, index) => (
          <Column
            id={`p${index + 1}`}
            key={index}
            ref={(el) => (columnRefs.current[index] = el)}
            height={column.height}
          >
            <Inner height={column.height}>
              <div>
                <h1>{column.date}</h1>
              </div>
              <h1>{column.text} </h1>
            </Inner>
          </Column>
        ))}
      </Container>
    </div>
  );
};

export default HeritageCarousel;
