import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { IMessageDTO } from "../../interfaces-submodule/interfaces/dto/message/imessage-dto";
import { useThemeContext } from "../../ThemeContextProvider";

interface MessagesTypes {
  message: IMessageDTO;
}

const Message: FC<MessagesTypes> = ({ message }) => {
  const {
    theme: {
      palette: { mode },
    },
  } = useThemeContext();

  const backgroundColor =
    mode === "light"
      ? message.isBot
        ? "#EBECF0"
        : "transparent"
      : message.isBot
      ? "#252733"
      : "transparent";

  return (
    <>
      <Box
        sx={{
          backgroundColor: backgroundColor,
          border: "1px solid #EBECF0",
          borderRadius: "8px",
          display: "flex",
          maxWidth: "800px",
          m: "8px",
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <img
          src={message.isBot ? "../img/chat.png" : "../img/icon.png"}
          style={{
            maxHeight: "48px",
            maxWidth: "48px",
            padding: "8px",
          }}
          alt=""
        />
        <Typography variant="button" sx={{ padding: "12px 16px" }}>
          {message.content}{" "}
        </Typography>
      </Box>
    </>
  );
};

export default Message;
