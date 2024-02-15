import styled from "styled-components";
import palette from "../palette";
import { handleFontStyle } from "../common";

export const MyContainer = styled.div<StyledComponentProps>`
  ${({ $font }) => handleFontStyle($font)};
  display: ${(props) => props.$display ?? "block"};
  width: ${(props) => props.$width ?? "100%"};
  min-width: ${(props) => props.$minWidth};
  height: ${(props) => props.$height};
  line-height: ${(props) => props.$lineHeight};
  padding: ${(props) => props.$padding};
  border-radius: ${(props) => props.$borderRadius ?? "10px"};
  opacity: ${(props) => props.$opacity ?? "100%"};
  flex-grow: ${(props) => props.$flexGrow};
  flex-shrink: ${(props) => props.$flexShrink};
  align-self: ${(props) => props.$alignSelf};
  background-image: url(${(props) => props.$backgroundImage});
  background-color: ${(props) => props.$backgroundColor};
  background-size: ${(props) => props.$backgroundSize};
  background-repeat: no-repeat;
  background-position: ${(props) => props.$backgroundPosition ?? "center"};
`;

export const MyFlexContainer = styled(MyContainer)`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection ?? "row"};
  justify-content: ${(props) => props.$justifyContent ?? "flex-start"};
  align-items: ${(props) => props.$alignItems ?? "flex-start"};
  gap: ${(props) => props.$gap ?? "20px"};
`;
