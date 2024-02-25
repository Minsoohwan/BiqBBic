import { Dispatch, useState } from "react";
import palette from "../palette";
import styled from "styled-components";
import MyText from "../basicComponent/MyText";
import MyHr from "../basicComponent/MyHr";
import EmptyVSpace from "../basicComponent/EmptyVSpace";
import MyButton from "../basicComponent/MyButton";
import { formatPrice } from "../common";

function Information({
  setPopupVisible,
}: {
  setPopupVisible: Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Shadow
      onClick={() => {
        setPopupVisible(false);
      }}
    >
      <PopupContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloesIcon
          onClick={() => {
            setPopupVisible(false);
          }}
        />
        <TitleContainer>
          <MyText $font="title32" $color={palette.white}>
            빅삑 프로토타입 안내
          </MyText>
        </TitleContainer>
        <ContentContainer>
          <InfoBox />
          <EmptyVSpace $height="17px" />
          <GifBox></GifBox>
        </ContentContainer>
      </PopupContent>
    </Shadow>
  );
}

export default Information;

const Shadow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 50;
`;

const PopupContent = styled.div`
  position: relative;
  width: 800px;
  height: 650px;
  border-radius: 10px;
  background-color: ${palette.white};
  z-index: 100;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  width: 100%;
  height: 65px;
  background-color: ${palette.main.green};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ContentContainer = styled.div`
  padding: 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 168px;
  background-image: url("/asset/info.png");
  background-repeat: no-repeat;
  background-size: contain;
`;

const GifBox = styled.div`
  width: 100%;
  height: 360px;
  background-color: #d9d9d9;
`;

const CloesIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  background-image: url("/asset/close.png");
  background-size: cover;
  cursor: pointer;
  z-index: 101;
`;
