import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { formatISO } from "date-fns";
import { Box } from "@mui/material";
import useSearchParameters from "../../hooks/useSearchParameters";
import { useThemeContext } from "../../ThemeContextProvider";
import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const setSearchParameters = useSearchParameters();
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
