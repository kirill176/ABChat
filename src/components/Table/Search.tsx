import React, { useEffect, useState } from "react";
import { Column } from "@tanstack/react-table";
import { TextField } from "@mui/material";
import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useSelectAll from "../../hooks/useSelectAll";
import { handleChangeParams } from "../../utils/handleChangeParams";
import DateRangePicker from "./DateRangePicker";
import ReactSelect from "./ReactSelect";
import { MultiValue } from "react-select";
import {
  feedsParamsSelector,
  setTrigger,
} from "../../store/reducers/FeedsParamsSlice";
import { OptionsSelector } from "../../store/reducers/FeedsSclice";
import { reviews } from "../../constants/constants";
import useManageSearchParameters from "../../hooks/useManageSearchParameters";

const Search = ({ column }: { column: Column<any, unknown> }) => {
  const { filterVariant } = column.columnDef.meta ?? {};
  const [title, setTitle] = useState(" ");
  const [isScoreSet, setIsScoreSet] = useState(false);
  const [isKeywordSet, setIsKeywordSet] = useState(false);
  const [isReviewSet, setIsReviewSet] = useState(false);
  const setSearchParameters = useManageSearchParameters();
  const { keywordsOptions, scoreOptions } = useAppSelector(OptionsSelector);
  const { refreshTrigger } = useAppSelector(feedsParamsSelector);
  const [score, isAllScoreSelected, setScore] = useSelectAll(scoreOptions);
  const [keywords, isAllKeywordsSelected, setKeywords] =
    useSelectAll(keywordsOptions);
  const [review, isAllReviewSelected, setReview] = useSelectAll(reviews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (refreshTrigger) {
      setTitle(" ");
      setScore(scoreOptions);
      setKeywords(keywordsOptions);
      setReview(reviews);
      dispatch(setTrigger(false));
    }
  }, [refreshTrigger]);

  useEffect(() => {
    if (scoreOptions.length > 0 && !isScoreSet) {
      setScore(scoreOptions);
      setIsScoreSet(true);
    }
    if (keywordsOptions.length > 0 && !isKeywordSet) {
      setKeywords(keywordsOptions);
      setIsKeywordSet(true);
    }
    if (reviews.length > 0 && !isReviewSet) {
      setReview(reviews);
      setIsReviewSet(true);
    }
  }, [scoreOptions, isScoreSet, keywordsOptions, isKeywordSet]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setTitle(" ");
    } else {
      setTitle(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchParameters(title, UpworkFeedSearchBy.Title);
    }
  };

  const handleSelectScoreChange = (
    newValue: MultiValue<{ value: string; label: string }>
  ) => {
    handleChangeParams(
      newValue,
      scoreOptions,
      setScore,
      setSearchParameters,
      UpworkFeedSearchBy.Score
    );
  };

  const handleSelectKeywordChange = (
    newValue: MultiValue<{ value: string; label: string }>
  ) => {
    handleChangeParams(
      newValue,
      keywordsOptions,
      setKeywords,
      setSearchParameters,
      UpworkFeedSearchBy.Keywords
    );
  };

  const handleSelectReactionChange = (
    newValue: MultiValue<{ value: string; label: string }>
  ) => {
    handleChangeParams(
      newValue,
      reviews,
      setReview,
      setSearchParameters,
      UpworkFeedSearchBy.Review
    );
  };

  if (filterVariant === "text") {
    return (
      <TextField
        value={title}
        onChange={handleTitleChange}
        onKeyDown={handleKeyDown}
        sx={{
          minWidth: "140px",
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "2px solid #b0b3b8",
            },
            "&.Mui-focused": {
              "& fieldset": {
                border: "2px solid #0f62fe",
              },
            },
          },
        }}
      />
    );
  }

  if (filterVariant === "selectKeyword") {
    return (
      <ReactSelect
        value={keywordsOptions}
        selectOptions={keywords}
        onChange={handleSelectKeywordChange}
        isAllSelected={isAllKeywordsSelected}
        minWidth="300px"
      />
    );
  }

  if (filterVariant === "selectScore") {
    return (
      <ReactSelect
        value={scoreOptions}
        selectOptions={score}
        onChange={handleSelectScoreChange}
        isAllSelected={isAllScoreSelected}
        minWidth="140px"
      />
    );
  }

  if (filterVariant === "selectReaction") {
    return (
      <ReactSelect
        value={reviews}
        selectOptions={review}
        onChange={handleSelectReactionChange}
        isAllSelected={isAllReviewSelected}
        minWidth="140px"
      />
    );
  }

  if (filterVariant === "date") {
    return <DateRangePicker resetTriggered={refreshTrigger} />;
  }

  return null;
};

export default Search;
