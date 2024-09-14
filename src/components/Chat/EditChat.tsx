import { Box, Button, TextField, Typography } from "@mui/material";
import React, { FC, SetStateAction, Dispatch, useState } from "react";
import { IChatItem } from "../../interfaces-submodule/interfaces/dto/chat/dto/ichat-item";
import { useThemeContext } from "../../ThemeContextProvider";
import EditBox from "../StyledComponents/EditBox";
import { useChatManager } from "../../hooks/useChatManager";

interface EditChatType {
  setEditChat: Dispatch<SetStateAction<boolean>>;
  chat: IChatItem;
}

const EditChat: FC<EditChatType> = ({ setEditChat, chat }) => {
  const [chatName, setChatName] = useState(chat.name);
  const { theme } = useThemeContext();
  const { handleUpdateChat } = useChatManager(setEditChat, chat);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
  };

  const handleSave = () => {
    handleUpdateChat(chatName);
  };

  return (
    <>
      <EditBox theme={theme}>
        <Typography variant="h1" sx={{ textAlign: "left", ml: "0" }}>
          Change chat name
        </Typography>
        <TextField
          variant="outlined"
          onChange={handleChange}
          value={chatName}
          sx={{
            width: "100%",
            maxHeight: "60px",
            borderRadius: "8px",
            margin: "27px 0",
          }}
        >
          Chat name...
        </TextField>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
          <Button
            onClick={() => setEditChat(false)}
            variant="outlined"
            sx={{ borderColor: "secondary.main" }}
          >
            No, keep it
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ backgroundColor: "#0F62FE" }}
          >
            Yes, change name
          </Button>
        </Box>
      </EditBox>
    </>
  );
};

export default EditChat;
