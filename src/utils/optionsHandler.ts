import { UpworkFeedSearchBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { ISearchParameterDTO } from "../interfaces-submodule/interfaces/dto/common/isearch-parameter.interface";

export const optionsHendler = (
  searchQuery: string | string[],
  setFunction: (param: any) => void
) => {
  const options = Array.isArray(searchQuery)
    ? searchQuery.map((query) => ({
        value: query ?? "",
        label: query ?? "",
      }))
    : [{ value: searchQuery ?? "", label: searchQuery ?? "" }];

  setFunction(options);
};

export const handleSearchParameter = (
  param: ISearchParameterDTO<UpworkFeedSearchBy>,
  setTitle: (value: string) => void,
  setKeywords: (options: any) => void,
  setScore: (options: any) => void,
  setReview: (options: any) => void
) => {
  if (param.searchQuery && param.searchQuery.length > 0) {
    const query = Array.isArray(param.searchQuery)
      ? param.searchQuery
      : [param.searchQuery];

    const actions: Record<UpworkFeedSearchBy, () => void> = {
      [UpworkFeedSearchBy.Title]: () => setTitle(query[0]),
      [UpworkFeedSearchBy.Published]: () => {},
      [UpworkFeedSearchBy.Keywords]: () => optionsHendler(query, setKeywords),
      [UpworkFeedSearchBy.Score]: () => optionsHendler(query, setScore),
      [UpworkFeedSearchBy.Review]: () => optionsHendler(query, setReview),
    };

    actions[param.searchBy]?.();
  }
};
