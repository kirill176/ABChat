import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiAuth } from "../../types/auth";

const initialState: ApiAuth = {
  success: false,
  statusCode: 0,
  data: {
    account: {
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      status: "",
      typeAuth: "",
      accountRole: "",
    },
    sessionId: "",
  },
  error: {
    errorCode: "",
    filedsValidationErrors: [],
    paramsErrors: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<ApiAuth>) {
      state.success = action.payload.success;
      state.statusCode = action.payload.statusCode;
      state.data = action.payload.data;
      state.error = action.payload.error || initialState.error;
    },
  },
});

export default userSlice.reducer;
