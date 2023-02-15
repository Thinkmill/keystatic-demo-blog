import { format } from 'date-fns'

const dateFormatter = (
  date: string,
  structure: 'do MMM yyyy' | 'MMM do yyyy'
) => {
  return format(new Date(date), structure)
}

export default dateFormatter
