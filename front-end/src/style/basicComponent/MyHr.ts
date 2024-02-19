import styled from "styled-components";
import palette from "../palette";

const MyHr = styled.div<StyledComponentProps>`
  width: ${(props) => props.$width ?? "100%"};
  height: 1px;
  background-color: ${(props) => props.$backgroundColor ?? palette.gray.gray2};
  flex-shrink: 0;
`;

export default MyHr;
