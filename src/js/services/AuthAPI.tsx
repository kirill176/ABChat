import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiAuth } from "../types/auth";

const apiBaseURL = "https://trainee-api.chat.abcloudz.com/api/v1";

export const AuthAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseURL,
  }),
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
        console.log("get api");

        return {
          url: "/auth/recover-user",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const { usePostLoginMutation, useGetUserQuery } = AuthAPI;
