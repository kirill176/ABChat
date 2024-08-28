import { useState } from "react";
import { IOptionInterface } from "../interfaces-submodule/interfaces/dto/common/ioption.interface";

function useSelectAll(
  initialLabels: string[],
  options: IOptionInterface[]
): [
  string[] | string,
  boolean,
  React.Dispatch<React.SetStateAction<string[] | string>>
] {
  const [selected, setSelected] = useState<string[] | string>(initialLabels);
  const isAllSelected = selected.length === options.length;

  return [selected, isAllSelected, setSelected];
}

export default useSelectAll;
