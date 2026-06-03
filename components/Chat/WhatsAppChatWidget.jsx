"use client";

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { usePathname } from 'next/navigation';
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

const UnreadBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff3b30;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
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
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [widgetClientId, setWidgetClientId] = useState("65f123abc456");
  const pathname = usePathname();

  // Load state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMsgs = localStorage.getItem("whatsapp_chat_history");
      const storedUnread = localStorage.getItem("whatsapp_chat_unread");
      const storedOpen = localStorage.getItem("whatsapp_chat_open") === "true";
      
      setIsOpen(storedOpen);

      if (storedMsgs) {
        setMessages(JSON.parse(storedMsgs));
      }
      
      if (storedUnread) {
        setUnreadCount(storedOpen ? 0 : parseInt(storedUnread) || 0);
      }

      const storedClientId = localStorage.getItem("dos_client_id");
      const storedSessionId = localStorage.getItem("dos_session_id");
      setWidgetClientId(storedClientId || storedSessionId || "65f123abc456");

      // 30 seconds timer for the first message (only if chat history is empty)
      const timer = setTimeout(() => {
        const currentMsgs = JSON.parse(localStorage.getItem("whatsapp_chat_history") || "[]");
        if (currentMsgs.length === 0) {
          const path = window.location.pathname;
          const isCarPage = path.match(/^\/stock\/([a-fA-F0-9]{24})/);
          const welcomeText = isCarPage
            ? "You seem interested in this car! I can help you with any questions. Would you like to schedule a test drive?"
            : "Hello! Can I help you with something?";

          const firstMsg = {
            id: 1,
            sender: "AI",
            text: welcomeText,
            timestamp: new Date().toISOString(),
          };

          const newMsgsList = [firstMsg];
          setMessages(newMsgsList);
          localStorage.setItem("whatsapp_chat_history", JSON.stringify(newMsgsList));

          // Set unread count if the chat is closed
          const chatOpen = localStorage.getItem("whatsapp_chat_open") === "true";
          if (!chatOpen) {
            setUnreadCount(1);
            localStorage.setItem("whatsapp_chat_unread", "1");
          }
        }
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  // Update dynamic client/session ID when messages state changes (e.g. after identification)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedClientId = localStorage.getItem("dos_client_id");
      const storedSessionId = localStorage.getItem("dos_session_id");
      setWidgetClientId(storedClientId || storedSessionId || "65f123abc456");
    }
  }, [messages]);

  // Car page dwell detector (15 seconds dwelling on a stock details page)
  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return;

    const isCarPage = pathname.match(/^\/stock\/([a-fA-F0-9]{24})/);
    if (!isCarPage) return;

    const carId = isCarPage[1];

    const getHistory = () => JSON.parse(localStorage.getItem("whatsapp_chat_history") || "[]");
    
    // If the user has already messaged, do not trigger auto messages
    if (getHistory().some(msg => msg.sender === "USER")) return;
    
    // If we already sent a dwell message for this specific car, do not trigger again
    if (getHistory().some(msg => msg.sender === "AI" && msg.isCarDwell && msg.carId === carId)) return;

    const dwellTimer = setTimeout(() => {
      const history = getHistory();
      if (history.some(msg => msg.sender === "USER")) return;
      if (history.some(msg => msg.sender === "AI" && msg.isCarDwell && msg.carId === carId)) return;

      const dwellMsg = {
        id: Date.now(),
        sender: "AI",
        text: "You seem interested in this car! I can help you with any questions. Would you like to schedule a test drive?",
        timestamp: new Date().toISOString(),
        isCarDwell: true,
        carId: carId
      };

      const updatedMsgs = [...history, dwellMsg];
      setMessages(updatedMsgs);
      localStorage.setItem("whatsapp_chat_history", JSON.stringify(updatedMsgs));

      // Show red unread badge if chat is closed
      const chatOpen = localStorage.getItem("whatsapp_chat_open") === "true";
      if (!chatOpen) {
        setUnreadCount(prev => {
          const nextCount = prev + 1;
          localStorage.setItem("whatsapp_chat_unread", String(nextCount));
          return nextCount;
        });
      }
    }, 15000); // 15 seconds dwell threshold

    return () => clearTimeout(dwellTimer);
  }, [pathname]);

  const handleToggleChat = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    localStorage.setItem("whatsapp_chat_open", String(nextOpen));
    if (nextOpen) {
      setUnreadCount(0);
      localStorage.setItem("whatsapp_chat_unread", "0");
    }
  };

  return (
    <>
      <ChatWrapper isOpen={isOpen}>
        <WhatsAppInterface 
          clientId={widgetClientId}
          vinSession="TEST_VIN_FORENSIC"
          messages={messages}
          setMessages={setMessages}
        />
      </ChatWrapper>
      <FloatingButton onClick={handleToggleChat}>
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
        {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
      </FloatingButton>
    </>
  );
};

export default WhatsAppChatWidget;
