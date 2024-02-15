import styled from "styled-components";
import palette from "../palette";
import { handleFontStyle } from "../common";

type ButtonProps = {
  $disabled?: boolean;
} & StyledComponentProps;

const MyButton = styled.button<ButtonProps>`
  ${({ $font }) => handleFontStyle($font)};
  width: fit-content;
  height: fit-content;
  padding: 7px 10px;
  border-radius: 10px;
  border: 0;
  color: white;
  background-color: ${(props) =>
    props.$disabled ? palette.gray.gray2 : palette.blue.blue4};
  pointer-events: ${(props) => (props.$disabled ? "none" : "all")};
  cursor: pointer;

  &:hover {
    background-color: ${palette.blue.blue3};
  }

  &:active {
    background-color: ${palette.main.blue};
  }
`;

export default MyButton;
