import React from 'react';
import { Block } from './styled-components';

function CalendarDay({ children }: React.PropsWithChildren<React.ReactNode>) {

  if(children === null){
    return <Block>&nbsp;</Block>
  }

  return (
    <Block className='active'>{children}</Block>
  );
}

export default CalendarDay;
