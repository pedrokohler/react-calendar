import { Weekdays } from "../../enums/weekdays.enum"
import { getLastDayOfMonth, getNumberOfWeekRows, getWeekdayOfFirstDayOfMonth } from "../date.service"

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

  describe("GET NUMBER OF WEEKS ROWS OF MONTH", () => {
    it("Should get the number of weeks rows when the month should have 5 week rows", () => {
      expect(getNumberOfWeekRows(2021, 11)).toBe(5);
      expect(getNumberOfWeekRows(2021, 12)).toBe(5);
    })

    it("Should get the number of weeks when the month should have 4 week rows", () => {
      expect(getNumberOfWeekRows(2015, 2)).toBe(4);
  })
  })
})