import styled from 'styled-components';
import { purposeColorSelector } from '../../../lib/';

export const Container = styled.div`
  box-sizing: border-box;
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const SubmitButton = styled.input`
  width: 100px;
  height: 30px;
  border: none;

  background-color: ${purposeColorSelector};
  color: white;
`;