import React, { useCallback } from 'react';
import CalendarDay from '../calendar-day';
import CalendarRow from '../calendar-row';
import { CalendarActions, getMonthMatrix, WeekdaysNames } from '../../domain/calendar';
import CalendarHeaderCell from '../calendar-header-cell';
import { Container } from './styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app';

function Calendar() {
  const { year, month } = useSelector((state: RootState) => state.calendar);
  const dispatch = useDispatch();

  const displayCalendarHeaders = useCallback(() => {
    return (
      <CalendarRow>
        {Object.values(WeekdaysNames).map(dayName => (
          <CalendarHeaderCell>{dayName}</CalendarHeaderCell>
        ))}
      </CalendarRow>)
  }, [])


  const displayCalendarDays = useCallback((year, month) => {
    return getMonthMatrix(year, month).map((row) => {
      return <CalendarRow>
        {row.map(day => (<CalendarDay>{day}</CalendarDay>))}
      </CalendarRow>
    })
  }, []);


  return (
    <Container>
      <h1>{year} {month}</h1>
      <div>
        <button onClick={() => dispatch({ type: CalendarActions.GO_FORWARD })}>Avançar</button>
        <button onClick={() => dispatch({ type: CalendarActions.GO_BACKWARDS })}>Retroceder</button>
      </div>
      {displayCalendarHeaders()}
      {displayCalendarDays(year, month)}
    </Container>
  );
}

export default Calendar;
