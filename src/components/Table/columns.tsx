import { ColumnDef, RowData } from "@tanstack/react-table";
import { Box, Link, Typography } from "@mui/material";
import Keyword from "../UpworkFeedInfo/Keyword";
import Score from "../UpworkFeedInfo/Score";
import React from "react";
import TableHeadCell from "./TableHeadRow";
import { IUpworkFeedItemDTO } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-item.dto";
import { UpworkFeedSortBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-sort-by.enum";
import { formattedDate } from "../../utils/formattedDate";
import { ReviewType } from "../../interfaces-submodule/enums/upwork-feed/review-type.enum";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?:
      | "text"
      | "selectKeyword"
      | "selectScore"
      | "date"
      | "selectReaction";
  }
}

export const columns: ColumnDef<IUpworkFeedItemDTO, any>[] = [
  {
    header: () => (
      <TableHeadCell
        title="Title"
        button={true}
        sortBy={UpworkFeedSortBy.Title}
      />
    ),
    cell: ({ row }) => (
      <Link href={row.original.url}>{row.original.title}</Link>
    ),
    accessorKey: "title",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: () => (
      <TableHeadCell
        title="Published"
        button={true}
        sortBy={UpworkFeedSortBy.Published}
      />
    ),
    cell: ({ row }) => formattedDate(row.original.published),
    accessorKey: "published",
    meta: {
      filterVariant: "date",
    },
  },
  {
    header: () => <TableHeadCell title="Keywords" />,
    cell: ({ row }) => {
      const { keywords } = row.original;

      if (!Array.isArray(keywords) || keywords.length === 0) {
        return (
          <Typography sx={{ textAlign: "center", textWrap: "nowrap" }}>
            No keywords
          </Typography>
        );
      }

      return (
        <>
          {keywords.map((keyword: string) => (
            <Keyword key={keyword} keyword={keyword} />
          ))}
        </>
      );
    },
    accessorKey: "keywords",
    meta: {
      filterVariant: "selectKeyword",
    },
  },
  {
    header: () => (
      <TableHeadCell
        title="Score"
        button={true}
        sortBy={UpworkFeedSortBy.Score}
      />
    ),
    cell: ({ row }) => {
      const score = row.original.score;
      if (typeof score !== "number") {
        return (
          <Typography sx={{ textAlign: "center", textWrap: "nowrap" }}>
            No score
          </Typography>
        );
      }

      return <Score score={score} />;
    },
    accessorKey: "score",
    meta: {
      filterVariant: "selectScore",
    },
  },
  {
    header: () => <TableHeadCell title="Reaction" />,
    cell: ({ row }) =>
      row.original.review ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={
              row.original.review.type == ReviewType.Like
                ? "../../img/like.png"
                : "../../img/dislike.png"
            }
            alt={
              row.original.review.type === ReviewType.Like ? "Like" : "Dislike"
            }
          />
        </Box>
      ) : null,
    accessorKey: "review",
    meta: {
      filterVariant: "selectReaction",
    },
  },

  {
    header: () => <TableHeadCell title="Matched cases" />,
    cell: ({ row }) => (
      <Typography variant="body2" sx={{ float: "right" }}>
        {row.original.matchedCases}
      </Typography>
    ),
    accessorKey: "matchedCases",
  },
  {
    header: () => <TableHeadCell title="Mathed blogs" />,
    cell: ({ row }) => (
      <Typography variant="body2" sx={{ float: "right" }}>
        {row.original.matchedBlogs}
      </Typography>
    ),
    accessorKey: "matchedBlogs",
  },
];
