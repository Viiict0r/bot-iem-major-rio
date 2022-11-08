import { setMinutes, setHours, setYear, setMonth, setDate, differenceInDays, differenceInHours, subDays, differenceInMinutes, subHours } from "date-fns";

export const EVENT_DATE = setMinutes(setHours(setYear(setMonth(setDate(new Date(), 9), 10), 2022), 0), 0)

export function getTimeLeft() {
  const days = differenceInDays(EVENT_DATE, new Date())
  const hours = differenceInHours(subDays(EVENT_DATE, days), new Date())
  const minutes = differenceInMinutes(subHours(subDays(EVENT_DATE, days), hours), new Date())

  const formatted = `${days} dia${days > 1 ? 's' : ''}, ${hours} hora${hours > 1 ? 's' : ''} e ${minutes} minuto${minutes > 1 ? 's' : ''}`

  return formatted
}
