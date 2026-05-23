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
  height: 600px;
  width: 400px;
  background-color: #e5ddd5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
  background-color: #075e54;
  color: white;
  padding: 12px 16px;
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
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-repeat: repeat;
`;

const Bubble = styled.div`
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 8px;
  position: relative;
  font-size: 14px;
  line-height: 1.4;
  color: #000000; /* Ensure text is always visible */
  align-self: ${(props) => (props.isOwn ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isOwn ? "#dcf8c6" : "#ffffff")};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  .time {
    font-size: 10px;
    color: rgba(0, 0, 0, 0.45);
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
  background-color: #00a884;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ThumbnailGallery = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px;
  background: white;
  border-top: 1px solid #ddd;
`;

const WhatsAppInterface = ({ clientId, vinSession }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI",
      text: "Hello! Send me a 'Fahs' report or car photos for forensic analysis.",
      timestamp: new Date(),
    },
  ]);
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
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages((prev) => [...prev, newMessage]);
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
        // Use env variable for backend port
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || `Server returned ${response.status}`);
      }

      if (data.aiMessage) {
        setMessages((prev) => [
          ...prev,
          {
            id: data.aiMessage._id || Date.now() + 1,
            sender: "AI",
            text: data.aiMessage.text,
            analysis: data.aiMessage.aiAnalysis,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      console.error("Chat Failed", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "AI",
          text: `Forensic Brain Error: ${err.message}. (Check if backend is at ${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3002"})`,
          timestamp: new Date(),
        },
      ]);
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
          <h3>Forensic Advisor AI</h3>
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
            {msg.text}
            <div className="time">
              {msg.timestamp.toLocaleTimeString([], {
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
