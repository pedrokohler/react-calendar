import { DateTime } from 'luxon';
import { Weekdays } from '../enums/weekdays.enum';

const MIN_NUMBER_OF_DAYS_IN_A_MONTH = 28;
const MAX_NUMBER_OF_WEEK_ROWS = 5;
const MIN_NUMBER_OF_WEEK_ROWS = 4;

const getDateTimeFromYearAndMonth = (year: number, month: number): DateTime => {
  return DateTime.local().set({ year, month });
}

export const getLastDayOfMonth = (year: number, month: number): number => {
  const dateTime = getDateTimeFromYearAndMonth(year, month);
  return dateTime.endOf('month').day as number;
}

export const getWeekdayOfFirstDayOfMonth = (year: number, month: number): number => {
  const dateTime = getDateTimeFromYearAndMonth(year, month);
  return dateTime.startOf('month').weekday
}

export const getNumberOfWeekRows = (year: number, month: number) => {
  const lastDay = getLastDayOfMonth(year, month);

  if(lastDay > MIN_NUMBER_OF_DAYS_IN_A_MONTH) {
    return MAX_NUMBER_OF_WEEK_ROWS;
  }

  const firstWeekdayOfMonth = getWeekdayOfFirstDayOfMonth(year, month);

  if(firstWeekdayOfMonth === Weekdays.SUNDAY){
    return MIN_NUMBER_OF_WEEK_ROWS;
  }

  return MAX_NUMBER_OF_WEEK_ROWS;
}
