import { DateTime } from 'luxon';
import { CalendarActions } from "./actions";
import { IAction } from "../../../lib";

const formatMask = 'LLLL yyyy';

const initialState = {
  year: DateTime.local().year,
  month: DateTime.local().month,
  monthName: DateTime.local().toFormat(formatMask),
}

export function calendarReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case CalendarActions.GO_FORWARD: {
      const { year, month } = state;
      const currentDate = DateTime.local().set({ year, month });
      const newDate = currentDate.plus({ months: 1 });
      return {
        ...state,
        year: newDate.year,
        month: newDate.month,
        monthName: newDate.toFormat(formatMask)
      }
    }
    case CalendarActions.GO_BACKWARDS: {
      const { year, month } = state;
      const currentDate = DateTime.local().set({ year, month });
      const newDate = currentDate.minus({ months: 1 });
      return {
        ...state,
        year: newDate.year,
        month: newDate.month,
        monthName: newDate.toFormat(formatMask)
      }
    }
    default:
      return state
  }
}
