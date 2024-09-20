import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./RequireAuth";
import { feedsPath } from "../constants/url";

export const FeedsAPI = createApi({
  reducerPath: "FeedsAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getFeeds: build.mutation({
      query: ({ pageSize, pageNumber, searchParams }) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: `${feedsPath}/get-feeds`,
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            pageSize: pageSize,
            pageNumber: pageNumber,
            searchParameters: searchParams.searchParameters,
            sortDirection: searchParams.sortDirection,
            sortBy: searchParams.sortBy,
          },
        };
      },
    }),
    getFeed: build.query({
      query: (id) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: `${feedsPath}/${id}`,
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const { useGetFeedsMutation, useGetFeedQuery } = FeedsAPI;
