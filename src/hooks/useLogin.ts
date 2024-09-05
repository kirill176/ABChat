import { useAppDispatch } from "./redux";
import { setUser } from "../store/reducers/UserSlice";
import { usePostLoginMutation } from "../services/AuthAPI";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const [login, { data, error, isLoading }] = usePostLoginMutation();

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

  return { handleLogin, error };
};

export default useLogin;
