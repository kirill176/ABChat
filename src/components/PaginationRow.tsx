import {
  Box,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useAppSelector } from "../hooks/redux";

interface PaginationRowTypes {
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationRow: FC<PaginationRowTypes> = ({
  setPageSize,
  setPageNumber,
}) => {
  const {
    items: { totalCount, totalPages, pageNumber, pageSize },
  } = useAppSelector((state) => state.feed);
  const calculate = () => {
    if (pageNumber == 1) {
      return 1;
    } else {
      return pageSize * pageNumber - pageSize + 1;
    }
  };

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const handlePerPageChange = (e: SelectChangeEvent) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          mt: "auto",
          backgroundColor: "background.secondary",
          p: "20px 8px",
          gap: "24px",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography>
            Items shown:{" "}
            <strong>
              {calculate()} -{" "}
              {pageSize * pageNumber > totalCount
                ? totalCount
                : pageSize * pageNumber}
            </strong>{" "}
            out of <strong>{totalCount}</strong>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography>Items per page:</Typography>
          <Select
            labelId="select-label"
            id="select"
            displayEmpty
            inputProps={{ "aria-label": "Select an option" }}
            onChange={handlePerPageChange}
            value={String(pageSize)}
            sx={{
              minWidth: "100px",
              maxHeight: "48px",
              textAlign: "left",
            }}
          >
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="30">30</MenuItem>
          </Select>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <Pagination
            count={totalPages}
            page={pageNumber}
            color="primary"
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                borderColor: "transparent",
                lineHeight: "24px",
                fontSize: "16px",
                fontWeight: "600",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                border: "2px solid ",
                borderColor: "secondary.main",
                backgroundColor: "transparent",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default PaginationRow;
