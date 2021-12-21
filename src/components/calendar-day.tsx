import React from 'react';
import styled from 'styled-components';

const Block = styled.div`
  background-color: ${(props) => props.className === "active" ? "white" : "#A9A9A9"};
  min-width: calc(100% / 7);
  min-height: 100px;
  border: solid 1px;
  text-align: center;
  line-height: 100px;
`

function CalendarDay({ day }: { day: number | null }) {

  if(day === null){
    return <Block>&nbsp;</Block>
  }

  return (
    <Block className='active'>{day}</Block>
  );
}

export default CalendarDay;
