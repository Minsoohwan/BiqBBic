import styled from "styled-components";

const EmptyVSpace = styled.div<StyledComponentProps>`
  height: ${(props) => props.$height ?? "8px"};
`;

export default EmptyVSpace;
