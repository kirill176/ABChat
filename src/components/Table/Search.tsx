import React, { useEffect, useState } from "react";
import { Column } from "@tanstack/react-table";
import { TextField } from "@mui/material";
import useSearchParameters from "../../hooks/useSearchParameters";
import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import RenderSelect from "./RenderSelect";
import { useAppSelector } from "../../hooks/redux";
import useSelectAll from "../../hooks/useSelectAll";
import useLabels from "../../hooks/useLabels";
import { handleChangeParams } from "../../utils/handleChangeParams";
import DateRangePicker from "./DateRangePicker";

const Search = ({ column }: { column: Column<any, unknown> }) => {
  const { filterVariant } = column.columnDef.meta ?? {};
  const [title, setTitle] = useState(" ");
  const setSearchParameters = useSearchParameters();
  const [isScoreSet, setIsScoreSet] = useState(false);
  const [isKeywordSet, setIsKeywordSet] = useState(false);
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

  if (filterVariant === "text") {
    return (
      <TextField
        value={title}
        onChange={handleTitleChange}
        onKeyDown={handleKeyDown}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
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
    return RenderSelect(
      keywords,
      kLabels,
      (e) =>
        handleChangeParams(
          e,
          kLabels,
          setKeywords,
          setSearchParameters,
          UpworkFeedSearchBy.Keywords
        ),
      isAllKeywordsSelected
    );
  }

  if (filterVariant === "selectScore") {
    return RenderSelect(
      score,
      sLabels,
      (e) =>
        handleChangeParams(
          e,
          sLabels,
          setScore,
          setSearchParameters,
          UpworkFeedSearchBy.Score
        ),
      isAllScoreSelected
    );
  }

  if (filterVariant === "date") {
    return <DateRangePicker />;
  }

  return null;
};

export default Search;
