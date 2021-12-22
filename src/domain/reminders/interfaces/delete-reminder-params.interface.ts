import { IReminders } from "./reminders.interface";

export interface IDeleteReminderParams {
  reminders: IReminders;
  year: number;
  month: number;
  day: number;
  id: string;
}