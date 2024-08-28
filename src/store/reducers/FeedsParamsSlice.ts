import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGetAllUpworkFeedRequest } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iget-all-upwork-feed-request.interface";
import { SortDirection } from "../../interfaces-submodule/enums/common/sort-direction.enum";
import { UpworkFeedSortBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-sort-by.enum";
import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { ISearchParameterDTO } from "../../interfaces-submodule/interfaces/dto/common/isearch-parameter.interface";

interface FeedsParamsState {
  pageSize: number;
  pageNumber: number;
  searchParameters: ISearchParameterDTO<UpworkFeedSearchBy>[];
  sortDirection: SortDirection;
  sortBy: UpworkFeedSortBy;
}

interface FeedsSortState {
  sortDirection: SortDirection;
  sortBy: UpworkFeedSortBy;
}

const initialState: IGetAllUpworkFeedRequest = {
  searchParameters: [{ searchQuery: " ", searchBy: UpworkFeedSearchBy.Title }],
  sortDirection: SortDirection.ASC,
  sortBy: UpworkFeedSortBy.Title,
};

export const feedsParamsSlice = createSlice({
  name: "feedsParams",
  initialState,
  reducers: {
    setFeedsParams(state, action: PayloadAction<Partial<FeedsParamsState>>) {
      Object.assign(state, action.payload);
    },
    setSearchParameters(
      state,
      action: PayloadAction<ISearchParameterDTO<UpworkFeedSearchBy>[]>
    ) {
      const newParameters = action.payload;

      state.searchParameters =
        state.searchParameters?.map((param) => {
          const newParam = newParameters.find(
            (p) => p.searchBy === param.searchBy
          );
          if (newParam) {
            return { ...param, searchQuery: newParam.searchQuery };
          }
          return param;
        }) ?? [];

      state.searchParameters = [
        ...state.searchParameters,
        ...newParameters.filter(
          (p) =>
            !state.searchParameters?.some(
              (existingParam) => existingParam.searchBy === p.searchBy
            )
        ),
      ];
    },
    setSort(state, action: PayloadAction<FeedsSortState>) {
      state.sortDirection = action.payload.sortDirection;
      state.sortBy = action.payload.sortBy;
    },
  },
});

export default feedsParamsSlice.reducer;
