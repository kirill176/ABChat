import { UpworkFeedSearchBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { MultiValue } from "react-select";

export const handleChangeParams = (
  e: MultiValue<{ value: string; label: string }>,
  options: MultiValue<{ value: string; label: string }>,
  setFunction: React.Dispatch<
    React.SetStateAction<MultiValue<{ value: string; label: string }>>
  >,
  setSearchParameters: (values: string[], searchBy: UpworkFeedSearchBy) => void,
  searchBy: UpworkFeedSearchBy
) => {
  const value = e.map((option) => option.value);
  const opt = options.map((option) => option.value);

  if (value.includes("ALL")) {
    const newSelectValue = value.length > options.length ? [] : options;
    const newSearchParameter = value.length > opt.length ? [] : opt;
    setFunction(newSelectValue);
    setSearchParameters(newSearchParameter, searchBy);
  } else {
    setFunction(e);
    setSearchParameters(value, searchBy);
  }
};
