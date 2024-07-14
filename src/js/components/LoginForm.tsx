import {
  Alert,
  AlertTitle,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useGetUserQuery, usePostLoginMutation } from "../services/AuthAPI";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { data, error, isLoading }] = usePostLoginMutation();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      localStorage.setItem("accessToken", response.data.access.accessToken);
      localStorage.setItem("refreshToken", response.data.access.refreshToken);
      window.location.reload();
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  const getErrorMessage = (error: FetchBaseQueryError | undefined) => {
    if (!error) return "Failed to login";

    if ("data" in error) {
      const errorData = error.data as { error: { errorCode?: string } };
      return errorData?.error?.errorCode || "Failed to login";
    }

    return "Failed to login";
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "320px",
        }}
      >
        {error && (
          <Alert
            severity="error"
            icon={false} // Убираем стандартную иконку
            sx={{
              width: "100%",
              alignItems: "flex-start",
              borderRadius: "8px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="../../img/success.png"
                alt="Cross Hexagon"
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <AlertTitle
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  margin: "0",
                }}
              >
                Error
              </AlertTitle>
            </Box>
            <Box sx={{ fontSize: "14px", lineHeight: "20px", ml: "32px" }}>
              {getErrorMessage(error as FetchBaseQueryError)}
            </Box>
          </Alert>
        )}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          InputProps={{
            sx: {
              maxHeight: "60px",
              borderRadius: "8px",
            },
          }}
        />
        <TextField
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <img src="img/eye.png" alt="toggle password visibility" />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              maxHeight: "60px",
              borderRadius: "8px",
            },
          }}
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          sx={{
            borderColor: "secondary.main",
            borderWidth: "2px",
            borderRadius: "8px",
          }}
        >
          Login
        </Button>
      </Box>
    </>
  );
};

export default LoginForm;
