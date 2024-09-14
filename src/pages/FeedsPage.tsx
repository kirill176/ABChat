import {
  Alert,
  AlertTitle,
  Box,
  Button,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "../ThemeContextProvider";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import useFetchFeeds from "../hooks/useFetchFeeds";
import PaginationRow from "../components/Table/PaginationRow";
import FeedsTable from "../components/Table/FeedsTable";
import {
  feedsParamsSelector,
  refresh,
} from "../store/reducers/FeedsParamsSlice";

const FeedsPage = () => {
  const { theme } = useThemeContext();
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const searchParameters = useAppSelector(feedsParamsSelector);
  const { handleFetchFeeds, isLoading, error } = useFetchFeeds();
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleFetchFeeds(pageSize, pageNumber, searchParameters);
  }, [pageSize, pageNumber, searchParameters, handleFetchFeeds]);

  const handleRefresh = () => {
    dispatch(refresh());
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          m: "auto",
          p: "0 32px",
          pt: "72px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h1">Upwork Feeds</Typography>
          <Button
            variant="outlined"
            onClick={handleRefresh}
            sx={{
              width: "160px",
              maxHeight: "48px",
              borderColor: "secondary.main",
              ml: "8px",
            }}
          >
            <img
              src={
                theme.palette.mode == "light"
                  ? "../img/refreshL.png"
                  : "../img/refreshD.png"
              }
              alt=""
            />
            <Typography variant="body1" sx={{ ml: "8px" }}>
              Refresh RSS
            </Typography>
          </Button>
        </Box>
        <TableContainer
          sx={{
            overflowY: "scroll",
            height: "100%",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {error && (
            <Alert
              severity="error"
              sx={{
                my: "20px",
                mx: "auto",
                display: "flex",
                alignItems: "center",
                maxWidth: "800px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
                <Typography sx={{ ml: "16px" }}>
                  Failed to fetch Feeds. Change search parameters or refresh
                  page
                </Typography>
              </Box>
            </Alert>
          )}
          <FeedsTable loading={isLoading} />
        </TableContainer>
        <PaginationRow
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          size={pageSize}
        />
      </Box>
    </>
  );
};

export default FeedsPage;
