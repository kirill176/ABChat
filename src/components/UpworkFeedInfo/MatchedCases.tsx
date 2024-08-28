import React, { FC } from "react";
import { Box, Checkbox, Link, Typography } from "@mui/material";
import { IUpworkFeedMatchEntityDto } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-match-entity.dto";
import dayjs from "dayjs";

interface MatchedCasesTypes {
  matched: IUpworkFeedMatchEntityDto;
  contentShow: boolean;
}

const MatchedCases: FC<MatchedCasesTypes> = ({ matched, contentShow }) => {
  const { title, link, content, selected, infoBlock } = matched;

  const format = (date: string) => {
    return dayjs(date).format("DD MMM YYYY");
  };

  return (
    <>
      <Box
        sx={{
          borderBottom: "1px solid #D5D7DB",
          px: "16px",
          py: "8px",
          mt: "4px",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              sx={{
                fontSize: "16px",
                lineHeight: "24px",
                pt: "8px",
                pb: "4px",
              }}
              href={link}
            >
              {title}
            </Link>
            <Checkbox value={selected}></Checkbox>
          </Box>
          {contentShow && (
            <Typography sx={{ textAlign: "left" }}>{content}</Typography>
          )}

          {infoBlock?.map((info) => (
            <Box
              sx={{
                display: "flex",
                mt: "4px",
              }}
              key={info.key}
            >
              <Typography sx={{ color: "#70737A", mr: "8px" }} variant="body2">
                {info.key}:
              </Typography>
              <Typography variant="body2">
                {info.key == "Published" ? format(info.value) : info.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default MatchedCases;
