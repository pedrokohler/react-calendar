import { v4 as randomUUID } from "uuid";
import { IAddReminderParams, IDeleteReminderParams, IReminder, IUpdateReminderParams } from "../interfaces";

const compareReminderTimes = (a: IReminder, b: IReminder): number => {
  if (a.time > b.time) {
    return 1;
  }
  if (a.time < b.time) {
    return -1;
  }
  return 0;
};

export const addReminder = ({
  reminders,
  newReminder,
  year,
  month,
  day,
}: IAddReminderParams) => {
  const convertedTime = newReminder.time.set({
    year,
    month,
    day,
  });
  const adaptedNewReminder = {
    ...newReminder,
    time: convertedTime,
    id: randomUUID(),
  };

  const sameYearReminders = reminders[year] ?? [];
  const sameMonthReminders = sameYearReminders[month] ?? [];
  const sameDayReminders = sameMonthReminders[day] ?? [];
  const sortedDayReminders = [...sameDayReminders, adaptedNewReminder].sort(
    compareReminderTimes
  );
  return {
    ...reminders,
    [year]: {
      ...sameYearReminders,
      [month]: {
        ...sameMonthReminders,
        [day]: sortedDayReminders,
      },
    },
  };
};

export const deleteReminder = ({
  reminders,
  year,
  month,
  day,
  id,
}: IDeleteReminderParams) => {
  const sameYearReminders = reminders[year] ?? [];
  const sameMonthReminders = sameYearReminders[month] ?? [];
  const sameDayReminders = sameMonthReminders[day] ?? [];
  return {
    ...reminders,
    [year]: {
      ...sameYearReminders,
      [month]: {
        ...sameMonthReminders,
        [day]: sameDayReminders.filter((reminder) => reminder.id !== id),
      },
    },
  };
};

export const updateReminder = ({
  reminders,
  updatedReminder,
  oldDate,
  newDate,
  id,
}: IUpdateReminderParams) => {
  const { year: oldYear, month: oldMonth, day: oldDay } = oldDate;
  const sameDayReminders = reminders[oldYear]?.[oldMonth]?.[oldDay] ?? [];
  const currentReminder = sameDayReminders.find(
    (reminder) => reminder.id === id
  );

  if (!currentReminder) {
    return reminders;
  }

  const remindersWithoutUpdatedReminder = deleteReminder({
    reminders,
    year: oldYear,
    month: oldMonth,
    day: oldDay,
    id,
  });

  const { year: newYear, month: newMonth, day: newDay } = newDate;
  return addReminder({
    reminders: remindersWithoutUpdatedReminder,
    newReminder: updatedReminder,
    year: newYear,
    month: newMonth,
    day: newDay,
  });
};
