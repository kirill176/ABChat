import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ChatPage from "./pages/ChatPage";
import { useGetUserQuery } from "./services/AuthAPI";

export default function App() {
  const { data: userData, error, isLoading } = useGetUserQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      console.error("Failed to fetch user data:", error);
    }
    if (userData) {
      console.log("User data:", userData);
      navigate("/chat");
    }
  }, [userData, error]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
}
