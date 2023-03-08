import { format } from "date-fns";

// ------------------------------
// Convert date string to readable format
// ------------------------------
const dateFormatter = (
  date: string,
  structure: "do MMM yyyy" | "MMM do yyyy"
) => {
  return format(new Date(date), structure);
};

export default dateFormatter;
