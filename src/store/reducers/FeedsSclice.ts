import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { IUpworkResponseListFeedsDto } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import { RootState } from "..";

const initialState: IUpworkResponseListFeedsDto = {
  items: {
    totalCount: 0,
    totalPages: 0,
    pageNumber: 0,
    pageSize: 0,
    items: [],
  },
  keywordsOptions: [],
  scoreOptions: [],
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeeds(state, action: PayloadAction<IUpworkResponseListFeedsDto>) {
      return action.payload;
    },
  },
});

const selfState = (state: RootState) => state.feed;

export const feedsSelector = createSelector(selfState, (state) => state.items);

export const OptionsSelector = createSelector(selfState, (state) => ({
  keywordsOptions: state.keywordsOptions,
  scoreOptions: state.scoreOptions,
}));

export const reviewSelector = createSelector(
  selfState,
  (state) => state.items.items?.review
);

export const { setFeeds } = feedSlice.actions;

export default feedSlice.reducer;
