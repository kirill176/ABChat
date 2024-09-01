import { createTheme, Theme } from "@mui/material/styles";

interface ThemeContextType {
  toggleTheme: () => void;
  theme: Theme;
}

declare module "@mui/material/styles" {
  interface TypeBackground {
    secondary: string;
  }

  interface Palette {
    background: TypeBackground;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
  }
}

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
      secondary: "#F6F7F8",
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
    h6: {
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "32px",
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
    body2: {
      fontSize: "14px",
      lineHeight: "20px",
    },
    subtitle1: {
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: "600",
      color: "#4D4D4D",
      textAlign: "left",
      width: "100%",
      padding: "8px 4px",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#0F62FE",
          fontSize: "14px",
          lineHeight: "20px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          textAlign: "left",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          maxHeight: "44px",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#0F62FE",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: "2px",
          "&:hover": { borderWidth: "2px" },
        },
      },
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
      secondary: "#181A1F",
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
    h6: {
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "32px",
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
    body2: {
      fontSize: "14px",
      lineHeight: "20px",
    },
    subtitle1: {
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: "600",
      color: "#F6F7F8",
      textAlign: "left",
      width: "100%",
      p: "8px 4px",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#5B94FE",
          fontSize: "14px",
          lineHeight: "20px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#181A1F",
          borderRadius: "12px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          maxHeight: "44px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: "2px",
          "&:hover": { borderWidth: "2px" },
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
