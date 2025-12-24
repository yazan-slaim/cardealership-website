

"use client";
import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { onPageEnter, onPageLeave } from "@/utils/animation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: black;
  color: #fffded;
  width: 100vw;
  padding: 50px;
  text-transform: uppercase;
  position: relative;
  margin-top: 50px;
  z-index: 5;
  * {
    font-family: "Inter";
  }
`;

const Title = styled.div`
  font-size: 15rem;
  letter-spacing: 8px;
  text-align: center;
  line-height: 1;
  display: flex;
  justify-content: center;
  font-family: "Inter-bold";
  transform: scaleX(1.22) scaleY(1.35);
`;

const LowerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
`;

const LowerContainerLeft = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const OpenHours = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h3 {
    font-size: 3rem;
    margin-bottom: 20px;
    letter-spacing: 2px;
    font-weight: 600;
  }

  .hours-list {
    font-size: 18px;
    line-height: 2.5;
    letter-spacing: 1.5px;
    color: grey;
    width: 100%;

    .open {
      color: #fffded;
    }
    div {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const AddressInfo = styled.div`
  font-size: 16px;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin-bottom: 10px;
  }

  .underline {
    border-top: 1px solid white;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

const LowerContainerRight = styled.div`
  width: 60%;
`;

const FormContainer = styled.div`
  width: 100%;

  h3 {
    font-size: 3rem;
    margin-bottom: 30px;
    letter-spacing: 4px;
  }

  button {
    background: none;
    color: #fffded;

    border: 1px solid white;
    cursor: pointer;

    margin-bottom: 20px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    width: 160px;
    height: 42px;
    &:hover {
    }
  }
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  border-bottom: 1px solid white;
  align-items: center;

  label {
    font-size: 2rem;
    margin-bottom: 8px;
    letter-spacing: 2px;
    white-space: nowrap;
  }

  input,
  textarea {
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
const CarInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fffded;
  font-family: "Inter";
  gap: 15px;

  img {
    width: 100%;
    max-width: 500px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .specs {
    margin-top: 20px;
    width: 100%;
    font-size: 1rem;

    div {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #333;
      padding: 10px 0;
    }

    p:first-of-type {
      color: #aaa;
    }

    p:last-of-type {
      font-weight: bold;
    }
  }
`;


const RedBorderBox = styled.div`
  flex-grow: 1;
  margin-top: 20px;
  width: 100%; /* Add some space above the box */
  display: flex;
  align-items: center;
  justify-content: center; /* Center content inside the box */
  color: #fffded;
  /* Text color for visibility */
`;

export default function EnquiryCarComponent({product}) {
    console.log(product)
  const mainRef = useRef(null);
  const pathname = usePathname();
/*
  useEffect(() => {
    const parent = document.querySelector(".parent-container");

    if (pathname === "/contact") {
      if (!parent.contains(mainRef.current)) {
        parent.appendChild(mainRef.current);
      }

      onPageEnter(mainRef, parent);
    } else {
      onPageLeave(mainRef);
    }
  }, [pathname]);
  */
const [formData, setFormData] = useState({
  type: "general",
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  message: "",
  note: "",
  status: "new",
});


  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form or show success message
        setFormData({
          title: "",
          FirstName: "",
          LastName: "",
          EmailAddress: "",
          ContactNumber: "",
          Enquiry: "",
          Message: "",
          note: "",
        });
        alert("Enquiry submitted successfully!");
      } else {
        alert("Failed to submit enquiry.");
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <Wrapper ref={mainRef}>
      <Title>
        <h3>TEST DRIVE</h3>
      </Title>

      <LowerContainer>
   <LowerContainerLeft>
<CarInfoBox>
  <img
    src={product.images?.[0]}
    alt={product.title}
  />

  <h2>
    {product.year} {product.carMake} {product.model} {product.trim}
  </h2>
<div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
  <h3>£{product.price?.toLocaleString()}</h3>

  {product.pricePerMonth && (
    <p style={{ fontWeight: "bold", color: "#aaa" }}>
      £{product.pricePerMonth.toLocaleString()} (Hire Purchase)
    </p>
  )}
</div>
  <div className="specs">
    <div>
      <p>Registered</p>
      <p>{product.year}</p>
    </div>
    <div>
      <p>Mileage</p>
      <p>{product.mileage}</p>
    </div>
    <div>
      <p>Fuel Type</p>
      <p>{product.fuel}</p>
    </div>
  </div>
</CarInfoBox>


  <RedBorderBox className="add-a-note-box"></RedBorderBox>
</LowerContainerLeft>

        <LowerContainerRight>
          <FormContainer>
            <AddressInfo>
              <p style={{ marginBottom: "80px", fontSize: "20px" }}>
                LOCATION: Numbered Studio Herengracht 342-11016CG, Amsterdam The
                Sunny Netherlands
              </p>
              <div className="underline"></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "20px",
                  marginTop: "40px",
                }}
              >
                <p>PHONE: +962849343474</p>
                <p>EMAIL: ALSLAIM@GMAIL.COM</p>
              </div>
            </AddressInfo>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <h3>FORM</h3>
              <button onClick={handleSubmit}>SUBMIT</button>
            </div>
            <InputContainer>
              <label>TITLE:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </InputContainer>

         <InputContainer>
  <label>FIRST NAME:</label>
  <input
    type="text"
    name="firstName"                // ✅ matches state
    value={formData.firstName}
    onChange={handleChange}
    required
  />
</InputContainer>

<InputContainer>
  <label>LAST NAME:</label>
  <input
    type="text"
    name="lastName"                 // ✅ matches state
    value={formData.lastName}
    onChange={handleChange}
    required
  />
</InputContainer>

<InputContainer>
  <label>EMAIL ADDRESS:</label>
  <input
    type="email"
    name="email"                    // ✅ matches state
    value={formData.email}
    onChange={handleChange}
    required
  />
</InputContainer>

<InputContainer>
  <label>CONTACT NUMBER:</label>
  <input
    type="text"
    name="contactNumber"            // ✅ matches state
    value={formData.contactNumber}
    onChange={handleChange}
    required
  />
</InputContainer>



            <InputContainer>
              <label>MESSAGE:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                style={{
                  width: "100%",
                  height: "100px",
                  padding: "10px",
                  backgroundColor: "black",
                  color: "#fffded",
                  borderRadius: "5px",
                }}
              />
            </InputContainer>
          </FormContainer>
        </LowerContainerRight>
      </LowerContainer>
    </Wrapper>
  );
}
