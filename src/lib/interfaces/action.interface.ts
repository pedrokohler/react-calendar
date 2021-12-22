import { CalendarActions } from "../../domain/calendar";

export interface IAction {
  type: CalendarActions;
  payload: any;
}