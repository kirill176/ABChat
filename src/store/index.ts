import { configureStore } from "@reduxjs/toolkit";
import { AuthAPI } from "../services/AuthAPI";
import UserReducer from "./reducers/UserSlice";
import { ChatAPI } from "../services/ChatAPI";
import ChatReducer from "./reducers/ChatSlice";
import ChatIdReducer from "./reducers/ChatIdSlice";
import { MessagesAPI } from "../services/MessagesAPI";
import MessageReducer from "./reducers/MessagesSlice";
import FeedReducer from "./reducers/FeedsSclice";
import FeedInfoReducer from "./reducers/FeedInfoSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import { FeedsAPI } from "../services/FeedsAPI";
import FeedsParamsReducer from "./reducers/FeedsParamsSlice";

export const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [ChatAPI.reducerPath]: ChatAPI.reducer,
    [MessagesAPI.reducerPath]: MessagesAPI.reducer,
    [FeedsAPI.reducerPath]: FeedsAPI.reducer,
    user: UserReducer,
    chatId: ChatIdReducer,
    chat: ChatReducer,
    message: MessageReducer,
    feed: FeedReducer,
    feedsParams: FeedsParamsReducer,
    feedInfo: FeedInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthAPI.middleware,
      ChatAPI.middleware,
      MessagesAPI.middleware,
      FeedsAPI.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
