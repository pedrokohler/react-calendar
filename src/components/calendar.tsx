import React, { useCallback } from 'react';
import CalendarDay from './calendar-day';
import CalendarRow from './calendar-row';
import { getMonthMatrix } from '../domain/services/date.service';
import styled from 'styled-components';
import CalendarHeaderCell from './calendar-header-cell';

const Container = styled.div`
  margin: 2%;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`

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
