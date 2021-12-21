import React from 'react';
import styled from 'styled-components';
import Calendar from './components/calendar';

const Container = styled.div`
  all: unset;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`

function App() {
  return (
    <Container>
      <Calendar></Calendar>
    </Container>
  );
}

export default App;
