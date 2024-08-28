import React, { FC } from "react";
import { useThemeContext } from "../../ThemeContextProvider";
import { Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";

interface ScoreTypes {
  score: number;
}

const Score: FC<ScoreTypes> = ({ score }) => {
  const {
    theme: {
      palette: { mode },
    },
  } = useThemeContext();
  const scoreOptions = useAppSelector((state) => state.feed.scoreOptions);
  const labels = scoreOptions.map((option) => option.label);

  const parseRange = (range: string[]): [number, number][] => {
    return range.map((rang) => {
      const [min, max] = rang.split(" - ").map(Number);
      return [min, max];
    });
  };

  const getColor = (value: number) => {
    const parsedRanges = parseRange(labels);
    const maxValues = parsedRanges.map((range) => {
      return range[1];
    });
    const colorsLight = ["#FAC8D0", "#FAD2B4", "#F0E4A8", "#C9F0C9", "#C4E5F5"];
    const colorsDark = ["#7A2C39", "#6B3920", "#705C0B", "#2D662D", "#295266"];
    for (let i = 0; i < maxValues.length; i++) {
      if (value <= maxValues[i]) {
        return mode == "light" ? colorsLight[i] : colorsDark[i];
      }
    }
    return mode == "light" ? "#C4E5F5" : "#295266";
  };
  return (
    <>
      <Typography
        variant="body2"
        sx={{
          backgroundColor: getColor(score),
          borderRadius: "20px",
          padding: "2px 8px",
          display: "inline-block",
        }}
      >
        {score}
      </Typography>
    </>
  );
};

export default Score;
