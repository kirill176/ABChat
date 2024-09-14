import { Box, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import Score from "./Score";
import BaseBox from "../StyledComponents/BaseBox";
import { formattedDate } from "../../utils/formattedDate";
import { feedInfoSelector } from "../../store/reducers/FeedInfoSlice";

const ProjectInfo = () => {
  const [full, setFull] = useState(false);
  const { url, title, description, published, score } =
    useAppSelector(feedInfoSelector);

  const handleExpandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFull(!full);
  };

  return (
    <>
      <BaseBox>
        <Typography variant="subtitle1">Project info</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: "8px",
            pb: "24px",
          }}
        >
          <Box>
            {score && <Score score={score} />}
            <Link
              href={url}
              sx={{
                fontSize: "16px",
                lineHeight: "24px",
                p: "0 8px",
                textDecoration: "none",
              }}
            >
              {title}
            </Link>
          </Box>
          <Typography sx={{ fontSize: "16px", lineHeight: "24px" }}>
            {formattedDate(String(published))}
          </Typography>
        </Box>

        <Typography
          sx={{
            textAlign: "left",
            lineHeight: "24px",
            fontSize: "16px",
            maxHeight: full ? "100%" : "144px",
            overflow: full ? "visible" : "hidden",
            textOverflow: full ? "clip" : "ellipsis",
            display: full ? "block" : "-webkit-box",
            WebkitLineClamp: full ? "none" : 6,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <Link sx={{ mt: "8px" }} href="" onClick={handleExpandClick}>
            {full ? "Collapse" : "Expand"}
          </Link>
        </Box>
      </BaseBox>
    </>
  );
};

export default ProjectInfo;
