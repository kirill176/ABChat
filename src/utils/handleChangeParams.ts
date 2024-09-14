import { UpworkFeedSearchBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { MultiValue } from "react-select";

export const handleChangeParams = (
  e: MultiValue<{ value: string; label: string }>,
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
  var value: string | string[] = e.map((option) => option.value);

  if (value.includes("ALL")) {
    var newSelectValue = value.length >= options.length ? [] : options;
    setFunction(newSelectValue);
    setSearchParameters("", searchBy);
  } else {
    value = value.length == 0 ? "" : value;
    setFunction(e);
    setSearchParameters(value, searchBy);
  }
};
