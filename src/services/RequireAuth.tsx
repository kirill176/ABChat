import { AuthAPI } from "./AuthAPI";
import {
  BaseQueryFn,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { userSlice } from "../store/reducers/UserSlice";
import { mainUrl } from "../constants/url";
type BaseQueryWithReauthFn = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>;

const baseQuery = fetchBaseQuery({
  baseUrl: mainUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryWithReauthFn = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  const { error } = result;

  if (error && error.status == 401) {
    const refreshResult = await api
      .dispatch(AuthAPI.endpoints.refreshUser.initiate())
      .unwrap();

    if (refreshResult && refreshResult.data?.access) {
      const { data: { access: { accessToken, refreshToken } } = {} } =
        refreshResult;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      api.dispatch(userSlice.actions.setUser(refreshResult));
    } else {
      localStorage.clear();
      window.location.reload();
    }
  }

  return result;
};

export default baseQueryWithReauth;
