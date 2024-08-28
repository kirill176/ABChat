import { TableCell, TableRow, Typography } from "@mui/material";
import React, { FC } from "react";
import { IUpworkFeedItemDTO } from "../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-item.dto";
import { Link } from "@mui/material";
import { useThemeContext } from "../ThemeContextProvider";
import { useNavigate } from "react-router-dom";
import Score from "./UpworkFeedInfo/Score";
import Keyword from "./UpworkFeedInfo/Keyword";
import useFormattedDate from "../hooks/useFormatedDate";

interface FeedsRowsTypes {
  feed: IUpworkFeedItemDTO;
}

const FeedsRows: FC<FeedsRowsTypes> = ({ feed }) => {
  const {
    theme: {
      palette: { mode },
    },
  } = useThemeContext();
  const { title, url, score, published, matchedCases, matchedBlogs, keywords } =
    feed;
  const formattedDate = useFormattedDate(published);
  const navigate = useNavigate();

  const handleFeedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`${feed.id}`);
  };

  return (
    <>
      <TableRow
        onClick={handleFeedClick}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: mode == "light" ? "#EBECF0" : "#252733",
          },
        }}
      >
        <TableCell>
          <Link sx={{ textDecoration: "none" }} href={url}>
            {title}
          </Link>
        </TableCell>
        <TableCell
          sx={{
            color: mode == "light" ? "#414752" : "#C9CED6",
            textAlign: "center",
          }}
        >
          {formattedDate}
        </TableCell>
        <TableCell>
          {keywords.map((keyword) => (
            <Keyword key={keyword} keyword={keyword} />
          ))}
        </TableCell>
        <TableCell>
          <Score score={score} />
        </TableCell>
        <TableCell sx={{ textAlign: "right" }}>
          <Typography variant="body2">{matchedCases}</Typography>
        </TableCell>
        <TableCell sx={{ textAlign: "right" }}>
          <Typography variant="body2">{matchedBlogs}</Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default FeedsRows;
