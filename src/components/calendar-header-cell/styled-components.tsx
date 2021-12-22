import styled from 'styled-components';

export const Block = styled.div`
  background-color: ${(props) => props.className === "active" ? "white" : "#A9A9A9"};
  box-sizing: border-box;
  min-width: calc(100% / 7);
  min-height: 20px;
  border: solid 1px;
  text-align: center;
  line-height: 20px;
`