import { IReminder } from "./reminder.interface";
import { IReminders } from "./reminders.interface";

export interface IUpdateReminderParams {
  reminders: IReminders;
  updatedReminder: Omit<IReminder, "id">;
  oldDate: {
    year: number;
    month: number;
    day: number;
  },
  newDate: {
    year: number;
    month: number;
    day: number;
  }
  id: string;
}