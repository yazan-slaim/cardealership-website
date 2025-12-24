"use client";
import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";

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
  }
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid white;

  label {
    font-size: 1.3rem;
    margin-bottom: 5px;
    letter-spacing: 1px;
  }

  input,
  select,
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fffded;
`;

export default function TestDriveComponent({ product }) {
  const mainRef = useRef(null);
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    preferredDate: "",
    preferredTime: "",
    message: "",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Enquiry submitted successfully!");
        setFormData({
          preferredDate: "",
          preferredTime: "",
          message: "",
          title: "",
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
        });
      } else alert("Failed to submit enquiry.");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Wrapper ref={mainRef}>
      <Title>
        <h3>TEST-DRIVE</h3>
      </Title>

      <LowerContainer>
        <LowerContainerLeft>
          <CarInfoBox>
            <img src={product.images?.[0]} alt={product.title} />
            <h2>
              {product.year} {product.carMake} {product.model} {product.trim}
            </h2>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
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
              <label>PREFERRED DATE</label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
              />
            </InputContainer>

            <InputContainer>
              <label>PREFERRED TIME</label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
              >
                <option value="">Please select ...</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
              </select>
            </InputContainer>

            <InputContainer>
              <label>MESSAGE</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                style={{
                  width: "100%",
                  height: "100px",
                  padding: "10px",
                  backgroundColor: "black",
                  color: "#fffded",
                }}
              />
            </InputContainer>

            <InputContainer>
              <label>TITLE *</label>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              >
                <option value="">Please select ...</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
              </select>
            </InputContainer>

            <InputContainer>
              <label>FIRST NAME *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </InputContainer>

            <InputContainer>
              <label>LAST NAME *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </InputContainer>

            <InputContainer>
              <label>EMAIL ADDRESS *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputContainer>

            <InputContainer>
              <label>CONTACT NUMBER *</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </InputContainer>
          </FormContainer>
        </LowerContainerRight>
      </LowerContainer>
    </Wrapper>
  );
}
