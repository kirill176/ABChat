import { Box, Button, TextField, Typography } from "@mui/material";
import React, {
  FC,
  SetStateAction,
  Dispatch,
  useState,
  useCallback,
} from "react";
import { useThemeContext } from "../../ThemeContextProvider";
import { useHandleSubmit } from "../../hooks/useHandleSubmit";
import EditBox from "../StyledComponents/EditBox";

interface CreateChatType {
  setAddChat: Dispatch<SetStateAction<boolean>>;
}

const CreateChat: FC<CreateChatType> = ({ setAddChat }) => {
  const [chatName, setChatName] = useState("");
  const { theme } = useThemeContext();
  const handleSubmit = useHandleSubmit(chatName, setChatName, setAddChat);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
  }, []);

  return (
    <>
      <EditBox theme={theme}>
        <Typography variant="h1" sx={{ textAlign: "left", ml: "0" }}>
          Create new chat
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Chat name"
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
            variant="outlined"
            sx={{ borderColor: "secondary.main" }}
            onClick={() => {
              setAddChat(false);
            }}
          >
            No, keep it
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ backgroundColor: "#0F62FE" }}
          >
            Yes, create chat
          </Button>
        </Box>
      </EditBox>
    </>
  );
};

export default CreateChat;
