import React from 'react';
import CalendarDay from './calendar-day';
import CalendarRow from './calendar-row';
import { getMonthMatrix } from '../domain/services/date.service';
import styled from 'styled-components';

const Container = styled.div`
  padding: 50px;
`

function Calendar() {
  return (
    <Container>
      {getMonthMatrix(2021, 12).map((row) => {
        return <CalendarRow>
          {row.map(day => (<CalendarDay day={day}></CalendarDay>))}
        </CalendarRow>
      })}
    </Container>
  );
}

export default Calendar;
