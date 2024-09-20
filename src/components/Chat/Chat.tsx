import { Box, IconButton, Typography } from "@mui/material";
import React, { FC, useRef, useState } from "react";
import { IChatItem } from "../../interfaces-submodule/interfaces/dto/chat/dto/ichat-item";
import { useThemeContext } from "../../ThemeContextProvider";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { chatIdSelector, setChatId } from "../../store/reducers/ChatIdSlice";
import BluredBox from "../StyledComponents/BluredBox";
import { useClickOutside } from "../../hooks/useClickOutside";
import ChatEditWindow from "./ChatEditWindow";
import DeleteChat from "./DeleteChat";
import EditChat from "./EditChat";

interface ChatTypes {
  chat: IChatItem;
  onClick: () => void;
}

const Chat: FC<ChatTypes> = ({ chat, onClick }) => {
  const [settings, setSettings] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const currentChatId = useAppSelector(chatIdSelector);
  const settingsRef = useClickOutside(() => setSettings(false));
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [chatAbove, setChatAbove] = useState(false);

  const {
    theme: {
      palette: { mode },
    },
  } = useThemeContext();

  const dispatch = useAppDispatch();

  const handleChatClick = () => {
    dispatch(setChatId(chat.id));
    onClick();
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSettings((prev) => !prev);
    if (chatRef.current) {
      const chatRect = chatRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const remainingSpace = windowHeight - chatRect.bottom;
      setChatAbove(remainingSpace < 232);
    }
  };

  return (
    <>
      <Box ref={chatRef}>
        <Box
          ref={settingsRef}
          onClick={handleChatClick}
          sx={{
            display: "flex",
            padding: "12px 16px",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.3s ease 0s",
            borderRadius: "4px",
            backgroundColor: chat.id == currentChatId ? "action.hover" : "",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <Typography
            noWrap
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {chat.name}
          </Typography>
          <IconButton
            onClick={handleButtonClick}
            sx={{ borderRadius: "8px", width: "36px" }}
          >
            <img
              src={mode == "light" ? "../img/iconL.png" : "../img/iconD.png"}
              alt=""
            />
          </IconButton>
          {settings && (
            <ChatEditWindow
              setDeleteShow={setDeleteShow}
              setEditShow={setEditShow}
              chatAbove={chatAbove}
            />
          )}
        </Box>
        {deleteShow && (
          <BluredBox>
            <DeleteChat chat={chat} setDeleteShow={setDeleteShow} />
          </BluredBox>
        )}
        {editShow && (
          <BluredBox>
            <EditChat setEditChat={setEditShow} chat={chat} />
          </BluredBox>
        )}
      </Box>
    </>
  );
};

export default Chat;
