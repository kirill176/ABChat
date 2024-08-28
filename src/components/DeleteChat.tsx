import { Box, Button, Typography } from "@mui/material";
import React, { FC, SetStateAction, Dispatch } from "react";
import { IChatItem } from "../interfaces-submodule/interfaces/dto/chat/dto/ichat-item";
import EditBox from "./StyledComponents/EditBox";
import { useThemeContext } from "../ThemeContextProvider";
import useDeleteChat from "../hooks/useDeleteChat";

interface DeleteChatTypes {
  chat: IChatItem;
  setDeleteShow: Dispatch<SetStateAction<boolean>>;
}

const DeleteChat: FC<DeleteChatTypes> = ({ chat, setDeleteShow }) => {
  const { theme } = useThemeContext();
  const { handleDeleteClick } = useDeleteChat(chat.id, setDeleteShow);

  return (
    <>
      <EditBox theme={theme}>
        <Typography variant="h1" sx={{ textAlign: "left", ml: "0" }}>
          Delete chat
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "left" }}>
          Are you sure you want to delete chat “{chat.name}”?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
          <Button
            onClick={() => setDeleteShow(false)}
            variant="outlined"
            sx={{ borderColor: "secondary.main" }}
          >
            No, Keep it
          </Button>
          <Button
            onClick={handleDeleteClick}
            variant="contained"
            sx={{ backgroundColor: "#0F62FE" }}
          >
            Yes, Delete it
          </Button>
        </Box>
      </EditBox>
    </>
  );
};

export default DeleteChat;
