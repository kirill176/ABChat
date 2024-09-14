import React, { FC, useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { SortDirection } from "../../interfaces-submodule/enums/common/sort-direction.enum";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UpworkFeedSortBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-sort-by.enum";
import {
  feedsParamsSelector,
  setSort,
} from "../../store/reducers/FeedsParamsSlice";

interface TableCellProps {
  title: string;
  button?: boolean;
  sortBy?: UpworkFeedSortBy;
}

const TableHeadRow: FC<TableCellProps> = ({
  title,
  button = false,
  sortBy,
}) => {
  const dispatch = useAppDispatch();
  const { sortBy: currentSortBy, sortDirection } =
    useAppSelector(feedsParamsSelector);

  const [sortDirect, setSortDirect] = useState<SortDirection | undefined>(
    sortDirection
  );

  useEffect(() => {
    setSortDirect(sortDirection);
  }, [sortDirection]);

  const handleSortClick = () => {
    const newSortDirection =
      sortDirect === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;

    if (sortBy) {
      dispatch(
        setSort({
          sortDirection: newSortDirection,
          sortBy,
        })
      );
    }
  };

  const sortImage = () => {
    if (currentSortBy === sortBy) {
      return `../img/${
        sortDirection === SortDirection.ASC ? "asc.png" : "desc.png"
      }`;
    }
    return "../img/Sort.png";
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "26px",
          mt: "18px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            py: "6px",
            textAlign:
              title == "Matched cases" || "Matched blogs" ? "right" : null,
          }}
          variant="body2"
        >
          {title}
        </Typography>
        {button && (
          <IconButton
            onClick={handleSortClick}
            sx={{ width: "32px", height: "32px" }}
          >
            <img src={sortImage()} alt="Sort" />
          </IconButton>
        )}
      </Box>
    </>
  );
};

export default TableHeadRow;
