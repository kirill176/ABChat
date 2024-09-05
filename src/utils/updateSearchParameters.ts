import { UpworkFeedSearchBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { ISearchParameterDTO } from "../interfaces-submodule/interfaces/dto/common/isearch-parameter.interface";

export function updateSearchParameters(
  currentParams: ISearchParameterDTO<UpworkFeedSearchBy>[] | undefined,
  newParameters: ISearchParameterDTO<UpworkFeedSearchBy>[]
): ISearchParameterDTO<UpworkFeedSearchBy>[] {
  const updatedParams = (currentParams ?? []).map((param) => {
    const newParam = newParameters.find((p) => p.searchBy === param.searchBy);

    if (newParam && newParam.searchQuery === "") {
      return null;
    }

    return newParam ? { ...param, searchQuery: newParam.searchQuery } : param;
  });

  const filteredParams = updatedParams.filter(
    (param): param is ISearchParameterDTO<UpworkFeedSearchBy> => param !== null
  );

  const paramsToAdd = newParameters.filter(
    (p) =>
      p.searchQuery !== "" &&
      !filteredParams.some(
        (existingParam) => existingParam.searchBy === p.searchBy
      )
  );

  return [...filteredParams, ...paramsToAdd];
}
