import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { useThemeContext } from "../ThemeContextProvider";

const ThemeButton = () => {
  const { toggleTheme } = useThemeContext();
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Локальное состояние для текущей темы

  const handleThemeToggle = () => {
    toggleTheme();
    setIsDarkTheme((prev) => !prev); // Обновляем локальное состояние
  };
  return (
    <>
      <IconButton
        onClick={handleThemeToggle}
        sx={{ position: "absolute", top: "0", right: "0" }}
      >
        <img src={isDarkTheme ? "img/light.png" : "img/dark.png"} alt="" />
      </IconButton>
    </>
  );
};

export default ThemeButton;
