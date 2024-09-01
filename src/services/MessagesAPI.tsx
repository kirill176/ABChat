import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./RequyreAuth";

export const MessagesAPI = createApi({
  reducerPath: "messagesAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getMessages: build.query({
      query: (chatId) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: `/messages/${chatId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    sendMessage: build.mutation({
      query: ({ chatId, content }) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/messages/send-message",
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            chatId: chatId,
            content: content,
          },
        };
      },
    }),
  }),
});

export const { useSendMessageMutation, useGetMessagesQuery } = MessagesAPI;
