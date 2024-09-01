export const calculate = (pageNumber: number, pageSize: number) => {
  if (pageNumber == 1) {
    return 1;
  } else {
    return pageSize * pageNumber - pageSize + 1;
  }
};
