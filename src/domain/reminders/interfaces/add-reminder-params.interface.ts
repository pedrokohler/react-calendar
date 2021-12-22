import { IReminder } from "./reminder.interface";
import { IReminders } from "./reminders.interface";

export interface IAddReminderParams {
  reminders: IReminders;
  newReminder: Omit<IReminder, "id">;
  year: number;
  month: number;
  day: number;
}