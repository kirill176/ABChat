import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChatItem } from "../../interfaces-submodule/interfaces/dto/chat/dto/ichat-item";
import { ApiChat } from "../../types/chats";

const initialState: ApiChat = {
  data: [],
  error: "",
  statusCode: 0,
  success: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<ApiChat>) {
      return action.payload;
    },
    addChat(state, action: PayloadAction<IChatItem>) {
      state.data.unshift(action.payload);
    },
    deleteChat(state, action: PayloadAction<number>) {
      state.data = state.data.filter((chat) => chat.id !== action.payload);
    },
    updateChat(state, action: PayloadAction<IChatItem>) {
      const index = state.data.findIndex(
        (chat) => chat.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});

export default chatSlice.reducer;
