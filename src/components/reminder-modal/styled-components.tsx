import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  padding: 40px;
  position: fixed;
  border: solid 1px;
  width: 800px;
  height: 400px;
  background-color: white;
  left: 50%;
  transform: translate(-50%, 0);
  top: 20%;

  @media only screen and (max-width: 600px) {
    width: 90%;
    height: 90%;
    top: 10%;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;


  @media only screen and (max-width: 600px) {
    justify-content: space-between;
  }
`;

export const Button = styled.button`
  width: 100px;
  height: 30px;
  border: none;

  background-color: ${({ purpose }: { purpose?: string }) => {
    switch(purpose){
      case "danger": {
        return "#dc3545";
      }
      case "secondary": {
        return "#6c757d";
      }
      case "primary": {
        return "#007bff";
      }
      default:
        return "unset"
    }
  }};
  color: white;
  margin-left: 20px;
`;

