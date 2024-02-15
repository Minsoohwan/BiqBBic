import styled from "styled-components";
import palette from "../palette";
import { handleFontStyle } from "../common";

export const MyContainer = styled.div<StyledComponentProps>`
  ${({ $font }) => handleFontStyle($font)};
  display: ${(props) => props.$display ?? "block"};
  width: ${(props) => props.$width ?? "100%"};
  min-width: ${(props) => props.$minWidth ?? "fit-content"};
  height: ${(props) => props.$height ?? "fit-content"};
  line-height: ${(props) => props.$lineHeight};
  background-color: ${(props) => props.$backgroundColor ?? palette.white};
  padding: ${(props) => props.$padding};
  border-radius: ${(props) => props.$borderRadius ?? "10px"};
  opacity: ${(props) => props.$opacity ?? "100%"};
  flex-grow: ${(props) => props.$flexGrow};
  flex-shrink: ${(props) => props.$flexShrink};
  align-self: ${(props) => props.$alignSelf};
`;

export const MyFlexContainer = styled(MyContainer)`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection ?? "row"};
  justify-content: ${(props) => props.$justifyContent ?? "flex-start"};
  align-items: ${(props) => props.$alignItems ?? "flex-start"};
  gap: ${(props) => props.$gap ?? "20px"};
`;
