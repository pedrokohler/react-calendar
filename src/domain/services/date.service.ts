import { DateTime } from 'luxon';

export const getLastDayOfMonth = (year: number, month: number) => {
  const dateTime = DateTime.local().set({ year, month });
  return dateTime.endOf('month').day as number;
}