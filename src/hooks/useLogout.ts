import { userSlice } from "../store/reducers/UserSlice";
import { useAppDispatch } from "./redux";
import { SetStateAction, Dispatch } from "react";

export const useLogout = (setLogoutShow: Dispatch<SetStateAction<boolean>>) => {
  const dispatch = useAppDispatch();

  const handleClickLogout = () => {
    localStorage.clear();
    dispatch(userSlice.actions.logoutUser());
    setLogoutShow(false);
    window.location.reload();
  };

  return { handleClickLogout };
};
