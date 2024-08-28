import { Typography } from "@mui/material";
import React, { FC } from "react";
import { useThemeContext } from "../../ThemeContextProvider";

interface KeywordTypes {
  keyword: string;
}

const Keyword: FC<KeywordTypes> = ({ keyword }) => {
  const {
    theme: {
      palette: { mode },
    },
  } = useThemeContext();
  return (
    <>
      <Typography
        component="span"
        variant="body2"
        key={keyword}
        sx={{
          backgroundColor: mode == "light" ? "#EBECF0" : "#252733",
          borderRadius: "20px",
          padding: "2px 8px",
          m: "3px 2px",
          display: "inline-block",
        }}
      >
        {keyword}
      </Typography>
    </>
  );
};

export default Keyword;
