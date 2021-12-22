import { addReminder, deleteReminder, updateReminder } from "../models/reminder.model";
import { DateTime } from "luxon";

const now = DateTime.local();
const oneHourAgo = now.minus({ hours: 1 });

describe("REMINDERS", () => {
  describe("ADD REMINDER", () => {
    it("Should add a reminder to previously empty reminders", () => {
      const result = addReminder({
        reminders: {},
        newReminder: {
          description: "I'm a reminder",
          color: "blue",
          time: now,
        },
        year: 2022,
        month: 1,
        day: 2,
      });

      const newEntry = result[2022][1][2][0];

      expect(newEntry).toHaveProperty('description', "I'm a reminder");
      expect(newEntry).toHaveProperty('color', "blue");
      expect(newEntry).toHaveProperty('time');
    });

    it("Should automatically convert a reminder time to its date", () => {
      const result = addReminder({
        reminders: {},
        newReminder: {
          description: "I'm a reminder",
          color: "blue",
          time: now,
        },
        year: 1995,
        month: 2,
        day: 1,
      });

      const newEntry = result[1995][2][1][0];
      const { day, month, year } = newEntry.time;

      expect(day).toBe(1);
      expect(month).toBe(2);
      expect(year).toBe(1995);
    });

    it("Should add a reminder to previously not empty reminders", () => {
      const params = {
        reminders: {},
        newReminder: {
          description: "We're reminders",
          color: "red",
          time: now,
        },
        year: 2023,
        month: 5,
        day: 3,
      };
      const resultAfterFirstAddition= addReminder(params);
      const resultAfterSecondAddition = addReminder({
        ...params,
        reminders: resultAfterFirstAddition,
      });

      const addedReminders = resultAfterSecondAddition[2023][5][3];

      expect(addedReminders).toHaveLength(2);

      expect(addedReminders[0]).toHaveProperty('description', "We're reminders");
      expect(addedReminders[0]).toHaveProperty('color', "red");
      expect(addedReminders[0]).toHaveProperty('time');

      expect(addedReminders[1]).toHaveProperty('description', "We're reminders");
      expect(addedReminders[1]).toHaveProperty('color', "red");
      expect(addedReminders[1]).toHaveProperty('time');
    });

    it("Should add reminders sorted in chronological order", () => {
      const params = {
        reminders: {},
        newReminder: {
          description: "I should be second",
          color: "black",
          time: now,
        },
        year: 2022,
        month: 1,
        day: 2,
      };
      const resultAfterFirstAddition= addReminder(params);
      const resultAfterSecondAddition = addReminder({
        ...params,
        reminders: resultAfterFirstAddition,
        newReminder: {
          description: "I should be first",
          color: "green",
          time: oneHourAgo,
        }
      });

      const addedReminders = resultAfterSecondAddition[2022][1][2];

      expect(addedReminders).toHaveLength(2);

      expect(addedReminders[0]).toHaveProperty('description', "I should be first");
      expect(addedReminders[0]).toHaveProperty('color', "green");
      expect(addedReminders[0]).toHaveProperty('time');

      expect(addedReminders[1]).toHaveProperty('description', "I should be second");
      expect(addedReminders[1]).toHaveProperty('color', "black");
      expect(addedReminders[1]).toHaveProperty('time');
    });
  });

  describe("DELETE REMINDERS", () => {
    it("Should delete a reminder given its id", () => {
      const reminders = {
        2021: {
          12: {
            21: [
              {
                id: "foo",
                description: "I'll be deleted",
                color: "teal",
                time: now,
              }
            ]
          }
        }
      }

      const result = deleteReminder({
        reminders,
        year: 2021,
        month: 12,
        day: 21,
        id: "foo",
      });

      expect(result[2021][12][21]).toHaveLength(0);
    });

    it("Should not delete a reminder if no corresponding id is found", () => {
      const reminders = {
        2021: {
          12: {
            21: [
              {
                id: "foo",
                description: "I'll not be deleted",
                color: "brown",
                time: now,
              }
            ]
          }
        }
      }

      const result = deleteReminder({
        reminders,
        year: 2021,
        month: 12,
        day: 21,
        id: "bar",
      });

      expect(result[2021][12][21]).toHaveLength(1);
    });
  });

  describe("UPDATE REMINDERS", () => {
    it("Should update a reminder given its id", () => {
      const reminders = {
        2021: {
          12: {
            21: [
              {
                id: "foo",
                description: "I'll be modified",
                color: "gold",
                time: now,
              }
            ]
          }
        }
      }

      const result = updateReminder({
        reminders,
        updatedReminder: {
          description: "I've been modified",
          color: "silver",
          time: now,
        },
        oldDate: {
          year: 2021,
          month: 12,
          day: 21,
        },
        newDate: {
          year: 2022,
          month: 11,
          day: 22,
        },
        id: "foo",
      });

      expect(result[2021][12][21]).toHaveLength(0);

      const updatedReminderList = result[2022][11][22];
      const updatedEntry = updatedReminderList[0];

      expect(updatedReminderList).toHaveLength(1);
      expect(updatedEntry).toHaveProperty('description', "I've been modified");
      expect(updatedEntry).toHaveProperty('color', "silver");
      expect(updatedEntry).toHaveProperty('time');

      const { day, month, year } = updatedEntry.time;

      expect(day).toBe(22);
      expect(month).toBe(11);
      expect(year).toBe(2022);
    });

    it("Should not update a reminder if no corresponding id is found", () => {
      const reminders = {
        2021: {
          12: {
            21: [
              {
                id: "foo",
                description: "I'll not be modified",
                color: "gold",
                time: now.set({ year: 2021, month: 12, day: 21 }),
              }
            ]
          }
        }
      }

      const result = updateReminder({
        reminders,
        updatedReminder: {
          description: "I've been modified",
          color: "silver",
          time: now,
        },
        oldDate: {
          year: 2021,
          month: 12,
          day: 21,
        },
        newDate: {
          year: 2022,
          month: 11,
          day: 22,
        },
        id: "bar",
      });


      expect(result[2022]?.[11]?.[22] ?? []).toHaveLength(0);

      const oldReminderList = result[2021][12][21];
      const oldEntry = oldReminderList[0];

      expect(oldReminderList).toHaveLength(1);
      expect(oldEntry).toHaveProperty('description', "I'll not be modified");
      expect(oldEntry).toHaveProperty('color', "gold");
      expect(oldEntry).toHaveProperty('time');

      const { day, month, year } = oldEntry.time;

      expect(day).toBe(21);
      expect(month).toBe(12);
      expect(year).toBe(2021);
    });
  });
})