import styled from "styled-components";
import palette from "../style/palette";
import { PropsWithChildren } from "react";

export const YunseulCenter = ({ children }: PropsWithChildren) => {
  return <Wrap>{children}</Wrap>;
};

const Wrap = styled.div`
  width: calc(100% - 289px);
  background-color: ${palette.white};
  height: 100%;
  margin-right: 9px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  overflow-y: auto;
`;
