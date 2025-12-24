"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 100vw;
  z-index: 11;
  background: black;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  padding: 50px;

  h3 {
    font-size: 2rem;
    margin-bottom: 8px;
    letter-spacing: 2px;
    white-space: nowrap;
  }
`;
const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  margin-bottom: 6px;
`;
const StarWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  svg {
    width: 50px;
    height: 50px;
    stroke: white;
    fill: ${(props) => (props.isFilled ? "white" : "none")};
    transition: fill 0.3s ease;
  }
`;
const Title = styled.div`
  font-size: 15rem;
  text-align: center;
  line-height: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Inter-bold";
  width: 100%;
  flex: 1; /* Adjusts the space it takes */

  h1 {
    letter-spacing: 8px;
    transform: scaleX(1.22) scaleY(1.35);
    font-family: "Inter";
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  p {
    font-size: 9px;
    letter-spacing: 0px;
    text-align: start;
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100vw;
  flex: 3; /* Makes the container take up the remaining space */
`;

const ContainerLeft = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const ContainerRight = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: center;
  gap: 70px;
  p {
    text-transform: uppercase;
    max-width: 300px;
    font-size: 18px;
    text-align: justify;
    hyphens: auto;
  }
`;
const SubmitButton = styled.button`
  background: none;
  color: #fffded;

  border: 1px solid white;

  margin-bottom: 20px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  width: 160px;
  height: 42px;
  scale: 2;
  &:hover {
  }
`;

const LinedTextarea = styled.textarea`
  background: none;
  border: none;
  width: 100%;
  height: 150px;
  padding: 10px;
  color: #fffded;
  font-size: 1rem;
  line-height: 2; /* Adjust the space between lines */
  letter-spacing: 1px;
  resize: none; /* Prevent resizing */
  outline: none;
  font-family: "Inter", sans-serif;

  /* Create the lines using background linear gradient */
  background: linear-gradient(to bottom, #fffded 1px, transparent 1px);
  background-size: 100% 40px; /* Adjust the height of lines */

  &:focus {
    outline: none;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  label {
    font-size: 2rem;
    margin-bottom: 8px;
    letter-spacing: 2px;
    white-space: nowrap;
    font-family: "Inter-bold";
  }

  input {
    width: 100%;
    padding: 15px;
    font-size: 16px;
    background-color: black;
    color: #fffded;
    letter-spacing: 1px;
    border: none;
    outline: none;
    &:focus {
      border: none;
      outline: none;
    }
  }
`;
export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    message: "",
  });

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    setRating(index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data Submitted:", formData, "Rating:", rating);
  };
  return (
    <Wrapper>
      <Title>
        <h1>
          REVIEW
          <p>
            &copy; 2024 Ulysses
            <br />
            GmbH & Co.
            <br />
            KG Mental
          </p>
        </h1>
      </Title>
      <Container>
        <ContainerLeft>
          <InputContainer>
            <label>TITLE:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </InputContainer>
          <InputContainer>
            <label>NAME:</label>
            <input
              type="text"
              name="title"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </InputContainer>
          <InputContainer
            style={{
              flexDirection: "column",
              alignItems: "start",
              gap: "20px",
            }}
          >
            <label>MESSAGE:</label>
            <LinedTextarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </InputContainer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <h3>I GIVE IT</h3>
            <RatingContainer>
              {[1, 2, 3, 4, 5].map((star, index) => (
                <StarWrapper
                  key={index}
                  isFilled={index + 1 <= (hoverRating || rating)}
                  onMouseEnter={() => handleMouseEnter(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(index + 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </StarWrapper>
              ))}
            </RatingContainer>
          </div>
        </ContainerLeft>
        <ContainerRight>
          <SubmitButton onClick={handleSubmit}>SUBMIT</SubmitButton>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. and scrambled it to
          </p>
        </ContainerRight>
      </Container>
    </Wrapper>
  );
}
