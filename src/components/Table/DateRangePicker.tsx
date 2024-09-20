import React, { FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { formatISO } from "date-fns";
import { Box } from "@mui/material";
import { useThemeContext } from "../../ThemeContextProvider";
import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import useManageSearchParameters from "../../hooks/useManageSearchParameters";
import { useAppSelector } from "../../hooks/redux";
import { feedsParamsSelector } from "../../store/reducers/FeedsParamsSlice";

interface DateRangePickerProps {
  resetTriggered: boolean;
}

const DateRangePicker: FC<DateRangePickerProps> = ({ resetTriggered }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const setSearchParameters = useManageSearchParameters();
  const { searchParameters } = useAppSelector(feedsParamsSelector);
  const {
    theme: {
      palette: { mode },
    },
  } = useThemeContext();

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start || undefined);
    setEndDate(end || undefined);

    if (start && end) {
      const formattedStart = formatISO(start);
      const formattedEnd = formatISO(end);
      setSearchParameters(
        `${formattedStart} - ${formattedEnd}`,
        UpworkFeedSearchBy.Published
      );
    }

    if (!start && !end) {
      setSearchParameters("", UpworkFeedSearchBy.Published);
    }
  };

  useEffect(() => {
    if (resetTriggered) {
      setEndDate(undefined);
      setStartDate(undefined);
    }
  }, [resetTriggered]);

  useEffect(() => {
    const publishedParam = searchParameters?.find(
      (param) => param.searchBy === UpworkFeedSearchBy.Published
    );

    if (publishedParam && typeof publishedParam.searchQuery === "string") {
      const [startD, endD] = publishedParam.searchQuery.split(" - ");

      const startDate = new Date(startD);
      const endDate = new Date(endD);

      setStartDate(startDate);
      setEndDate(endDate);
    }
  }, [searchParameters]);

  return (
    <Box>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        isClearable
        dateFormat="MM/dd/yyyy"
        className={`datepicker ${mode}`}
        calendarClassName={`calendar_${mode}`}
      />
    </Box>
  );
};

export default DateRangePicker;
