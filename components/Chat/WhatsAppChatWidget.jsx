"use client";

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import WhatsAppInterface from './WhatsAppInterface';

const FloatingButton = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background-color: #25d366;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 9999;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ChatWrapper = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  z-index: 9999;
  transition: all 0.3s ease;
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0)'};
  transform-origin: bottom right;
  opacity: ${props => props.isOpen ? 1 : 0};
  pointer-events: ${props => props.isOpen ? 'all' : 'none'};
`;

const WhatsAppChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatWrapper isOpen={isOpen}>
        <WhatsAppInterface 
          clientId="65f123abc456" // This would be dynamic in a real app
          vinSession="TEST_VIN_FORENSIC"
        />
      </ChatWrapper>
      <FloatingButton onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </FloatingButton>
    </>
  );
};

export default WhatsAppChatWidget;
