import styled from "styled-components";
import palette from "../palette";
import { handleFontStyle } from "../common";

const MyText = styled.p<StyledComponentProps>`
  ${({ $font }) => handleFontStyle($font)};
  margin: ${(props) => props.$margin};
  color: ${(props) => (props.$color ? props.$color : palette.black)};
  width: ${(props) => props.$width};
  max-width: ${(props) => props.$maxWidth};
  text-align: ${(props) => props.$textAlign};
  flex-grow: ${(props) => props.$flexGrow};

  .day {
    ${({ $font }) => handleFontStyle($font)};
    color: ${palette.sub.orange};
  }
`;

export const MyLinkText = styled(MyText).attrs({ as: "a" })`
  text-decoration: underline;
  text-underline-position: under;
`;

export default MyText;
