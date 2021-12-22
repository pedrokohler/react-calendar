import { RemindersActions } from "./actions";
import { IAction } from "../../../lib";
import { addReminder, deleteReminder, updateReminder } from "..";
import { IReminders } from "../interfaces";
import { DateTime } from "luxon";

const initialState: IReminders = {};

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
    case RemindersActions.UPDATE: {
      const { newReminder, oldReminder } = action.payload;
      const convertedTime = DateTime.fromJSDate(newReminder.time);
      const { year, month, day } = convertedTime;
      const { year: oldYear, month: oldMonth, day: oldDay } = oldReminder.time;
      return updateReminder({
        reminders: state,
        newDate: {
          year,
          month,
          day,
        },
        oldDate: {
          year: oldYear,
          month: oldMonth,
          day: oldDay,
        },
        updatedReminder: {
          ...newReminder,
          time: convertedTime,
        },
        id: oldReminder.id,
      });
    }
    case RemindersActions.DELETE: {
      const { time, id } = action.payload;
      const { year, month, day } = time;
      return deleteReminder({
        reminders: state,
        year,
        month,
        day,
        id,
      });
    }
    default:
      return state;
  }
}
