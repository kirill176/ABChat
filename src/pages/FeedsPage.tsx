import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FeedsRows from "../components/FeedsRows";
import { useThemeContext } from "../ThemeContextProvider";
import PaginationRow from "../components/PaginationRow";
import TableHeadRows from "../components/TableHeadRows";
import { useAppSelector } from "../hooks/redux";
import useFetchFeeds from "../hooks/useFetchFeeds";

const FeedsPage = () => {
  const { theme } = useThemeContext();
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectInp, setSelectInp] = useState("option1");
  const searchParameters = useAppSelector((state) => state.feedsParams);
  const { handleFetchFeeds, isLoading } = useFetchFeeds();
  const { items } = useAppSelector((state) => state.feed);

  useEffect(() => {
    handleFetchFeeds(pageSize, pageNumber, searchParameters);
  }, [pageSize, pageNumber, searchParameters, handleFetchFeeds]);

  const handleRefresh = () => {
    window.location.reload();
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
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Select
            labelId="select-label"
            id="select"
            displayEmpty
            inputProps={{ "aria-label": "Select an option" }}
            sx={{ width: "600px", maxHeight: "48px" }}
            onChange={(e) => setSelectInp(e.target.value)}
            value={selectInp}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
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
          <Table sx={{ height: "100%" }}>
            <TableHead>
              <TableRow>
                <TableHeadRows />
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                position: "relative",
                height: "100%",
                width: "100%",
              }}
            >
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={items.items.length}>
                    <Box
                      sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {items.items.map((feed) => (
                    <FeedsRows key={feed.id} feed={feed} />
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationRow
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
        />
      </Box>
    </>
  );
};

export default FeedsPage;
