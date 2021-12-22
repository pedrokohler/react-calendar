import styled from 'styled-components';
import { purposeColorSelector } from '../../lib';

export const Container = styled.div`
  box-sizing: border-box;
  padding: 2%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    width: 100vw;
    padding: 0;
    margin: 0;
  }
`

export const Title = styled.h1`
  margin: 0;
  text-align: center;
`

export const NavigationButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;

  @media only screen and (max-width: 600px) {
    justify-content: space-between;
  }
`;

export const HeaderContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;

  @media only screen and (max-width: 600px) {
    position: sticky;
    top: 0;
    background-color: lightgrey;
  }
`;

export const Button = styled.button`
  margin: 5px 5px;
  width: 150px;
  height: 30px;
  background-color: ${purposeColorSelector};
  color: white;
`;