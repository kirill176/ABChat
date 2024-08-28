import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiChat } from "../types/chats";
import baseQueryWithReauth from "./RequyreAuth";

export const ChatAPI = createApi({
  reducerPath: "chatAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    newChat: build.mutation({
      query: (name) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/chats",
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            name: name,
          },
        };
      },
    }),
    getChats: build.query<ApiChat, void>({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/chats",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    editChat: build.mutation({
      query: (chat) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: `/chats/${chat.id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            name: chat.name,
          },
        };
      },
    }),
    deleteChat: build.mutation({
      query: (chatID: number) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: `/chats/${chatID}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const {
  useNewChatMutation,
  useGetChatsQuery,
  useEditChatMutation,
  useDeleteChatMutation,
} = ChatAPI;
