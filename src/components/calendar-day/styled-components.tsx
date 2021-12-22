import styled from "styled-components";

export const Block = styled.div`
  box-sizing: border-box;
  background-color: ${(props) =>
    props.className === "active" ? "white" : "#A9A9A9"};
  min-width: calc(100% / 7);
  min-height: 100px;
  border: solid 1px;
  text-align: center;
  line-height: 100px;
`;

export const Reminder = styled.div`
  box-sizing: border-box;
  line-height: 20px;
  text-shadow: 1px 1px 0 black;
  color: #ffd700;
  margin: 0;
  padding: 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  font-size: 0.9em;
  background-color: ${({ backgroundColor }: { backgroundColor: string }) =>
    backgroundColor};
  height: 25px;
`;

export const Button = styled.button`
  text-shadow: inherit;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`