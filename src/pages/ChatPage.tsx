import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThemeButton from "../components/ThemeButton";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useGetChatsQuery } from "../services/ChatAPI";
import { allChatsSelector, setChats } from "../store/reducers/ChatSlice";
import Chat from "../components/Chat/Chat";
import { useThemeContext } from "../ThemeContextProvider";
import FeedsPage from "./FeedsPage";
import AssistantPage from "./AssistantPage";
import FeedInfoPage from "./FeedInfoPage";
import BluredBox from "../components/StyledComponents/BluredBox";
import { useClickOutside } from "../hooks/useClickOutside";
import Logout from "../components/Chat/Logout";
import CreateChat from "../components/Chat/CreateChat";
import { accountSelector, successSelector } from "../store/reducers/UserSlice";

const ChatPage = () => {
  const success = useAppSelector(successSelector);
  const account = useAppSelector(accountSelector);
  const chats = useAppSelector(allChatsSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useGetChatsQuery();
  const [addChat, setAddChat] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);
  const logoutRef = useClickOutside(() => setLogoutShow(false));

  const {
    theme: {
      palette: { mode },
    },
  } = useThemeContext();
  const [chatsShow, setChatsShow] = useState(true);

  useEffect(() => {
    if (data) {
      dispatch(setChats(data));
    }
  }, [data]);

  useEffect(() => {
    if (!success) {
      navigate("/");
    }
  }, [success]);

  const handleChatClick = () => {
    navigate("/chat/assistant");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          height: "100vh",
          backgroundColor: "background.secondary",
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            width: "320px",
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            ml: chatsShow ? "0" : "-320px",
            backgroundColor: "background.default",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{
              borderColor: "secondary.main",
              width: "100%",
            }}
            onClick={() => setAddChat(true)}
          >
            + New Chat
          </Button>
          <Box
            sx={{
              height: "100%",
              overflowY: "scroll",
              margin: "10px 0",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {chats.map((chat) => (
              <Chat onClick={handleChatClick} key={chat.id} chat={chat} />
            ))}
          </Box>
          <Box sx={{ position: "relative", zIndex: "0" }}>
            <Button
              onClick={() => navigate("/chat/feeds")}
              sx={{ width: "100%", justifyContent: "flex-start" }}
            >
              <img
                src={
                  mode == "light"
                    ? "../img/rss_feedL.png"
                    : "../img/rss_feedD.png"
                }
                alt=""
              />
              <Typography sx={{ ml: "8px" }}>Upwork feed</Typography>
            </Button>
            <Box ref={logoutRef} sx={{ position: "relative" }}>
              <Button
                onClick={() => setLogoutShow(!logoutShow)}
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              >
                <img
                  src={
                    mode == "light"
                      ? "../img/avatarL.png"
                      : "../img/avatarD.png"
                  }
                  alt=""
                />
                <Typography sx={{ ml: "8px" }}>{account?.email}</Typography>
              </Button>
              {logoutShow && <Logout setLogoutShow={setLogoutShow} />}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          <Routes>
            <Route path="feeds" element={<FeedsPage chatsShow={chatsShow} />} />
            <Route path="assistant" element={<AssistantPage />} />
            <Route path="feeds/:id" element={<FeedInfoPage />} />
            <Route path="*" element={<Navigate to="feeds" replace />} />
          </Routes>
          <IconButton
            onClick={() => setChatsShow(!chatsShow)}
            sx={{ position: "absolute", left: "0", top: "0", zIndex: "10" }}
          >
            {chatsShow ? (
              <img
                src={
                  mode == "light"
                    ? "../img/collapse menuL.png"
                    : "../img/collapse menuD.png"
                }
                alt=""
              />
            ) : (
              <img
                src={mode == "light" ? "../img/menuL.png" : "../img/menuD.png"}
                alt=""
              />
            )}
          </IconButton>
        </Box>
        <ThemeButton />
        {addChat && (
          <BluredBox>
            <CreateChat setAddChat={setAddChat} />
          </BluredBox>
        )}
      </Box>
    </>
  );
};

export default ChatPage;
