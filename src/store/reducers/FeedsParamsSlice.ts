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

      state.searchParameters = state.searchParameters ?? [];

      state.searchParameters = state.searchParameters
        .map((param) => {
          const newParam = newParameters.find(
            (p) => p.searchBy === param.searchBy
          );

          if (newParam && newParam.searchQuery === "") {
            return null;
          }

          return newParam
            ? { ...param, searchQuery: newParam.searchQuery }
            : param;
        })
        .filter(
          (param): param is ISearchParameterDTO<UpworkFeedSearchBy> =>
            param !== null
        );

      const paramsToAdd = newParameters.filter(
        (p) =>
          p.searchQuery !== "" &&
          !state.searchParameters?.some(
            (existingParam) => existingParam.searchBy === p.searchBy
          )
      );

      state.searchParameters.push(...paramsToAdd);
    },
    setSort(state, action: PayloadAction<FeedsSortState>) {
      state.sortDirection = action.payload.sortDirection;
      state.sortBy = action.payload.sortBy;
    },
    refresh: () => initialState,
  },
});

export const { setFeedsParams, setSearchParameters, setSort, refresh } =
  feedsParamsSlice.actions;

export default feedsParamsSlice.reducer;
