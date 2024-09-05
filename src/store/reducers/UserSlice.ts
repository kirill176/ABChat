import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiAuth } from "../../types/auth";
import { AccountStatus } from "../../interfaces-submodule/enums/account/account-status.enum";
import { AccountTypeAuth } from "../../interfaces-submodule/enums/account/account-type-auth.enum";
import { AccountRole } from "../../interfaces-submodule/enums/account/account-role.enum";

const initialState: ApiAuth = {
  success: false,
  statusCode: 0,
  data: {
    account: {
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      status: AccountStatus.Invited,
      typeAuth: AccountTypeAuth.LOCAL,
      accountRole: AccountRole.User,
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
    logoutUser(state) {
      return initialState;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
