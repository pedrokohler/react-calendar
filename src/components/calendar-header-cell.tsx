import React from 'react';
import styled from 'styled-components';

const Block = styled.div`
  background-color: ${(props) => props.className === "active" ? "white" : "#A9A9A9"};
  min-width: calc(100% / 7);
  min-height: 20px;
  border: solid 1px;
  text-align: center;
  line-height: 20px;
`

function CalendarHeaderCell({ children }: React.PropsWithChildren<React.ReactNode>) {

  if(children === null){
    return <Block>&nbsp;</Block>
  }

  return (
    <Block className='active'>{children}</Block>
  );
}

export default CalendarHeaderCell;
