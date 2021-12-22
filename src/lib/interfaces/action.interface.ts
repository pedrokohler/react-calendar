import { CalendarActions } from "../../domain/calendar";
import { RemindersActions } from "../../domain/reminders";

export interface IAction {
  type: CalendarActions | RemindersActions;
  payload: any;
}