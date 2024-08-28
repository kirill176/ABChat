import React from "react";
import { IconButton } from "@mui/material";
import { useThemeContext } from "../ThemeContextProvider";

const ThemeButton = () => {
  const {
    toggleTheme,
    theme: {
      palette: { mode },
    },
  } = useThemeContext();

  return (
    <>
      <IconButton
        onClick={() => toggleTheme()}
        sx={{ position: "absolute", top: "0", right: "0" }}
      >
        <img src={mode == "dark" ? "img/light.png" : "img/dark.png"} alt="" />
      </IconButton>
    </>
  );
};

export default ThemeButton;
