import { UpworkFeedSearchBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { feedsParamsSlice } from "../store/reducers/FeedsParamsSlice";
import { useAppDispatch } from "./redux";

function useSearchParameters() {
  const dispatch = useAppDispatch();

  const setSearchParameters = (
    value: string | string[],
    searchBy: UpworkFeedSearchBy
  ) => {
    if (value.length !== 0 || searchBy == UpworkFeedSearchBy.Published) {
      dispatch(
        feedsParamsSlice.actions.setSearchParameters([
          { searchQuery: value, searchBy },
        ])
      );
    }
  };

  return setSearchParameters;
}

export default useSearchParameters;
