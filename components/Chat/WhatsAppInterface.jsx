import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPaperclip,
  faCamera,
  faFileLines,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 340px;
  background-color: #f7f9fc;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
  background-color: #1a1a1a;
  color: white;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;

  .info {
    flex: 1;
    h3 {
      margin: 0;
      font-size: 16px;
    }
    span {
      font-size: 12px;
      opacity: 0.8;
    }
  }
`;

const MessageList = styled.div`
  flex: 1;
  padding: 20px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f7f9fc;
`;

const Bubble = styled.div`
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 18px;
  border-bottom-right-radius: ${(props) => (props.isOwn ? "4px" : "18px")};
  border-bottom-left-radius: ${(props) => (props.isOwn ? "18px" : "4px")};
  position: relative;
  font-size: 13.5px;
  line-height: 1.5;
  color: ${(props) => (props.isOwn ? "#ffffff" : "#222222")};
  align-self: ${(props) => (props.isOwn ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isOwn ? "#1a1a1a" : "#ffffff")};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);

  .time {
    font-size: 10px;
    color: ${(props) => (props.isOwn ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.45)")};
    text-align: right;
    margin-top: 4px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
  }
`;

const FilePreviewContainer = styled.div`
  margin-bottom: 8px;
  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 4px;
  }
  .pdf-card {
    background: rgba(0, 0, 0, 0.05);
    padding: 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const InputArea = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InputWrapper = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 20px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    border: none;
    outline: none;
    flex: 1;
    font-size: 15px;
    color: #000000;
  }

  .icons {
    display: flex;
    gap: 12px;
    color: #54656f;
    cursor: pointer;
  }
`;

const SendButton = styled.div`
  background-color: #1a1a1a;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.8;
  }
`;

const ThumbnailGallery = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px;
  background: white;
  border-top: 1px solid #ddd;
`;

const renderMessageText = (text) => {
  if (!text) return "";
  const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = imgRegex.exec(text)) !== null) {
    const textBefore = text.slice(lastIndex, match.index);
    if (textBefore) {
      parts.push(<span key={lastIndex}>{textBefore}</span>);
    }
    const alt = match[1];
    const src = match[2];
    parts.push(
      <div key={match.index} style={{ marginTop: 8, marginBottom: 8 }}>
        <img 
          src={src} 
          alt={alt} 
          style={{ width: "100%", borderRadius: 8, maxHeight: 180, objectFit: "cover" }} 
        />
      </div>
    );
    lastIndex = imgRegex.lastIndex;
  }

  const textAfter = text.slice(lastIndex);
  if (textAfter) {
    parts.push(<span key={lastIndex + "-after"}>{textAfter}</span>);
  }

  return parts.length > 0 ? parts : text;
};

const WhatsAppInterface = ({ clientId, vinSession, messages = [], setMessages }) => {
  const [inputText, setInputText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const listRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText && attachments.length === 0) return;

    const newMessage = {
      id: Date.now(),
      sender: "USER",
      text: inputText,
      files: attachments,
      timestamp: new Date().toISOString(),
      isOwn: true,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem("whatsapp_chat_history", JSON.stringify(updatedMessages));
    
    setInputText("");
    setAttachments([]);

    // API Call
    try {
      const body = {
        clientId,
        vinSession,
        text: inputText,
        fileBase64: attachments[0]?.base64, // Simplified for single file
        fileName: attachments[0]?.name,
        fileType: attachments[0]?.type,
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || `Server returned ${response.status}`);
      }

      if (data.clientId) {
        localStorage.setItem("dos_client_id", data.clientId);
      }

      if (data.aiMessage) {
        const nextMsgs = [
          ...updatedMessages,
          {
            id: data.aiMessage._id || Date.now() + 1,
            sender: "AI",
            text: data.aiMessage.text,
            analysis: data.aiMessage.aiAnalysis,
            timestamp: new Date().toISOString(),
          },
        ];
        setMessages(nextMsgs);
        localStorage.setItem("whatsapp_chat_history", JSON.stringify(nextMsgs));
      }
    } catch (err) {
      console.error("Chat Failed", err);
      const errMsgs = [
        ...updatedMessages,
        {
          id: Date.now() + 2,
          sender: "AI",
          text: `Sales Assistant Error: ${err.message}. (Check if backend is at ${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3002"})`,
          timestamp: new Date().toISOString(),
        },
      ];
      setMessages(errMsgs);
      localStorage.setItem("whatsapp_chat_history", JSON.stringify(errMsgs));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const type = file.type.includes("pdf") ? "PDF" : "IMAGE";
        setAttachments([{ name: file.name, type, base64: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Header>
        <div className="avatar">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#ccc",
            }}
          ></div>
        </div>
        <div className="info">
          <h3>Sales Advisor AI</h3>
          <span>Online</span>
        </div>
      </Header>

      <MessageList ref={listRef} data-lenis-prevent className="lenis-ignore">
        {messages.map((msg) => (
          <Bubble key={msg.id} isOwn={msg.isOwn}>
            {msg.files?.map((f, i) => (
              <FilePreviewContainer key={i}>
                {f.type === "IMAGE" ? (
                  <img src={f.base64} alt="upload" />
                ) : (
                  <div className="pdf-card">
                    <FontAwesomeIcon
                      icon={faFileLines}
                      size="lg"
                      color="#f40f02"
                    />
                    <span>{f.name}</span>
                  </div>
                )}
              </FilePreviewContainer>
            ))}
            {renderMessageText(msg.text)}
            <div className="time">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {msg.isOwn && (
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  color="#53bdeb"
                  size="xs"
                  style={{ marginLeft: 4 }}
                />
              )}
            </div>
          </Bubble>
        ))}
      </MessageList>

      {attachments.length > 0 && (
        <ThumbnailGallery>
          {attachments.map((f, i) => (
            <div key={i} style={{ fontSize: 10 }}>
              📎 {f.name}
            </div>
          ))}
        </ThumbnailGallery>
      )}

      <InputArea>
        <InputWrapper>
          <div className="icons" onClick={() => fileInputRef.current.click()}>
            <FontAwesomeIcon icon={faPaperclip} size="lg" />
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <div className="icons">
            <FontAwesomeIcon icon={faCamera} size="lg" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </InputWrapper>
        <SendButton onClick={handleSend}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </SendButton>
      </InputArea>
    </Container>
  );
};

export default WhatsAppInterface;
