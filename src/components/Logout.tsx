import { Box, Button, Typography } from "@mui/material";
import React, { SetStateAction, Dispatch, FC } from "react";
import { useAppDispatch } from "../hooks/redux";
import { userSlice } from "../store/reducers/UserSlice";
import { useThemeContext } from "../ThemeContextProvider";

interface LogoutProps {
  setLogoutShow: Dispatch<SetStateAction<boolean>>;
}

const Logout: FC<LogoutProps> = ({ setLogoutShow }) => {
  const dispatch = useAppDispatch();
  const handleClickLogout = () => {
    localStorage.clear();
    dispatch(userSlice.actions.logoutUser());
    setLogoutShow(false);
    window.location.reload();
  };
  const {
    theme: {
      palette: { mode },
    },
  } = useThemeContext();

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          bottom: "100%",
          transform: "translate(-50%, 0)",
          boxShadow:
            mode === "light"
              ? "0px 4px 16px rgba(0, 0, 0, 0.16)"
              : "0px 4px 16px rgba(255, 255, 255, 0.16)",
          borderRadius: "12px",
          zIndex: 10,
          backgroundColor: "background.default",
          width: "90%",
        }}
      >
        <Button
          onClick={handleClickLogout}
          sx={{ width: "100%", justifyContent: "flex-start" }}
        >
          <img src="../img/logout.svg" alt="" />
          <Typography variant="body1" sx={{ ml: "8px" }}>
            Logout
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default Logout;
