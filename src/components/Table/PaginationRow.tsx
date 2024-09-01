import {
  Box,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { calculate } from "../../utils/calculate";

interface PaginationRowTypes {
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  size: number;
}

const PaginationRow: FC<PaginationRowTypes> = ({
  setPageSize,
  setPageNumber,
  size,
}) => {
  const {
    items: { totalCount, totalPages, pageNumber, pageSize },
  } = useAppSelector((state) => state.feed);

  const pageSizes = [10, 20, 30, 40, 50];

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
              {calculate(pageNumber, pageSize)} -{" "}
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
            displayEmpty
            inputProps={{ "aria-label": "Select an option" }}
            onChange={handlePerPageChange}
            value={String(size)}
            sx={{
              minWidth: "100px",
              maxHeight: "48px",
              textAlign: "left",
            }}
          >
            {pageSizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
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
