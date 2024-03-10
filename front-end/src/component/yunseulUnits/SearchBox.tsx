import styled from "styled-components";
import { RowDiv } from "../../style/basicComponent/MyContainer";
import palette from "../../style/palette";
import searchSvg from "../../asset/searchBlue.svg";

interface searchBoxProps {
  $placeholder: string;
}

export const SearchBox = ({ $placeholder }: searchBoxProps) => {
  return (
    <RowDiv $width="62.5%" $margin="0 0 20px 0">
      <SearhInput placeholder={$placeholder} />
      <SearchSvg src={searchSvg} />
    </RowDiv>
  );
};

const SearhInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid ${palette.main.blue};
  font-family: regular;
  font-size: 20px;
  line-height: 24px;

  &::placeholder {
    font-family: regular;
    font-size: 20px;
    line-height: 24px;
  }

  &:focus {
    outline: none;
    border: 1px solid ${palette.main.blue};
  }
`;

const SearchSvg = styled.img`
  position: absolute;
  right: 10px;
`;
