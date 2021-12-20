import { getLastDayOfMonth, getWeekdayOfFirstDayOfMonth } from "../date.service"

describe("DATE TIME SERVICE", () => {
  describe("GET LAST DAY OF MONTH", () => {
    it("Should return the last day of the month", () => {
      expect(getLastDayOfMonth(2021, 2)).toBe(28)
    })

    it("Should return the last day of the month of a leap year", () => {
      expect(getLastDayOfMonth(2020, 2)).toBe(29)
    })
  })

  describe("GET WEEKDAY OF FIRST DAY OF MONTH", () => {
    it("Should return the weekday of the first day of the month", () => {
      expect(getWeekdayOfFirstDayOfMonth(2021, 11)).toBe(1); // monday
      expect(getWeekdayOfFirstDayOfMonth(2021, 6)).toBe(2); // tuesday
      expect(getWeekdayOfFirstDayOfMonth(2021, 12)).toBe(3); // wednesday
      expect(getWeekdayOfFirstDayOfMonth(2021, 7)).toBe(4); // thursday
      expect(getWeekdayOfFirstDayOfMonth(2021, 10)).toBe(5); // friday
      expect(getWeekdayOfFirstDayOfMonth(2021, 5)).toBe(6); // saturday
      expect(getWeekdayOfFirstDayOfMonth(2021, 8)).toBe(7); //sunday
    })
  })
})