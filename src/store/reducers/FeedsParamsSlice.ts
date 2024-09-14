import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGetAllUpworkFeedRequest } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iget-all-upwork-feed-request.interface";
import { SortDirection } from "../../interfaces-submodule/enums/common/sort-direction.enum";
import { UpworkFeedSortBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-sort-by.enum";
import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { ISearchParameterDTO } from "../../interfaces-submodule/interfaces/dto/common/isearch-parameter.interface";
import { updateSearchParameters } from "../../utils/updateSearchParameters";
import { RootState } from "..";

interface FeedsParamsState {
  pageSize: number;
  pageNumber: number;
  searchParameters: ISearchParameterDTO<UpworkFeedSearchBy>[];
  sortDirection: SortDirection;
  sortBy: UpworkFeedSortBy;
  refreshTrigger: boolean;
}

interface FeedsSortState {
  sortDirection: SortDirection;
  sortBy: UpworkFeedSortBy;
}

const initialState: IGetAllUpworkFeedRequest & { refreshTrigger: boolean } = {
  searchParameters: [{ searchQuery: " ", searchBy: UpworkFeedSearchBy.Title }],
  sortDirection: SortDirection.ASC,
  sortBy: UpworkFeedSortBy.Title,
  refreshTrigger: false,
};

export const feedsParamsSlice = createSlice({
  name: "feedsParams",
  initialState,
  reducers: {
    setFeedsParams(state, action: PayloadAction<Partial<FeedsParamsState>>) {
      Object.assign(state, action.payload);
    },
    addSearchParameters(
      state,
      action: PayloadAction<ISearchParameterDTO<UpworkFeedSearchBy>[]>
    ) {
      state.searchParameters = updateSearchParameters(
        state.searchParameters,
        action.payload
      );
    },
    setSort(state, action: PayloadAction<FeedsSortState>) {
      state.sortDirection = action.payload.sortDirection;
      state.sortBy = action.payload.sortBy;
    },
    setTrigger(state, action: PayloadAction<boolean>) {
      state.refreshTrigger = action.payload;
    },
    refresh: () => initialState,
  },
});

export const feedsParamsSelector = (state: RootState) => state.feedsParams;

export const {
  setFeedsParams,
  addSearchParameters,
  setSort,
  setTrigger,
  refresh,
} = feedsParamsSlice.actions;

export default feedsParamsSlice.reducer;
