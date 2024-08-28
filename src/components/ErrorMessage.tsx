import { Alert, AlertTitle, Box } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { FC } from "react";

interface ErrorMessageProps {
  error: FetchBaseQueryError | SerializedError;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  const getErrorMessage = (error: FetchBaseQueryError | undefined) => {
    if (!error) return "Failed to login";

    if ("data" in error) {
      const errorData = error.data as { error: { errorCode?: string } };
      return errorData?.error?.errorCode || "Failed to login";
    }

    return "Failed to login";
  };

  return (
    <Alert
      severity="error"
      icon={false}
      sx={{
        width: "100%",
        alignItems: "flex-start",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          src="../../img/success.png"
          alt="Cross Hexagon"
          style={{ width: 24, height: 24, marginRight: 8 }}
        />
        <AlertTitle
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "24px",
            m: "0",
          }}
        >
          Error
        </AlertTitle>
      </Box>
      <Box sx={{ fontSize: "14px", lineHeight: "20px", ml: "32px" }}>
        {getErrorMessage(error as FetchBaseQueryError)}
      </Box>
    </Alert>
  );
};

export default ErrorMessage;
