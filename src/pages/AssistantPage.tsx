import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useGetMessagesQuery } from "../services/MessagesAPI";
import { messageSlice } from "../store/reducers/MessagesSlice";
import { IMessageDTO } from "../interfaces-submodule/interfaces/dto/message/imessage-dto";
import { useThemeContext } from "../ThemeContextProvider";
import { useSocket } from "../hooks/useSocket";
import LoadingMessage from "../components/Assistant/LoadingMessage";
import Message from "../components/Assistant/Message";
import { useChat } from "../hooks/useChat";

const AssistantPage = () => {
  const chatId = useAppSelector((state) => state.chatId.chatId);
  const { data } = useGetMessagesQuery(chatId);
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: messages = [] } = useAppSelector((state) => state.message);
  const {
    theme: {
      palette: { background, mode },
    },
  } = useThemeContext();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useChat(chatId, content, setContent, setIsLoading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useSocket(chatId, setIsLoading);
  useEffect(() => {
    if (data) {
      dispatch(messageSlice.actions.setMessages(data));
    }
  }, [data, dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          pt: "72px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          m: "auto",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            height: "100%",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            p: "16px 0",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {messages && messages.length > 0 ? (
            messages.map((message: IMessageDTO) => (
              <Message key={message.id} message={message} />
            ))
          ) : (
            <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img src="../img/sales ai.svg" alt="" />
                <Typography variant="h1">Sales Assistant</Typography>
              </Box>
            </Box>
          )}
          {isLoading && <LoadingMessage />}
          <div ref={messagesEndRef} />
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: background.secondary,
            border: "1px solid #EBECF0",
            maxWidth: "800px",
            margin: "auto",
            display: "flex",
            borderRadius: "8px",
            m: "16px 0",
          }}
        >
          <TextField
            value={content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            sx={{
              border: "none",
              width: "100%",
              borderRadius: "8px",
              backgroundColor: mode == "light" ? "#FFFFFF" : "#131314",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
            placeholder="Write a question..."
          />
          <IconButton
            onClick={handleSendMessage}
            sx={{
              borderRadius: "0 8px 8px 0",
              width: "52px",
              backgroundColor: mode == "light" ? "#FFFFFF" : "#131314",
            }}
          >
            <img
              src={mode == "light" ? "../img/sendL.png" : "../img/sendD.png"}
              alt=""
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default AssistantPage;
