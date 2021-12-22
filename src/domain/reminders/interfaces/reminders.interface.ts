import { IReminder } from "./reminder.interface";

export interface IReminders {
  [year: number]: {
    [month: number]: {
      [day: number]: IReminder[];
    };
  };
}