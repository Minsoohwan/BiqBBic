import styled from "styled-components";
import palette from "../palette";
import { handleFontStyle } from "../common";

const MyHr = styled.div<StyledComponentProps>`
  width: 100%;
  height: 1px;
  background-color: ${palette.gray.gray2};
`;

export default MyHr;
