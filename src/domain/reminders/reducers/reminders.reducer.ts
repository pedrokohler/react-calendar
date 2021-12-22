import { RemindersActions } from "./actions";
import { IAction } from "../../../lib";
import { addReminder } from "..";
import { IReminders } from "../interfaces";
import { DateTime } from "luxon";

const initialState: IReminders= {}

export function remindersReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case RemindersActions.CREATE: {
      const convertedTime = DateTime.fromJSDate(action.payload.time);
      const { year, month, day } = convertedTime;
      return addReminder({
        year,
        month,
        day,
        reminders: state,
        newReminder: {
          ...action.payload,
          time: convertedTime,
        },
      });
    }
    default:
      return state
  }
}
