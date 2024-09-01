import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import useLogin from "../../hooks/useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, error } = useLogin();

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
    handleLogin(email, password);
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
        {error && <ErrorMessage error={error} />}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          autoComplete="email"
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
          autoComplete="current-password"
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
