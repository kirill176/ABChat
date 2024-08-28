import React from "react";
import {
  Checkbox,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { FixedSizeListProps, FixedSizeList as List } from "react-window";
import styled from "styled-components";

const StyledList = styled(
  ({ height, width, ...props }: FixedSizeListProps<any>) => (
    <List {...props} height={height} width={width} />
  )
)({
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
  width: "100%",
  minWidth: "240px",
  boxSizing: "border-box",
});

const RenderSelect = (
  value: string[] | string,
  labels: string[],
  onChange: (e: SelectChangeEvent<string[] | string>) => void,
  isAllSelected: boolean
) => {
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const label = labels[index];
    const isChecked = Array.isArray(value) && value.includes(label);

    return (
      <MenuItem key={label} value={label} style={style}>
        <ListItemIcon>
          <Checkbox
            name="select-checkbox"
            checked={isChecked}
            onChange={() => {
              if (Array.isArray(value)) {
                const newValue = isChecked
                  ? value.filter((v) => v !== label)
                  : [...value, label];

                const event = {
                  target: { value: newValue },
                } as SelectChangeEvent<string[] | string>;
                onChange(event);
              }
            }}
          />
        </ListItemIcon>
        <ListItemText
          sx={{
            "& .MuiTypography-root": {
              textAlign: "left", // Выровнять текст по левому краю
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: "500",
            },
          }}
          primary={label}
        />
      </MenuItem>
    );
  };

  return (
    <Select
      multiple
      value={value}
      id="multi-select"
      onChange={onChange}
      renderValue={(select) => (
        <Typography
          sx={{
            display: "inline-block",
            maxWidth: "350px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "left",
          }}
        >
          {isAllSelected
            ? "ALL"
            : Array.isArray(select)
            ? select.join(", ")
            : select}
        </Typography>
      )}
    >
      <MenuItem
        value="ALL"
        sx={{
          borderBottom: "1px solid #EBECF0",
          mb: "4px",
          pb: "4px",
          display: "flex",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <ListItemIcon>
          <Checkbox checked={isAllSelected} />
        </ListItemIcon>
        <ListItemText
          sx={{
            "& .MuiTypography-root": {
              textAlign: "left",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: "500",
            },
          }}
          primary="ALL"
        ></ListItemText>
      </MenuItem>
      <StyledList
        height={300}
        itemCount={labels.length}
        itemSize={35}
        width={"100%"}
      >
        {Row}
      </StyledList>
    </Select>
  );
};

export default RenderSelect;
