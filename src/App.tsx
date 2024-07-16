import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ChatPage from "./pages/ChatPage";
import { useGetUserQuery, useRefreshUserMutation } from "./services/AuthAPI";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { userSlice } from "./store/reducers/UserSlice";

export default function App() {
  const { data: userData, error, isLoading } = useGetUserQuery();
  const [refreshUser, { data }] = useRefreshUserMutation();
  const success = useAppSelector((state) => state.user.success);
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await refreshUser().unwrap();
      console.log("refresh is sacsesfull", response);
      if (response && response.data?.access) {
        localStorage.setItem("accessToken", response.data.access.accessToken);
        localStorage.setItem("refreshToken", response.data.access.refreshToken);
        dispath(userSlice.actions.setUser(response));
      }
    } catch (error) {
      console.error("Error to refresh", error);
    }
  };

  useEffect(() => {
    if (error && "status" in error && error.status == 401) {
      console.error("Failed to fetch user data:", error);
      refresh();
    }
    if (userData) {
      dispath(userSlice.actions.setUser(userData));
    }
  }, [userData, error]);

  useEffect(() => {
    if (success) {
      navigate("/chat");
    }
  }, [success]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
}
