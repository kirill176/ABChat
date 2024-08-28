import {
  Box,
  FormControl,
  IconButton,
  SelectChangeEvent,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { feedsParamsSlice } from "../store/reducers/FeedsParamsSlice";
import { UpworkFeedSearchBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import RenderSelect from "./RenderSelect";
import { UpworkFeedSortBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-sort-by.enum";
import { SortDirection } from "../interfaces-submodule/enums/common/sort-direction.enum";
import useLabels from "../hooks/useLabels";
import useSelectAll from "../hooks/useSelectAll";
import useFormattedDate from "../hooks/useFormatedDate";

const TableHeadRows = () => {
  const { scoreOptions, keywordsOptions } = useAppSelector(
    (state) => state.feed
  );
  const [sLabels, kLabels] = useLabels(scoreOptions, keywordsOptions);
  const [score, isAllScoreSelected, setScore] = useSelectAll(
    sLabels,
    scoreOptions
  );
  const [keywords, isAllKeywordsSelected, setKeywords] = useSelectAll(
    kLabels,
    keywordsOptions
  );
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [title, setTitle] = useState(" ");
  const dispatch = useAppDispatch();
  const [isScoreSet, setIsScoreSet] = useState(false);
  const [isKeywordSet, setIsKeywordSet] = useState(false);
  const [sortD, setSortD] = useState<SortDirection>(SortDirection.ASC);

  useEffect(() => {
    if (sLabels.length > 0 && !isScoreSet) {
      setScore(sLabels);
      setIsScoreSet(true);
    }
    if (kLabels.length > 0 && !isKeywordSet) {
      setKeywords(kLabels);
      setIsKeywordSet(true);
    }
  }, [sLabels, isScoreSet, kLabels, isKeywordSet]);

  const setSearchParameters = (
    value: string | string[],
    searchBy: UpworkFeedSearchBy
  ) => {
    dispatch(
      feedsParamsSlice.actions.setSearchParameters([
        { searchQuery: value, searchBy: searchBy },
      ])
    );
  };

  const handleChangeParams = (
    e: SelectChangeEvent<string[] | string>,
    options: string[],
    setFunction: React.Dispatch<React.SetStateAction<string[] | string>>,
    searchBy: UpworkFeedSearchBy
  ) => {
    const value = e.target.value as string[];
    console.log("Current value:", value); // Debugging: Check current value
    console.log("Options:", options); // Debugging: Check options array

    if (value.includes("ALL")) {
      const newSelectValue = value.length >= options.length ? [] : options;
      setFunction(newSelectValue);
      setSearchParameters(newSelectValue, searchBy);
    } else {
      setFunction(value);
      setSearchParameters(value, searchBy);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchParameters(title, UpworkFeedSearchBy.Title);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchParameters(title, UpworkFeedSearchBy.Title);
    }
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      setDate(newValue);
      const formattedDate = newValue.format("YYYY-MM-DDTHH:mm:ss");
      setSearchParameters(formattedDate, UpworkFeedSearchBy.Published);
    }
  };

  const handleSortClick = (sortBy: UpworkFeedSortBy) => {
    setSortD((prevSortD) =>
      prevSortD === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
    );
    dispatch(
      feedsParamsSlice.actions.setSort({ sortDirection: sortD, sortBy })
    );
  };

  return (
    <>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Title</Typography>
          <IconButton onClick={() => handleSortClick(UpworkFeedSortBy.Title)}>
            <img src="../img/Sort.png" alt="Sort" />
          </IconButton>
        </Box>
        <TextField
          value={title}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              p: "12px",
            },
            "& .MuiOutlinedInput-root": {
              maxHeight: "44px",
              borderRadius: "8px",
            },
          }}
        />
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Published</Typography>
          <IconButton
            onClick={() => handleSortClick(UpworkFeedSortBy.Published)}
          >
            <img src="../img/Sort.png" alt="Sort" />
          </IconButton>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={handleDateChange}
            views={["year", "month", "day"]}
          />
        </LocalizationProvider>
      </TableCell>
      <TableCell>
        <Typography variant="h6">Keywords</Typography>
        <FormControl
          sx={{
            width: "100%",
            p: "0 10px",
          }}
        >
          {RenderSelect(
            keywords,
            kLabels,
            (e) =>
              handleChangeParams(
                e,
                kLabels,
                setKeywords,
                UpworkFeedSearchBy.Keywords
              ),
            isAllKeywordsSelected
          )}
        </FormControl>
      </TableCell>
      <TableCell sx={{ minWidth: "124px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Score</Typography>
          <IconButton onClick={() => handleSortClick(UpworkFeedSortBy.Score)}>
            <img src="../img/Sort.png" alt="Sort" />
          </IconButton>
        </Box>
        {RenderSelect(
          score,
          sLabels,
          (e) =>
            handleChangeParams(e, sLabels, setScore, UpworkFeedSearchBy.Score),
          isAllScoreSelected
        )}
      </TableCell>
      <TableCell>
        <Typography variant="h6" sx={{ textAlign: "right" }}>
          Matched cases
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" sx={{ textAlign: "right" }}>
          Matched blogs
        </Typography>
      </TableCell>
    </>
  );
};

export default TableHeadRows;
