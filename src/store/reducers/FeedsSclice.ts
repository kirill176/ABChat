import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUpworkResponseListFeedsDto } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";

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

export default feedSlice.reducer;
