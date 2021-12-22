import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`