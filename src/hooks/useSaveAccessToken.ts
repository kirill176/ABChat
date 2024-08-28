import { useEffect } from "react";

const useSaveAccessToken = (accessToken: string) => {
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, [accessToken]);
};

export default useSaveAccessToken;
