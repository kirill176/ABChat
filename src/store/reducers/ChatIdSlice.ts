import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const chatIdSlice = createSlice({
  name: "chatId",
  initialState: {
    chatId: 0,
  },
  reducers: {
    setChatId: (state, action: PayloadAction<number>) => {
      state.chatId = action.payload;
    },
  },
});

export const chatIdSelector = (state: RootState) => state.chatId.chatId;

export const { setChatId } = chatIdSlice.actions;

export default chatIdSlice.reducer;
