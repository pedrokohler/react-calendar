import { getLastDayOfMonth } from "../date.service"

describe("DATE TIME SERVICE", () => {
  it("Should return the last day of the month", () => {
    expect(getLastDayOfMonth(2021, 2)).toBe(28)
  })

  it("Should return the last day of the month of a leap year", () => {
    expect(getLastDayOfMonth(2020, 2)).toBe(29)
  })
})