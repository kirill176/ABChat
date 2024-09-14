import React, { FC } from "react";
import { useThemeContext } from "../../ThemeContextProvider";
import { Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { OptionsSelector } from "../../store/reducers/FeedsSclice";
import { colorsLight, colorsDark } from "../../constants/colors";

interface ScoreTypes {
  score: number;
}

const Score: FC<ScoreTypes> = ({ score }) => {
  const {
    theme: {
      palette: { mode },
    },
  } = useThemeContext();
  const { scoreOptions } = useAppSelector(OptionsSelector);
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
