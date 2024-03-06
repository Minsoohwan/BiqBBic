import styled from "styled-components";
import palette from "../style/palette";

export const YunseulCenter = () => {
  return <Wrap></Wrap>;
};

const Wrap = styled.div`
  width: calc(100% - 289px);
  background-color: ${palette.white};
  height: 100%;
  margin-right: 9px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
