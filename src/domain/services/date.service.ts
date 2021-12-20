import { DateTime } from 'luxon';

export const getLastDayOfMonth = (year: number, month: number): number => {
  const dateTime = DateTime.local().set({ year, month });
  return dateTime.endOf('month').day as number;
}

export const getWeekdayOfFirstDayOfMonth = (year: number, month: number): number => {
  const dateTime = DateTime.local().set({ year, month });
  return dateTime.startOf('month').weekday
}