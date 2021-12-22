import { DateTime } from "luxon";

export interface IReminder {
  id: string;
  description: string;
  color: string;
  time: DateTime;
}