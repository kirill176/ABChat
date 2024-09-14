import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMessageDTO } from "../../interfaces-submodule/interfaces/dto/message/imessage-dto";
import { ApiMessage } from "../../types/message";
import { RootState } from "..";

const initialState: ApiMessage = {
  success: false,
  statusCode: 0,
  data: [],
  error: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<ApiMessage>) {
      state.success = action.payload.success;
      state.statusCode = action.payload.statusCode;
      state.data = action.payload.data;
      state.error = action.payload.error;
    },
    addMessage(state, action: PayloadAction<IMessageDTO>) {
      state.data.push(action.payload);
    },
  },
});

export const messageSelector = (state: RootState) => state.message.data;

export const { setMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;
