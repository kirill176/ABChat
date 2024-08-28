import { useMemo } from "react";
import { IOptionInterface } from "../interfaces-submodule/interfaces/dto/common/ioption.interface";

function useLabels(
  scoreOptions: IOptionInterface[],
  keywordsOptions: IOptionInterface[]
) {
  return useMemo(
    () => [
      scoreOptions.map((option) => option.label),
      keywordsOptions.map((option) => option.label),
    ],
    [scoreOptions, keywordsOptions]
  );
}

export default useLabels;
