import { configureStore } from "@reduxjs/toolkit";
import { AuthAPI } from "../services/AuthAPI";
import { userSlice } from "./reducers/UserSlice";
import UserReducer from "./reducers/UserSlice";

export const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    user: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
