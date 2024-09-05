import { format } from "date-fns";

const useFormattedDate = (date: Date | string) => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return format(parsedDate, "MM/dd/yyyy HH:mm:ss");
};

export default useFormattedDate;
