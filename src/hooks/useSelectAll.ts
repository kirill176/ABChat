import { useState } from "react";
import { MultiValue } from "react-select";

function useSelectAll(
  initialLabels: MultiValue<{ value: string; label: string }>
): [
  MultiValue<{ value: string; label: string }>,
  boolean,
  React.Dispatch<
    React.SetStateAction<MultiValue<{ value: string; label: string }>>
  >
] {
  const [selected, setSelected] =
    useState<MultiValue<{ value: string; label: string }>>(initialLabels);

  const isAllSelected = selected.length === initialLabels.length;

  return [selected, isAllSelected, setSelected];
}

export default useSelectAll;
