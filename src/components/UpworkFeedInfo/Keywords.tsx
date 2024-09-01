import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import Keyword from "./Keyword";
import { useAppSelector } from "../../hooks/redux";
import BaseBox from "../StyledComponents/BaseBox";

const Keywords = () => {
  const { keywords } = useAppSelector((state) => state.feedInfo.data);

  return (
    <BaseBox>
      <Typography variant="subtitle1">Keywords</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "start", flexWrap: "wrap" }}>
          {keywords.map((keyword) => (
            <Keyword key={keyword} keyword={keyword} />
          ))}
        </Box>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Button
            variant="outlined"
            sx={{
              height: "36px",
              width: "36px",
              padding: 0,
              minWidth: "36px",
              borderRadius: "6px",
              borderColor: "secondary.main",
            }}
          >
            <img
              src="../../img/like.png"
              alt="like"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                padding: "8px",
              }}
            />
          </Button>
          <Button
            variant="outlined"
            sx={{
              height: "36px",
              width: "36px",
              padding: 0,
              minWidth: "36px",
              borderRadius: "6px",
              borderColor: "secondary.main",
            }}
          >
            <img
              src="../../img/dislike.png"
              alt="dislike"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                padding: "8px",
              }}
            />
          </Button>
        </Box>
      </Box>
    </BaseBox>
  );
};

export default Keywords;
