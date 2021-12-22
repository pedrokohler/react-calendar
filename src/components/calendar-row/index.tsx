import React from 'react';
import { Container } from './styled-components';


function CalendarRow({ children } : React.PropsWithChildren<React.ReactNode>) {
  return (
    <Container>{children}</Container>
  );
}

export default CalendarRow;
