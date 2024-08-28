import dayjs from "dayjs";

const useISODateFormat = (dateString: string) => {
  return dayjs(dateString).format("YYYY-MM-DDTHH:mm:ss");
};

export default useISODateFormat;
