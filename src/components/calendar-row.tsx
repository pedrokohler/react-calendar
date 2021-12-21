import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

function CalendarRow({ children } : React.PropsWithChildren<React.ReactNode>) {
  return (
    <Container>{children}</Container>
  );
}

export default CalendarRow;
