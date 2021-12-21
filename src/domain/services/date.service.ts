import { DateTime } from 'luxon';
import { Weekdays } from '../enums/weekdays.enum';

const DAYS_IN_A_WEEK = 7;

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

export const getNumberOfMonthMatrixRows = (year: number, month: number) => {
  const MIN_NUMBER_OF_DAYS_IN_A_MONTH = 28;
  const MAX_NUMBER_OF_DAYS_IN_A_MONTH = 31;
  const MAX_NUMBER_OF_WEEK_ROWS = 6;
  const MIN_NUMBER_OF_WEEK_ROWS = 4;

  const lastDay = getLastDayOfMonth(year, month);
  const firstWeekdayOfMonth = getWeekdayOfFirstDayOfMonth(year, month);

  if(lastDay === MIN_NUMBER_OF_DAYS_IN_A_MONTH) {
    if(firstWeekdayOfMonth === Weekdays.SUNDAY){
      return MIN_NUMBER_OF_WEEK_ROWS;
    }
    return MIN_NUMBER_OF_WEEK_ROWS + 1;
  }

  if(lastDay === MAX_NUMBER_OF_DAYS_IN_A_MONTH) {
    if(firstWeekdayOfMonth >= Weekdays.FRIDAY) {
    return MAX_NUMBER_OF_WEEK_ROWS;
    }
    return MAX_NUMBER_OF_WEEK_ROWS - 1;
  }

  if(lastDay === MAX_NUMBER_OF_DAYS_IN_A_MONTH - 1){
    if(firstWeekdayOfMonth >= Weekdays.SATURDAY){
      return MAX_NUMBER_OF_WEEK_ROWS
    }
    return MAX_NUMBER_OF_WEEK_ROWS - 1;
  }

  return MAX_NUMBER_OF_WEEK_ROWS - 1;
}

const getNullArray = (size: number) => new Array(size).fill(null);
const getSequenceArray = (size: number, base: number) => new Array(size).fill(null).map((_, i) => i + base);

const get0thMonthMatrixRow = (firstDayOfMonthIndex: number, lastDayOf0thRow: number) => {
  return [...getNullArray(firstDayOfMonthIndex), ...getSequenceArray(lastDayOf0thRow, 1)]
}

const isLessThanAWeek = (days: number) => days <= DAYS_IN_A_WEEK;

const getNthMonthMatrixRow = (lastDayOfMonth: number, currentRow: number, lastDayOf0thRow: number) => {
  const firstDayOfRow = (currentRow - 1) * DAYS_IN_A_WEEK + lastDayOf0thRow + 1;
  const remainingMonthDays = lastDayOfMonth - firstDayOfRow + 1;
  const hasLessRemainingDaysThanAWeek = isLessThanAWeek(remainingMonthDays);
  const filledSpots =  hasLessRemainingDaysThanAWeek ? remainingMonthDays : DAYS_IN_A_WEEK;
  const nullSpots = hasLessRemainingDaysThanAWeek ? DAYS_IN_A_WEEK - remainingMonthDays : 0;

  return [...getSequenceArray(filledSpots, firstDayOfRow), ...getNullArray(nullSpots)];
}

export const getMonthMatrixRow = (firstDayOfMonthIndex: number, lastDayOfMonth: number, currentRow: number) => {
  const lastDayOf0thRow = DAYS_IN_A_WEEK - firstDayOfMonthIndex;

  if(currentRow === 0) {
    return get0thMonthMatrixRow(firstDayOfMonthIndex, lastDayOf0thRow);
  }

  return getNthMonthMatrixRow(lastDayOfMonth, currentRow, lastDayOf0thRow);
}
