import { Manager, Socket, io } from "socket.io-client";

const manager = new Manager("https://trainee-api.chat.abcloudz.com", {
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

export const socket: Socket = manager.socket("/api/v1/messages");

socket.on("connect", async () => {
  console.log("Socket connected");
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});
