import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiChat } from "../types/chats";
import baseQueryWithReauth from "./RequyreAuth";
import { chatsPath } from "../constants/url";

export const ChatAPI = createApi({
  reducerPath: "chatAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    newChat: build.mutation({
      query: (name) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: chatsPath,
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
          url: chatsPath,
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
          url: `${chatsPath}/${chat.id}`,
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
          url: `${chatsPath}/${chatID}`,
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
