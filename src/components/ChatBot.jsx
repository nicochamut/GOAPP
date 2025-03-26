import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FiSend, FiUser } from "react-icons/fi";
import { Bot } from "lucide-react";
import Enviar from "../components/Assets/enviar.png";
import oleumlogo from "../components/Assets/oleumlogo.png";

const AppContainer = styled.div`
  height: 100vh;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(200deg, #000000 40%, #139dd6 100%);
  justify-content: center;
  align-items: center;
  img {
    position: absolute;
    bottom: 3rem;
    width: 16rem;
    left: 3rem;
    opacity: 80%;
  }
`;

const ChatContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;

  width: 100%;
  height: 50rem;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;

  gap: 10px;
  max-width: 100%;
  ${(props) => (props.$isSent ? "margin-left: auto;" : "")}
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isSent ? "#e4e4e4" : "#89b64e")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$isSent ? "#960303" : "white")};
`;

const MessageContent = styled.div`
  background-color: ${(props) => (props.$isSent ? "#4a9eff" : "#00000078")};
  color: ${(props) => (props.$isSent ? "white" : "white")};
  padding: 13px;
  border-radius: 0px 12px 12px 12px;
  border: 1px solid #666666;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 12px;
  display: flex;
  gap: 10px;
  width: 100%;
  margin: 0px 20px 10px 20px;
  backdrop-filter: blur(5px);
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  background: none;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  outline: none;
  color: white;

  &:focus {
    border-color: #4a9eff;
  }
  &::placeholder {
    color: #ffffff;
    font-style: italic;
  }
`;

const SendButton = styled.button`
  background-color: #4a9eff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  background: url(${(props) => props.background}) no-repeat center;

  &:hover {
    background-color: #357abd;
  }
  &:disabled {
    cursor: not-allowed;
    background: none;
  }
`;

const LoadingMessage = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  background-color: white;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const LoadingDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #89b64e;
  border-radius: 50%;
  animation: bounce 0.5s infinite;
  animation-delay: ${(props) => props.delay};

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }
`;

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post("http://localhost:5000/chat", {
          message: "enviame un mensaje de bienvenida",
          newSession: true,
        });
        const cleanWelcomeMessage = cleanMessage(response.data.reply);
        setMessages([{ id: 1, text: cleanWelcomeMessage, sent: false }]);
      } catch (error) {
        console.error("Error al obtener el mensaje de bienvenida", error);
        // Fallback en caso de error
        setMessages([
          { id: 1, text: "¡Bienvenido! ¿En qué puedo ayudarte?", sent: false },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    if (messages.length === 0) {
      fetchWelcomeMessage();
    }
  }, [messages.length]);

  const cleanMessage = (message) => {
    return message.replace(/<think>.*?<\/think>/gs, "").trim();
  };

  const handleSend = async () => {
    if (!newMessage.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sent: true,
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: newMessage,
        newSession: false,
      });

      // Limpiar el mensaje antes de mostrarlo
      const cleanBotMessage = cleanMessage(response.data.reply);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: cleanBotMessage,
          sent: false,
        },
      ]);
    } catch (error) {
      console.error("Error en la petición al chatbot", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: "Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde.",
          sent: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <AppContainer>
      <ChatContainer>
        <MessageList>
          {messages.map((message) => (
            <Message key={message.id} $isSent={message.sent}>
              <Avatar $isSent={message.sent}>
                {message.sent ? <FiUser /> : <Bot size={20} />}
              </Avatar>
              <MessageContent $isSent={message.sent}>
                {message.text}
              </MessageContent>
            </Message>
          ))}
          {isLoading && (
            <Message $isSent={false}>
              <Avatar $isSent={false}>
                <Bot size={20} />
              </Avatar>
              <LoadingMessage>
                <LoadingDot delay="0s" />
                <LoadingDot delay="0.1s" />
                <LoadingDot delay="0.2s" />
              </LoadingMessage>
            </Message>
          )}
        </MessageList>
      </ChatContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <SendButton
          onClick={handleSend}
          disabled={isLoading || !newMessage.trim()}
          background={Enviar}
        >
          <FiSend size={20} />
        </SendButton>
      </InputContainer>
      <img src={oleumlogo} />
    </AppContainer>
  );
}

export default ChatBot;
