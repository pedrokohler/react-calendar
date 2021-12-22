import { DateTime } from 'luxon';
import { getNullArray, getSequenceArray } from '../../../lib';
import { Weekdays } from '../enums/weekdays.enum';
import { IMonthMatrix } from '../interfaces/month-matrix.interface';

const DAYS_IN_A_WEEK = 7;

const getDateTimeFromYearAndMonth = (year: number, month: number): DateTime => {
  return DateTime.local().set({ year, month });
}

const getIndexOfWeekday = (weekday: Weekdays) => weekday % Weekdays.SUNDAY;

export const getLastDayOfMonth = (year: number, month: number): number => {
  const dateTime = getDateTimeFromYearAndMonth(year, month);
  return dateTime.endOf('month').day as number;
}

export const getWeekdayOfFirstDayOfMonth = (year: number, month: number): number => {
  const dateTime = getDateTimeFromYearAndMonth(year, month);
  return dateTime.startOf('month').weekday
}

export const getNumberOfMonthMatrixRows = (year: number, month: number) => {
  const lastDayOfMonth = getLastDayOfMonth(year, month);
  const firstWeekdayOfMonth = getWeekdayOfFirstDayOfMonth(year, month);

  const firstDayOfMonthIndex = getIndexOfWeekday(firstWeekdayOfMonth);
  const lastDayOf0thRow = DAYS_IN_A_WEEK - firstDayOfMonthIndex;
  const remainingDays = lastDayOfMonth  - lastDayOf0thRow;

  const weeksAfterFirstWeek = Math.ceil(remainingDays / DAYS_IN_A_WEEK);

  return weeksAfterFirstWeek + 1;
}


const get0thMonthMatrixRow = (firstDayOfMonthIndex: number, lastDayOf0thRow: number) => {
  return [...getNullArray(firstDayOfMonthIndex), ...getSequenceArray(lastDayOf0thRow, 1)]
}

const isLessThanAWeek = (days: number) => days <= DAYS_IN_A_WEEK;

const getNthMonthMatrixRow = (lastDayOfMonth: number, currentRow: number, lastDayOf0thRow: number) => {
  const firstDayOfRow = (currentRow - 1) * DAYS_IN_A_WEEK + lastDayOf0thRow + 1;
  const remainingMonthDays = lastDayOfMonth - firstDayOfRow + 1;
  const filledSpots =  isLessThanAWeek(remainingMonthDays) ? remainingMonthDays : DAYS_IN_A_WEEK;
  const nullSpots = isLessThanAWeek(remainingMonthDays) ? DAYS_IN_A_WEEK - remainingMonthDays : 0;

  return [...getSequenceArray(filledSpots, firstDayOfRow), ...getNullArray(nullSpots)];
}

export const getMonthMatrixRow = (firstDayOfMonthIndex: number, lastDayOfMonth: number, currentRow: number) => {
  const lastDayOf0thRow = DAYS_IN_A_WEEK - firstDayOfMonthIndex;

  if(currentRow === 0) {
    return get0thMonthMatrixRow(firstDayOfMonthIndex, lastDayOf0thRow);
  }

  return getNthMonthMatrixRow(lastDayOfMonth, currentRow, lastDayOf0thRow);
}

export const getMonthMatrix = (year: number, month: number): IMonthMatrix => {
  const lastDayOfMonth = getLastDayOfMonth(year, month);
  const numberOfMonthMatrixRows = getNumberOfMonthMatrixRows(year, month);
  const firstDayOfMonth = getWeekdayOfFirstDayOfMonth(year, month);
  const firstDayOfMonthIndex = getIndexOfWeekday(firstDayOfMonth);

  return getNullArray(numberOfMonthMatrixRows).map((_, i) => getMonthMatrixRow(firstDayOfMonthIndex, lastDayOfMonth, i));
}