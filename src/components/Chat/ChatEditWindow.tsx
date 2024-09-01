import { Box, Button, Typography } from "@mui/material";
import React, { FC, SetStateAction, Dispatch, useMemo } from "react";
import { useThemeContext } from "../../ThemeContextProvider";
import ButtonStyle from "../StyledComponents/EditBoxButton";

interface ChatEditWindowTypes {
  setDeleteShow: Dispatch<SetStateAction<boolean>>;
  setEditShow: Dispatch<SetStateAction<boolean>>;
}

const ChatEditWindow: FC<ChatEditWindowTypes> = ({
  setDeleteShow,
  setEditShow,
}) => {
  const {
    theme: {
      palette: { mode },
    },
  } = useThemeContext();

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setEditShow(true);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDeleteShow(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          left: "50%",
          top: "100%",
          backgroundColor: "background.default",
          width: "90%",
          boxShadow:
            mode === "light"
              ? "0px 4px 16px rgba(0, 0, 0, 0.16)"
              : "0px 4px 16px rgba(255, 255, 255, 0.16)",
          zIndex: 10,
          borderRadius: "12px",
          transform: "translate(-50%, 0)",
        }}
      >
        <ButtonStyle onClick={handleEditClick}>
          <img src="../img/edit.svg" alt="" />
          <Typography sx={{ ml: "8px" }}>Rename</Typography>
        </ButtonStyle>
        <ButtonStyle onClick={handleDeleteClick}>
          <img src="../img/delete.svg" alt="" />

          <Typography sx={{ ml: "8px" }}>Delete</Typography>
        </ButtonStyle>
      </Box>
    </>
  );
};

export default ChatEditWindow;
