import { UpworkFeedSearchBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { MultiValue } from "react-select";

export const handleChangeParams = (
  newOptions: MultiValue<{ value: string; label: string }>,
  options: MultiValue<{ value: string; label: string }>,
  setFunction: React.Dispatch<
    React.SetStateAction<MultiValue<{ value: string; label: string }>>
  >,
  setSearchParameters: (
    values: string | string[],
    searchBy: UpworkFeedSearchBy
  ) => void,
  searchBy: UpworkFeedSearchBy
) => {
  let value: string | string[] = newOptions.map((option) => option.value);

  if (value.includes("ALL")) {
    newOptions = value.length > options.length ? [] : options;
    value = "";
  }
  if (value.length === options.length || value.length == 0) {
    value = "";
  }

  setFunction(newOptions);
  setSearchParameters(value, searchBy);
};
