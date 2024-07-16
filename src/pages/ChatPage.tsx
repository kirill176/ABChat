import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import ThemeButton from "../components/ThemeButton";
import { useAppSelector } from "../hooks/redux";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const success = useAppSelector((state) => state.user.success);
  const navigate = useNavigate();

  useEffect(() => {
    if (!success) {
      navigate("/");
    }
  }, [success]);

  return (
    <>
      <Box sx={{ display: "flex", position: "relative", height: "100vh" }}>
        <Box
          sx={{
            width: "320px",
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{
              borderColor: "secondary.main",
              borderWidth: "2px",
              width: "100%",
            }}
          >
            + New Chat
          </Button>
          <Box sx={{ height: "100%", overflow: "scroll" }}></Box>
          <Box>
            <Button sx={{ width: "100%", justifyContent: "flex-start" }}>
              <img src="img/rss_feed.png" alt="" />
              Upwork feed
            </Button>
            <Button sx={{ width: "100%", justifyContent: "flex-start" }}>
              <img src="img/avatar outline.png" alt="" />
              username
            </Button>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: "#F6F7F8", width: "100%" }}></Box>
        <ThemeButton />
      </Box>
    </>
  );
};

export default ChatPage;
