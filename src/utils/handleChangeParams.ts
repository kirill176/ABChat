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

  var newSelectValue = e;
  var newSearchParameter: string | string[] = value;

  if (value.includes("ALL")) {
    newSelectValue = value.length > options.length ? [] : options;
    newSearchParameter = "";
  }
  if (value.length === options.length || newSearchParameter.length == 0) {
    newSearchParameter = "";
  }

  setFunction(newSelectValue);
  setSearchParameters(newSearchParameter, searchBy);
};
