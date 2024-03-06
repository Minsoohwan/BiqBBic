import styled from "styled-components";
import palette from "../palette";
import { handleFontStyle } from "../common";

type Size = "small" | "medium" | "large";
type Color = "orange" | "green" | "blue";

type ButtonProps = {
  $disabled?: boolean;
  $size: Size;
  $backgroundColor: Color;
} & StyledComponentProps;

const color = {
  orange: {
    default: palette.sub.orange,
    hover: palette.sub.gold,
    active: palette.sub.mustad,
  },
  green: {
    default: palette.main.green,
    hover: palette.green.green3,
    active: palette.green.green4,
  },
  blue: {
    default: palette.blue.blue4,
    hover: palette.blue.blue3,
    active: palette.main.blue,
  },
};

const MyButton = styled.button<ButtonProps>`
  ${({ $font }) => handleFontStyle($font)};
  ${({ $size }) => getSize($size)};
  border-radius: 10px;
  border: 0;
  color: ${(props) => props.$color ?? palette.white};
  width: ${(props) => props.$width};
  background-color: ${(props) =>
    props.$disabled
      ? palette.gray.gray2
      : color[props.$backgroundColor].default};
  pointer-events: ${(props) => (props.$disabled ? "none" : "all")};
  align-self: ${(props) => props.$alignSelf};
  cursor: pointer;

  &:active {
    background-color: ${(props) => color[props.$backgroundColor].active};
  }
`;

export default MyButton;

function getSize(size: Size) {
  switch (size) {
    case "small":
      return "width: fit-content; height: 34px; padding: 7px 10px;";
    case "medium":
      return "width: 149px; height: 48px; padding: 13px 10px;";
    case "large":
      return "width: 100%; height: 48px; padding: 13px 10px;";
    default:
      return "width: fit-content; height: 34px; padding: 7px 10px;";
  }
}
