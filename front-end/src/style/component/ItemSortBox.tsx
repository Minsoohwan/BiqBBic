import React from "react";
import styled from "styled-components";
import palette from "../palette";
import BarcodeFetcher from "../../barcode/BarcodeFetcher";
import { useRecoilState } from "recoil";
import {
  currentItemStore,
  searchResultStore,
  selectedMenuStore,
  similerItemsStore,
} from "../../recoilStore";

interface itemsortProps {
  title: string;
  imgUrl: string;
}

export const ItemSortBox = ({ title, imgUrl }: itemsortProps) => {
  const [currentMenu, setCurrentMenu] = useRecoilState(selectedMenuStore);
  const [currentItem, setCurrentItem] = useRecoilState(currentItemStore);
  const [similerItems, setSismilerItems] = useRecoilState(similerItemsStore);
  const [searchResult, setSearchResult] = useRecoilState(searchResultStore);

  function searchItems(value: string | number) {
    if (currentMenu == "주문내역") return;

    if (isNaN(Number(value))) {
      BarcodeFetcher.getItems(value).then(({ data: items }) => {
        if (items === "검색 결과 없음") {
          setSearchResult("검색 결과 없음");
          setCurrentMenu("검색");
          return;
        }

        setCurrentItem(null);
        setCurrentMenu("검색");
        setSearchResult(items);
      });
    } else {
      BarcodeFetcher.getItemData(value).then(({ data }) => {
        if (data === "검색 결과 없음") {
          setSearchResult("검색 결과 없음");
          setCurrentMenu("검색");
          return;
        }

        setCurrentItem(data.item);
        setCurrentMenu("검색");
        setSismilerItems(data.similerItems);
      });
    }
  }
  return (
    <Wrap
      onClick={() => {
        searchItems(title);
      }}
    >
      <SortImg src={imgUrl} alt={title} />
      <Title>{title}</Title>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  width: 210px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const SortImg = styled.img`
  width: 210px;
  height: 210px;
  padding: 10px;
  border: 1px solid ${palette.gray.gray2};
  border-radius: 10px;
`;

const Title = styled.p`
  width: 210px;
  height: 28px;
  display: flex;
  margin: 10px 0 0 0;
  justify-content: center;
  align-items: center;
  font-family: bold;
  font-size: 24px;
`;
