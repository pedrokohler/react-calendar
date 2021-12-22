import React, { useCallback } from 'react';
import CalendarDay from '../calendar-day';
import CalendarRow from '../calendar-row';
import { getMonthMatrix } from '../../domain/calendar';
import CalendarHeaderCell from '../calendar-header-cell';
import { Container } from './styled-components';

function Calendar() {

  const displayCalendarHeaders = useCallback(() => {
    return (
      <CalendarRow>
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(dayName => (
          <CalendarHeaderCell>{dayName}</CalendarHeaderCell>
        ))}
      </CalendarRow>)
  }, [])


  const displayCalendarDays = useCallback(() => {
    return getMonthMatrix(2021, 12).map((row) => {
      return <CalendarRow>
        {row.map(day => (<CalendarDay>{day}</CalendarDay>))}
      </CalendarRow>
    })
  }, []);


  return (
    <Container>
      {displayCalendarHeaders()}
      {displayCalendarDays()}
    </Container>
  );
}

export default Calendar;
