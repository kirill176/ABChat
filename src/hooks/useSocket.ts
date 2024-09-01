import { useEffect, useState } from "react";
import { useAppDispatch } from "./redux";
import { socket } from "./socket";
import { NotificationEvents } from "../interfaces-submodule/enums/notification/notification-events.enum";
import { messageSlice } from "../store/reducers/MessagesSlice";

export const useSocket = (
  chatId: number,
  setIsLoading: (prop: boolean) => void
) => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    socket.emit("subscribe", { chatId, accessToken });

    const handleChatResponse = (data: any) => {
      dispatch(messageSlice.actions.addMessage(data));
      setIsLoading(false);
    };

    const handleError = (err: any) => {
      console.error("Socket error:", err);
    };

    socket.on(NotificationEvents.ChatResponse, handleChatResponse);

    socket.on("error", handleError);

    return () => {
      if (socket) {
        socket.emit("unsubscribe", { chatId, accessToken });
      }
      socket.off(NotificationEvents.ChatResponse, handleChatResponse);
      socket.off("error");
    };
  }, [chatId, accessToken]);

  return socket;
};
