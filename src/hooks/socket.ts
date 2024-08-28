import { Socket, io } from "socket.io-client";
import { messageSlice } from "../store/reducers/MessagesSlice";
import {
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "../services/MessagesAPI";
import { useEffect } from "react";
import { useAppDispatch } from "./redux";

let socket: Socket | undefined;

export const useSocket = (chatId: number) => {
  const dispatch = useAppDispatch();
  const [subscribe] = useSubscribeMutation();
  const [unsubscribe] = useUnsubscribeMutation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!socket) {
      socket = io("https://trainee-api.chat.abcloudz.com", {
        transports: ["websocket"],
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      socket.on("connect", async () => {
        console.log("Socket connected");
        if (accessToken && chatId != 0) {
          try {
            await subscribe(chatId).unwrap();
            console.log("Subscribed successfully");
          } catch (error) {
            console.error("Subscription error:", error);
          }
        }
      });

      socket.on("receiveMessage", (message) => {
        console.log("New message received:", message);
        dispatch(messageSlice.actions.addMessage(message));
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      socket.on("error", (err) => {
        console.error("Socket error:", err);
      });
    }

    return () => {
      if (socket) {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && chatId != 0) {
          unsubscribe(chatId)
            .unwrap()
            .catch((error) => {
              console.error("Unsubscribe error:", error);
            });
        }
        socket.disconnect();
        socket = undefined;
      }
    };
  }, [chatId, dispatch, subscribe, unsubscribe]);
};
