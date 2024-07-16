import React, { useMemo } from "react";
import ThemeButton from "../components/ThemeButton";
import { styled } from "@mui/system";
import { Box, Button, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";

const MainPage = () => {
  const LoginFormTheme = useMemo(
    () =>
      styled("div")(({ theme }) => ({
        backgroundImage: theme.palette.background.default,
        height: "100vh",
        padding: "0 60px",
        width: "440px",
      })),
    []
  );

  const Picture = useMemo(
    () =>
      styled("div")(({ theme }) => ({
        backgroundImage: theme.palette.background.paper,
        minHeight: "100vh",
        width: "100%",
      })),
    []
  );

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <LoginFormTheme>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "96px",
            }}
          >
            <img src="img/sales ai.svg" alt="" />
            <Typography variant="h1">Sales Assistant</Typography>
          </Box>
          <Typography variant="h2">Login</Typography>
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              height: "48px",
              borderColor: "secondary.main",
              borderWidth: "2px",
              borderRadius: "8px",
            }}
          >
            <img src="img/microsoft logo.png" alt="" />
            <Typography variant="button" sx={{ marginLeft: "8px" }}>
              Continue with Microsoft
            </Typography>
          </Button>
          <Typography variant="body1">or</Typography>
          <LoginForm />
        </LoginFormTheme>
        <Picture>
          <img src="img/Frame.svg" alt="" />
        </Picture>
        <ThemeButton />
      </Box>
    </>
  );
};

export default MainPage;
