import styled from "styled-components";
import { RowDiv } from "../../style/basicComponent/MyContainer";
import { SearchBox } from "../yunseulUnits/SearchBox";
import palette from "../../style/palette";
import { YsClothSortBtn } from "../../style/basicComponent/MyButton";
import { useState } from "react";

export const YunseulClosetMenu = () => {
  const [selectedClothSort, setSelectedClothSort] = useState("전체");
  const clothSort = [
    "전체",
    "아우터",
    "상의",
    "원피스",
    "하의",
    "신발",
    "가방",
    "액세사리",
    "언더웨어",
    "기타",
  ];
  return (
    <>
      <SearchBox $placeholder="저장한 상품을 검색할 수 있어요." />
      <RowDiv $margin="20px" $columnGap="15px" $height="calc(100% - 45px)">
        <LeftSection>asd</LeftSection>
        <RightSection>
          <ClothListWrap>
            <ClothBtnGroup>
              {clothSort.map((val) => {
                return (
                  <YsClothSortBtn
                    key={val}
                    $isActive={val === selectedClothSort}
                    onClick={() => setSelectedClothSort(val)}
                  >
                    {val}
                  </YsClothSortBtn>
                );
              })}
            </ClothBtnGroup>
          </ClothListWrap>
          <CodyListWrap></CodyListWrap>
        </RightSection>
      </RowDiv>
    </>
  );
};

const LeftSection = styled.div`
  width: 30%;
  height: 100%;
  border-radius: 10px;
  background-color: ${palette.gray.gray2};
  position: relative;
`;

const RightSection = styled.div`
  width: calc(70% - 15px);
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  position: relative;
`;

const ClothListWrap = styled.div`
  width: 100%;
  height: calc(100% - 210px);
  border-radius: 10px;
  border: 1px solid ${palette.main.blue};
  position: relative;
  padding: 10px;
`;

const ClothBtnGroup = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 8px;
`;

const CodyListWrap = styled.div`
  width: 100%;
  height: 195px;
  border-radius: 10px;
  border: 1px solid ${palette.main.blue};
  position: relative;
`;
