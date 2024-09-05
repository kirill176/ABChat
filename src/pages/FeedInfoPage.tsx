import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useGetFeedQuery } from "../services/FeedsAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "@mui/material";
import ProjectInfo from "../components/UpworkFeedInfo/ProjectInfo";
import Keywords from "../components/UpworkFeedInfo/Keywords";
import BaseBox from "../components/StyledComponents/BaseBox";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { feedInfoSlice } from "../store/reducers/FeedInfoSlice";
import MatchedCases from "../components/UpworkFeedInfo/MatchedCases";
import { IUpworkFeedMatchEntityDto } from "../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-match-entity.dto";

const FeedInfoPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetFeedQuery(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { matchedCasesData, matchedBlogsData } = useAppSelector(
    (state) => state.feedInfo.data
  );

  useEffect(() => {
    dispatch(feedInfoSlice.actions.setFeed(data));
  }, [data]);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          m: "auto",
          p: "0 32px",
          pt: "72px",
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Link
              href=""
              onClick={handleBackClick}
              sx={{ textDecoration: "none" }}
            >
              Upwork feeds {">"}
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              m: "8px 0",
            }}
          >
            <Typography variant="h1" sx={{ ml: "0" }}>
              {data.data.title}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "8px",
                borderColor: "secondary.main",
              }}
            >
              <img src="../img/sendD.png" alt="" />
              <Typography sx={{ pl: "8px" }}>
                Save & Generate response
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box sx={{ maxWidth: "800px", m: "0 auto" }}>
          <ProjectInfo />
          <Keywords />
          <BaseBox>
            <Typography variant="subtitle1">Matched cases</Typography>
            {matchedCasesData.map((matchedCase: IUpworkFeedMatchEntityDto) => (
              <MatchedCases
                key={matchedCase.docId}
                matched={matchedCase}
                contentShow={true}
              />
            ))}
          </BaseBox>
          <BaseBox>
            <Typography variant="subtitle1">Matched blogs</Typography>
            {matchedBlogsData.map((matchedBlog: IUpworkFeedMatchEntityDto) => (
              <MatchedCases
                key={matchedBlog.docId}
                matched={matchedBlog}
                contentShow={false}
              />
            ))}
          </BaseBox>
        </Box>
      </Box>
    </>
  );
};

export default FeedInfoPage;
