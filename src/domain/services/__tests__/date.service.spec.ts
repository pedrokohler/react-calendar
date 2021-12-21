import { Weekdays } from "../../enums/weekdays.enum"
import { getLastDayOfMonth, getMonthMatrix, getMonthMatrixRow, getNumberOfMonthMatrixRows, getWeekdayOfFirstDayOfMonth } from "../date.service"

describe("DATE TIME SERVICE", () => {
  describe("GET LAST DAY OF MONTH", () => {
    it("Should return the last day of the month", () => {
      expect(getLastDayOfMonth(2021, 2)).toBe(28);
    })

    it("Should return the last day of the month of a leap year", () => {
      expect(getLastDayOfMonth(2020, 2)).toBe(29);
    })
  })

  describe("GET WEEKDAY OF FIRST DAY OF MONTH", () => {
    it("Should return the weekday of the first day of the month", () => {
      expect(getWeekdayOfFirstDayOfMonth(2021, 11)).toBe(Weekdays.MONDAY);
      expect(getWeekdayOfFirstDayOfMonth(2021, 6)).toBe(Weekdays.TUESDAY);
      expect(getWeekdayOfFirstDayOfMonth(2021, 12)).toBe(Weekdays.WEDNESDAY);
      expect(getWeekdayOfFirstDayOfMonth(2021, 7)).toBe(Weekdays.THURSDAY);
      expect(getWeekdayOfFirstDayOfMonth(2021, 10)).toBe(Weekdays.FRIDAY);
      expect(getWeekdayOfFirstDayOfMonth(2021, 5)).toBe(Weekdays.SATURDAY);
      expect(getWeekdayOfFirstDayOfMonth(2021, 8)).toBe(Weekdays.SUNDAY);
    })
  })

  describe("GET NUMBER OF MONTH MATRIX ROWS OF MONTH", () => {
    it("Should get the number of month matrix rows when the month should have 6 rows", () => {
      expect(getNumberOfMonthMatrixRows(2021, 10)).toBe(6);
      expect(getNumberOfMonthMatrixRows(2019, 6)).toBe(6);
    })

    it("Should get the number of month matrix rows when the month should have 5 rows", () => {
      expect(getNumberOfMonthMatrixRows(2021, 11)).toBe(5);
      expect(getNumberOfMonthMatrixRows(2021, 12)).toBe(5);
    })

    it("Should get the number of month matrix rows when the month should have 4 rows", () => {
      expect(getNumberOfMonthMatrixRows(2015, 2)).toBe(4);
    })
  })

  describe("GET MONTH MATRIX ROW", () => {
    it("Should return the 0th row of the matrix correctly", () => {
      expect(getMonthMatrixRow(0, 31, 0)).toEqual([1, 2, 3, 4, 5, 6, 7]);
      expect(getMonthMatrixRow(1, 31,  0)).toEqual([null, 1, 2, 3, 4, 5, 6]);
      expect(getMonthMatrixRow(6, 31,  0)).toEqual([null, null, null, null, null, null, 1]);
    });

    it("Should return the nth (n > 0) row of the matrix correctly", () => {
      expect(getMonthMatrixRow(6, 31, 1)).toEqual([2, 3, 4, 5, 6, 7, 8]);
      expect(getMonthMatrixRow(6, 31, 2)).toEqual([9, 10, 11, 12, 13, 14, 15]);
      expect(getMonthMatrixRow(6, 31, 3)).toEqual([16, 17, 18, 19, 20, 21, 22]);
      expect(getMonthMatrixRow(6, 31, 4)).toEqual([23, 24, 25, 26, 27, 28, 29]);
      expect(getMonthMatrixRow(6, 31, 5)).toEqual([30, 31, null, null, null, null, null]);

      expect(getMonthMatrixRow(5, 31, 1)).toEqual([3, 4, 5, 6, 7, 8, 9]);
      expect(getMonthMatrixRow(5, 31, 2)).toEqual([10, 11, 12, 13, 14, 15, 16]);
      expect(getMonthMatrixRow(5, 31, 3)).toEqual([17, 18, 19, 20, 21, 22, 23]);
      expect(getMonthMatrixRow(5, 31, 4)).toEqual([24, 25, 26, 27, 28, 29, 30]);
      expect(getMonthMatrixRow(5, 31, 5)).toEqual([31, null, null, null, null, null, null]);

      expect(getMonthMatrixRow(5, 30, 1)).toEqual([3, 4, 5, 6, 7, 8, 9]);
      expect(getMonthMatrixRow(5, 30, 2)).toEqual([10, 11, 12, 13, 14, 15, 16]);
      expect(getMonthMatrixRow(5, 30, 3)).toEqual([17, 18, 19, 20, 21, 22, 23]);
      expect(getMonthMatrixRow(5, 30, 4)).toEqual([24, 25, 26, 27, 28, 29, 30]);

      expect(getMonthMatrixRow(4, 28, 1)).toEqual([4, 5, 6, 7, 8, 9, 10]);
      expect(getMonthMatrixRow(4, 28, 2)).toEqual([11, 12, 13, 14, 15, 16, 17]);
      expect(getMonthMatrixRow(4, 28, 3)).toEqual([18, 19, 20, 21, 22, 23, 24]);
      expect(getMonthMatrixRow(4, 28, 4)).toEqual([25, 26, 27, 28, null, null, null]);
    })
  })

  describe("GET MONTH MATRIX", () => {
    it("Should return a correct month matrix for a given year and month", () => {
      expect(getMonthMatrix(2021, 12)).toEqual([
        [null, null, null, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30, 31, null]
      ]);
    })
  })
})