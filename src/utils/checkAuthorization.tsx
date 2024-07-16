import { useGetUserQuery, useRefreshUserMutation } from "../services/AuthAPI";
import { useDispatch } from "react-redux";

export const checkAuth = () => async (dispatch) => {
  dispatch(setAuthInProgress(true));
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      throw new Error("Tokens are missing");
    }

    const getUserResult = await useGetUserQuery().unwrap();

    if (getUserResult.error && getUserResult.error.status === 401) {
      const refreshUserResult = await useRefreshUserMutation().unwrap();

      if (refreshUserResult.data) {
        const { accessToken, refreshToken } = refreshUserResult.data.access;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const retryGetUserResult = await useGetUserQuery().unwrap();
        dispatch(setAuth(retryGetUserResult));
      } else {
        throw new Error("Failed to refresh token");
      }
    } else {
      dispatch(setAuth(getUserResult));
    }
  } catch (err) {
    console.error("Authorization error:", err);
  } finally {
    dispatch(setAuthInProgress(false));
  }
};
