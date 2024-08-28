import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../services/MessagesAPI";
import { messageSlice } from "../store/reducers/MessagesSlice";
import Message from "../components/Message";
import { IMessageDTO } from "../interfaces-submodule/interfaces/dto/message/imessage-dto";
import { useThemeContext } from "../ThemeContextProvider";
import { useSocket } from "../hooks/socket";

const AssistantPage = () => {
  const chatId = useAppSelector((state) => state.chatId.chatId);
  const { data } = useGetMessagesQuery(chatId);
  const dispatch = useAppDispatch();
  const { data: messages = [] } = useAppSelector((state) => state.message);
  const {
    theme: {
      palette: { background },
    },
  } = useThemeContext();
  const [content, setContent] = useState("");
  const [sendMessage] = useSendMessageMutation();
  useSocket(chatId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (data) {
      dispatch(messageSlice.actions.setMessages(data));
    }
  }, [data, dispatch]);

  const handleSend = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (content.trim()) {
      await sendMessage({ chatId, content });
      setContent("");
    }
  };

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
            sx={{
              border: "none",
              width: "100%",
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
            onClick={handleSend}
            sx={{ borderRadius: "8px", width: "52px" }}
          >
            <img src="../img/send.png" alt="" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default AssistantPage;
