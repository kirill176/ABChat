import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ChatPage from "./pages/ChatPage";
import { useGetUserQuery } from "./services/AuthAPI";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { userSlice } from "./store/reducers/UserSlice";

export default function App() {
  const { data: userData, error, isLoading } = useGetUserQuery();
  const success = useAppSelector((state) => state.user.success);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData) {
      dispatch(userSlice.actions.setUser(userData));
    }
  }, [userData]);

  useEffect(() => {
    if (success) {
      navigate("/chat/*");
    }
  }, [success]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat/*" element={<ChatPage />} />
      </Routes>
    </>
  );
}
