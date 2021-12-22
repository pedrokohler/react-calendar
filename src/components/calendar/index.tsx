import React, { useCallback, useState } from "react";
import CalendarDay from "../calendar-day";
import CalendarRow from "../calendar-row";
import {
  CalendarActions,
  getMonthMatrix,
  WeekdaysNames,
} from "../../domain/calendar";
import CalendarHeaderCell from "../calendar-header-cell";
import { Container } from "./styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app";
import ReminderModal from "../reminder-modal";
import { IReminder } from "../../domain/reminders";

function Calendar() {
  const [isModalHidden, setIsModalHidden] = useState(true);
  const [reminderBeingEdited, setReminderBeingEdited] =
    useState<IReminder | undefined>(undefined);
  const { year, month, monthName } = useSelector(
    (state: RootState) => state.calendar
  );
  const reminders = useSelector((state: RootState) => state.reminders);
  const dispatch = useDispatch();

  const displayCalendarHeaders = useCallback(() => {
    return (
      <CalendarRow>
        {Object.values(WeekdaysNames).map((dayName) => (
          <CalendarHeaderCell key={dayName}>{dayName}</CalendarHeaderCell>
        ))}
      </CalendarRow>
    );
  }, []);

  const getRemindersByDate = useCallback(
    ({ year, month, day }) => {
      if (day === null) {
        return [];
      }

      return reminders[year]?.[month]?.[day] ?? [];
    },
    [reminders]
  );

  const openReminderEditionModal = useCallback((reminder: IReminder) => {
    setReminderBeingEdited(reminder);
    setIsModalHidden(false);
  }, []);

  const openReminderCreationModal = useCallback(() => {
    setReminderBeingEdited(undefined);
    setIsModalHidden(false);
  }, []);

  const displayCalendarDays = useCallback(
    (year, month) => {
      return getMonthMatrix(year, month).map((row) => {
        return (
          <CalendarRow key={`${row}`}>
            {row.map((day, i) => {
              const currentDayReminders = getRemindersByDate({
                year,
                month,
                day,
              });
              return (
                <CalendarDay
                  key={`${day}-${i}`}
                  reminders={currentDayReminders}
                  onClick={openReminderEditionModal}
                >
                  {day}
                </CalendarDay>
              );
            })}
          </CalendarRow>
        );
      });
    },
    [getRemindersByDate, openReminderEditionModal]
  );

  return (
    <Container>
      <div>
        <h1>{monthName}</h1>
        <button
          onClick={() => dispatch({ type: CalendarActions.GO_BACKWARDS })}
        >
          Previous Month
        </button>
        <button onClick={() => dispatch({ type: CalendarActions.GO_FORWARD })}>
          Next Month
        </button>
      </div>
      <div>
        <button onClick={openReminderCreationModal}>Create Reminder</button>
      </div>
      {displayCalendarHeaders()}
      {displayCalendarDays(year, month)}
      <ReminderModal
        isHidden={isModalHidden}
        reminder={reminderBeingEdited}
        onClose={() => setIsModalHidden(true)}
      ></ReminderModal>
    </Container>
  );
}

export default Calendar;
