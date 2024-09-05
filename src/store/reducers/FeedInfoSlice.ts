import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUpworkFeedDetailItemDTO } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-detail-item.dto";
import { ReviewType } from "../../interfaces-submodule/enums/upwork-feed/review-type.enum";

interface InfoPage {
  success: boolean;
  statusCode: number;
  data: IUpworkFeedDetailItemDTO;
  error: any;
}

const initialState: InfoPage = {
  success: false,
  statusCode: 0,
  data: {
    id: "",
    url: "",
    title: "",
    description: "",
    published: "",
    keywords: [],
    score: 0,
    matchedCases: 0,
    matchedCasesData: [],
    matchedBlogs: 0,
    matchedBlogsData: [],
    presetId: "",
    accountId: 0,
    review: { type: ReviewType.Like, comment: "" },
  },
  error: null,
};

export const feedInfoSlice = createSlice({
  name: "feedInfo",
  initialState,
  reducers: {
    setFeed(state, action: PayloadAction<InfoPage>) {
      return action.payload;
    },
  },
});

export const { setFeed } = feedInfoSlice.actions;

export default feedInfoSlice.reducer;
