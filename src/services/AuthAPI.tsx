import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiAuth } from "../types/auth";
import baseQueryWithReauth from "./RequyreAuth";

export const AuthAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: credentials,
      }),
    }),
    getUser: build.query<ApiAuth, void>({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/auth/recover-user",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    refreshUser: build.mutation<ApiAuth, void>({
      query: () => {
        const refreshToken = localStorage.getItem("refreshToken");
        return {
          url: "/auth/token/refresh",
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: {
            token: refreshToken,
          },
        };
      },
    }),
  }),
});

export const { usePostLoginMutation, useGetUserQuery, useRefreshUserMutation } =
  AuthAPI;
