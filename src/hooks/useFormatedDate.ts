import dayjs from "dayjs";

const useFormattedDate = (dateString: string | dayjs.Dayjs) => {
  return dayjs(dateString).format("MM/DD/YYYY HH:mm:ss");
};

export default useFormattedDate;
