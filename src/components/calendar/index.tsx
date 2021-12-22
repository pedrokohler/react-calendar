import React, { useCallback, useState } from 'react';
import CalendarDay from '../calendar-day';
import CalendarRow from '../calendar-row';
import { CalendarActions, getMonthMatrix, WeekdaysNames } from '../../domain/calendar';
import CalendarHeaderCell from '../calendar-header-cell';
import { Container } from './styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app';
import ReminderModal from '../reminder-modal/create-reminder-modal';

function Calendar() {
  const [ isModalHidden, setIsModalHidden ] = useState(true);
  const { year, month, monthName } = useSelector((state: RootState) => state.calendar);
  const dispatch = useDispatch();

  const displayCalendarHeaders = useCallback(() => {
    return (
      <CalendarRow>
        {Object.values(WeekdaysNames).map(dayName => (
          <CalendarHeaderCell key={dayName}>{dayName}</CalendarHeaderCell>
        ))}
      </CalendarRow>)
  }, [])


  const displayCalendarDays = useCallback((year, month) => {
    return getMonthMatrix(year, month).map((row) => {
      return <CalendarRow key={`${row}`}>
        {row.map((day, i) => (<CalendarDay key={`${day}-${i}`}>{day}</CalendarDay>))}
      </CalendarRow>
    })
  }, []);


  return (
    <Container>
      <div>
        <h1>{monthName}</h1>
        <button onClick={() => dispatch({ type: CalendarActions.GO_BACKWARDS })}>Previous Month</button>
        <button onClick={() => dispatch({ type: CalendarActions.GO_FORWARD })}>Next Month</button>
      </div>
      <div>
        <button onClick={() => setIsModalHidden(false)}>Create Reminder</button>
      </div>
      {displayCalendarHeaders()}
      {displayCalendarDays(year, month)}
      <ReminderModal isHidden={isModalHidden} onClose={() => setIsModalHidden(true)}></ReminderModal>
    </Container>
  );
}

export default Calendar;
