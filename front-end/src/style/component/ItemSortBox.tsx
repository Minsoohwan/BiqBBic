import React from "react";
import styled from "styled-components";
import palette from "../palette";

interface itemsortProps {
  title: string;
  imgUrl: string;
}

export const ItemSortBox = ({ title, imgUrl }: itemsortProps) => {
  return (
    <Wrap>
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
