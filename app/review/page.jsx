"use client";

import React, { useState } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

const Form = styled.form`
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: #222;
  color: white;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: #222;
  color: white;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
  }
`;

export default function Page() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    stars: "",
    review: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setMessage("Review posted successfully!");
      setFormData({
        title: "",
        author: "",
        stars: "",
        review: "",
      });
    } else {
      setMessage("Failed to post review.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Review Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <Label htmlFor="author">Author</Label>
        <Input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <Label htmlFor="stars">Stars (1 to 5)</Label>
        <Input
          type="number"
          id="stars"
          name="stars"
          min="1"
          max="5"
          step="0.1"
          value={formData.stars}
          onChange={handleChange}
          required
        />

        <Label htmlFor="review">Review</Label>
        <TextArea
          id="review"
          name="review"
          rows="4"
          value={formData.review}
          onChange={handleChange}
          required
        />

        <Button type="submit">Post Review</Button>

        {message && <p>{message}</p>}
      </Form>
    </Container>
  );
}
