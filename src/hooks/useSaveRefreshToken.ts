import { useEffect } from "react";

const useSaveRefreshToken = (refreshToken: string) => {
  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  }, [refreshToken]);
};

export default useSaveRefreshToken;
