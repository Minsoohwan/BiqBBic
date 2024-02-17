import { MyContainer, MyFlexContainer } from "../basicComponent/MyContainer";
import { ReactComponent as Plus } from "../../asset/plus.svg";
import { ReactComponent as Minus } from "../../asset/minus.svg";
import palette from "../palette";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

function ItemCountBox({
  count,
  setCount,
}: {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}) {
  return (
    <Container>
      <IconItem
        onClick={() => {
          setCount(Number(count) - 1);
        }}
      >
        <Minus />
      </IconItem>
      <CountBox
        value={count}
        onChange={(e: any) => {
          setCount(Number(e.target.value));
        }}
      />
      <IconItem
        onClick={() => {
          setCount(Number(count) + 1);
        }}
      >
        <Plus />
      </IconItem>
    </Container>
  );
}

export default ItemCountBox;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 92px;
  height: 32px;
  border: ${`1px solid ${palette.main.green}`};
  border-radius: 10px;
`;

const IconItem = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 24px;
  cursor: pointer;
`;

const CountBox = styled.input`
  width: 44px;
  height: 100%;
  border: none;
  border-left: 1px solid ${palette.gray.gray1};
  border-right: 1px solid ${palette.gray.gray1};
  padding: 0px 5px;
  text-align: center;

  &:focus {
    outline: none;
  }
`;
