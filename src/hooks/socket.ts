import { Manager, Socket } from "socket.io-client";
import { mainUrl, messagesPath } from "../constants/url";

const manager = new Manager(mainUrl, {
  transports: ["websocket"],
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

export const socket: Socket = manager.socket(messagesPath);

socket.on("connect", async () => {
  console.log("Socket connected");
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});
