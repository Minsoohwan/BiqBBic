import styled from "styled-components";
import palette from "../palette";
import { handleFontStyle } from "../common";

const MyCircle = styled.div<StyledComponentProps>`
  ${({ $font }) => handleFontStyle($font)};
  width: ${(props) => props.$width ?? "100%"};
  height: ${(props) => props.$height ?? "100%"};
  background-image: url(${(props) => props.$backgroundImage});
  background-size: ${(props) => props.$backgroundSize ?? "70%"};
  background-repeat: no-repeat;
  background-position: ${(props) => props.$backgroundPosition ?? "center"};
  background-color: ${(props) => props.$backgroundColor ?? palette.white};
  padding: ${(props) => props.$padding ?? 20};
  border-radius: 50%;
  flex-shrink: 0;
`;

export default MyCircle;
