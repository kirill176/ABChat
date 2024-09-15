import React, { FC, useState } from "react";
import Select, {
  components,
  MultiValue,
  OptionProps,
  StylesConfig,
  ValueContainerProps,
} from "react-select";
import { IOptionInterface } from "../../interfaces-submodule/interfaces/dto/common/ioption.interface";
import {
  Box,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { FixedSizeListProps, FixedSizeList as List } from "react-window";
import styled from "styled-components";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useThemeContext } from "../../ThemeContextProvider";

interface OptionType {
  label: string;
  value: string;
}

interface ReactSelectProps {
  value: IOptionInterface[];
  selectOptions: MultiValue<{ value: string; label: string }>;
  onChange: (newValue: MultiValue<OptionType>) => void;
  isAllSelected: boolean;
  minWidth: string;
}

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
  boxSizing: "border-box",
});

const ReactSelect: FC<ReactSelectProps> = ({
  value,
  selectOptions,
  onChange,
  isAllSelected,
  minWidth,
}) => {
  const allOption: OptionType = { label: "ALL", value: "ALL" };
  const options = [allOption, ...value];
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));
  const {
    theme: {
      palette: { mode },
    },
  } = useThemeContext();

  const Option = (props: OptionProps<OptionType, true>) => {
    const { data, innerRef, innerProps, isSelected } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "5px",
          cursor: "pointer",
        }}
      >
        <ListItemIcon>
          <Checkbox checked={isAllSelected ? true : isSelected} />
        </ListItemIcon>
        <ListItemText
          sx={{
            "& .MuiTypography-root": {
              textAlign: "left",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: "500",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
          primary={data.label}
        />
      </div>
    );
  };

  const CustomValueContainer = ({
    children,
    ...props
  }: ValueContainerProps<OptionType, true>) => {
    const selectedValues = isAllSelected
      ? "ALL"
      : props
          .getValue()
          .map((val: OptionType) => val.label)
          .join(", ");

    return (
      <components.ValueContainer {...props}>
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
          {selectedValues}
        </Typography>
      </components.ValueContainer>
    );
  };

  const MenuList = (props: any) => {
    const { options, children, maxHeight, getValue } = props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * 49;

    return (
      <StyledList
        height={maxHeight}
        width={"100%"}
        itemCount={children.length}
        itemSize={49}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </StyledList>
    );
  };

  const customStyles: StylesConfig<OptionType> = {
    container: (provided) => ({
      ...provided,
      minWidth: minWidth,
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.menuIsOpen ? "2px solid #0F62FE" : "2px solid #B0B3B8",
      boxShadow: "none",
      height: "44px",
      backgroundColor: "transparent",
      cursor: "pointer",
      "&:hover": {
        border: state.menuIsOpen ? "2px solid #0F62FE" : "2px solid #B0B3B8",
      },
    }),
    menu: (provided) => ({
      ...provided,
      border: "1px solid #D5D7DB",
      backgroundColor: mode == "light" ? "white" : "#181A1F",
    }),
  };

  return (
    <Box ref={ref}>
      <Select
        isMulti={true}
        options={options}
        components={{ MenuList, Option, ValueContainer: CustomValueContainer }}
        closeMenuOnSelect={false}
        isClearable={false}
        onChange={onChange}
        value={selectOptions}
        hideSelectedOptions={false}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        menuIsOpen={isOpen}
        styles={customStyles}
      />
    </Box>
  );
};

export default ReactSelect;
