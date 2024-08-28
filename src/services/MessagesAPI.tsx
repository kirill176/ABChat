import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
    subscribe: build.mutation({
      query: (chatId) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/messages/subscribe",
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: {
            chatId: chatId,
            accessToken: accessToken,
          },
        };
      },
    }),
    unsubscribe: build.mutation({
      query: ({ ChatId }) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/messages/unsubscribe",
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: {
            ChatId: ChatId,
            accessToken: accessToken,
          },
        };
      },
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} = MessagesAPI;
