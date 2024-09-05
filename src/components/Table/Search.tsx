import React, { useEffect, useState } from "react";
import { Column } from "@tanstack/react-table";
import { TextField } from "@mui/material";
import useSearchParameters from "../../hooks/useSearchParameters";
import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { useAppSelector } from "../../hooks/redux";
import useSelectAll from "../../hooks/useSelectAll";
import { handleChangeParams } from "../../utils/handleChangeParams";
import DateRangePicker from "./DateRangePicker";
import ReactSelect from "./ReactSelect";
import { MultiValue } from "react-select";

const Search = ({ column }: { column: Column<any, unknown> }) => {
  const { filterVariant } = column.columnDef.meta ?? {};
  const [title, setTitle] = useState(" ");
  const setSearchParameters = useSearchParameters();
  const [isScoreSet, setIsScoreSet] = useState(false);
  const [isKeywordSet, setIsKeywordSet] = useState(false);
  const { scoreOptions, keywordsOptions } = useAppSelector(
    (state) => state.feed
  );
  const searchParameters = useAppSelector(
    (state) => state.feedsParams.searchParameters
  );
  const [score, isAllScoreSelected, setScore] = useSelectAll(scoreOptions);
  const [keywords, isAllKeywordsSelected, setKeywords] =
    useSelectAll(keywordsOptions);
  const [resetTriggered, setResetTriggered] = useState(false);

  useEffect(() => {
    if (resetTriggered) {
      setTitle(" ");
      setScore(scoreOptions);
      setKeywords(keywordsOptions);
      setResetTriggered(false);
    }
  }, [resetTriggered]);

  useEffect(() => {
    if (
      searchParameters?.length === 1 &&
      searchParameters[0].searchQuery === " " &&
      searchParameters[0].searchBy === UpworkFeedSearchBy.Title
    ) {
      setResetTriggered(true);
    }
  }, [searchParameters]);

  useEffect(() => {
    if (scoreOptions.length > 0 && !isScoreSet) {
      setScore(scoreOptions);
      setIsScoreSet(true);
    }
    if (keywordsOptions.length > 0 && !isKeywordSet) {
      setKeywords(keywordsOptions);
      setIsKeywordSet(true);
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
      score,
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
      keywords,
      setKeywords,
      setSearchParameters,
      UpworkFeedSearchBy.Keywords
    );
  };

  if (filterVariant === "text") {
    return (
      <TextField
        value={title}
        onChange={handleTitleChange}
        onKeyDown={handleKeyDown}
        sx={{
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
      />
    );
  }

  if (filterVariant === "date") {
    return <DateRangePicker resetTriggered={resetTriggered} />;
  }

  return null;
};

export default Search;
