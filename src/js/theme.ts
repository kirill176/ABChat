import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import { createContext } from "react";

interface ThemeContextType {
  toggleTheme: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ABBDE0",
    },
    background: {
      default: "#ffffff",
      paper: "radial-gradient(circle, #E5E0FE 0%, #CBE5FE 59%, #B8F3FF 100%)",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: {
      fontWeight: "600",
      lineHeight: "120%",
      fontSize: "24px",
      marginLeft: "12px",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: "32px",
      fontWeight: "500",
      lineHeight: "120%",
      textAlign: "center",
      margin: "40px 0",
    },
    button: {
      fontSize: "16px",
      fontWeight: "500",
      textTransform: "none",
    },
    body1: {
      fontSize: "16px",
      fontWeight: "500",
      textTransform: "none",
      textAlign: "center",
      lineHeight: "40px",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#3760AD",
    },
    background: {
      default: "#000000",
      paper: "radial-gradient(circle, #2A1980 0%, #004080 59%, #005580 100%)",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: {
      fontWeight: "600",
      lineHeight: "120%",
      fontSize: "24px",
      marginLeft: "12px",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: "32px",
      fontWeight: "500",
      lineHeight: "120%",
      textAlign: "center",
      margin: "40px 0",
    },
    button: {
      fontSize: "16px",
      fontWeight: "500",
      textTransform: "none",
    },
    body1: {
      fontSize: "16px",
      fontWeight: "500",
      textTransform: "none",
      textAlign: "center",
      lineHeight: "40px",
    },
  },
});

export { lightTheme, darkTheme };
