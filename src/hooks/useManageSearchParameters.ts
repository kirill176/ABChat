import { UpworkFeedSearchBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { addSearchParameters } from "../store/reducers/FeedsParamsSlice";
import { useAppDispatch } from "./redux";

function useManageSearchParameters() {
  const dispatch = useAppDispatch();

  const setSearchParameters = (
    value: string | string[],
    searchBy: UpworkFeedSearchBy
  ) => {
    if (value.length !== 0 || searchBy == UpworkFeedSearchBy.Published) {
      if (searchBy == UpworkFeedSearchBy.Review) {
        value = value.length == 2 ? "" : value;
      }
      dispatch(addSearchParameters([{ searchQuery: value, searchBy }]));
    }
  };

  return setSearchParameters;
}

export default useManageSearchParameters;
