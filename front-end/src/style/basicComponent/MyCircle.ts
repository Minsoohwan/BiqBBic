import styled from "styled-components";
import palette from "../palette";
import { handleFontStyle } from "../common";

const MyCircle = styled.div<StyledComponentProps>`
  ${({ $font }) => handleFontStyle($font)};
  width: ${(props) => props.$width ?? "100%"};
  height: ${(props) => props.$height ?? "100%"};
  background-color: ${(props) => props.$backgroundColor ?? palette.white};
  padding: ${(props) => props.$padding ?? 20};
  border-radius: 50%;
  flex-shrink: 0;
`;

export default MyCircle;
