import { useCallback } from "react";
import { useGetFeedsMutation } from "../services/FeedsAPI";
import { setFeeds } from "../store/reducers/FeedsSclice";
import { IGetAllUpworkFeedRequest } from "../interfaces-submodule/interfaces/dto/upwork-feed/iget-all-upwork-feed-request.interface";
import { useAppDispatch } from "./redux";

const useFetchFeeds = () => {
  const dispatch = useAppDispatch();
  const [getFeeds, { isLoading, error }] = useGetFeedsMutation();

  const handleFetchFeeds = useCallback(
    async (
      pageSize: number,
      pageNumber: number,
      searchParams: IGetAllUpworkFeedRequest
    ) => {
      try {
        const response = await getFeeds({
          pageSize,
          pageNumber,
          searchParams,
        }).unwrap();
        dispatch(setFeeds(response.data));
      } catch (err) {
        console.error("Failed to fetch feeds:", err);
      }
    },
    [getFeeds, dispatch]
  );

  return { handleFetchFeeds, isLoading, error };
};

export default useFetchFeeds;
