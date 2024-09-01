import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const LoadingMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        bgcolor: "#f0f0f0",
        borderRadius: "8px",
        maxWidth: "800px",
        m: "8px",
        backgroundColor: "background.default",
      }}
    >
      <Box display="flex" alignItems="center">
        <CircularProgress size={20} />
        <Typography variant="body2" marginLeft="8px"></Typography>
      </Box>
      <Typography variant="body2" color="textSecondary">
        PLease wait, the response may take up to 3 minutes...
      </Typography>
    </Box>
  );
};

export default LoadingMessage;
