import { usePostLoginMutation } from "../services/AuthAPI";
import { logoutUser, setUser } from "../store/reducers/UserSlice";
import { useAppDispatch } from "./redux";
import { SetStateAction, Dispatch } from "react";

export const useAuth = (setLogoutShow?: Dispatch<SetStateAction<boolean>>) => {
  const dispatch = useAppDispatch();
  const [login, { error }] = usePostLoginMutation();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login({ email, password }).unwrap();
      const {
        access: { accessToken, refreshToken },
      } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch(setUser(response));
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    setLogoutShow && setLogoutShow(false);
  };

  return { handleLogin, error, handleLogout };
};
