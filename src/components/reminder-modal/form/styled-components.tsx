import styled from 'styled-components';

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
`;