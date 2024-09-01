import { SelectChangeEvent } from "@mui/material";
import { UpworkFeedSearchBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";

export const handleChangeParams = (
  e: SelectChangeEvent<string[] | string>,
  options: string[],
  setFunction: React.Dispatch<React.SetStateAction<string[] | string>>,
  setSearchParameters: (values: string[], searchBy: UpworkFeedSearchBy) => void,
  searchBy: UpworkFeedSearchBy
) => {
  const value = e.target.value as string[];

  if (value.includes("ALL")) {
    const newSelectValue = value.length >= options.length ? [] : options;
    setFunction(newSelectValue);
    setSearchParameters(newSelectValue, searchBy);
  } else {
    setFunction(value);
    setSearchParameters(value, searchBy);
  }
};
