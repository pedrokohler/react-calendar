import styled from 'styled-components';

export const Block = styled.div`
  box-sizing: border-box;
  background-color: ${(props) => props.className === "active" ? "white" : "#A9A9A9"};
  min-width: calc(100% / 7);
  min-height: 100px;
  border: solid 1px;
  text-align: center;
  line-height: 100px;
`