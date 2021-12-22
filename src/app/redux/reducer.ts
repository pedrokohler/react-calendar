import { combineReducers } from 'redux';

import { calendarReducer } from '../../domain/calendar';
import { remindersReducer } from '../../domain/reminders';

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  reminders: remindersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
