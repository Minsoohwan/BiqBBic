import { Dispatch, useRef, useState } from "react";
import palette from "../palette";
import styled from "styled-components";
import MyText from "../basicComponent/MyText";
import MyHr from "../basicComponent/MyHr";
import EmptyVSpace from "../basicComponent/EmptyVSpace";
import MyButton from "../basicComponent/MyButton";
import { formatPrice } from "../common";
import { Shadow } from "../basicComponent/MyModal";

function HomeDoctorPopup({
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
            홈닥터 프로토타입 안내
          </MyText>
        </TitleContainer>
        <ContentContainer>
          <InfoBox />
          <ImgBox />
          <div className="button">
            <MyButton
              $font="bold20"
              $size="large"
              $backgroundColor="blue"
              $width="277px"
              onClick={() => {
                setPopupVisible(false);
              }}
            >
              닫기
            </MyButton>
          </div>
        </ContentContainer>
      </PopupContent>
    </Shadow>
  );
}

export default HomeDoctorPopup;

const PopupContent = styled.div`
  position: relative;
  min-width: 800px;
  width: 800px;
  min-height: 650px;
  height: 650px;
  border-radius: 10px;
  background-color: ${palette.white};
  z-index: 100;
  -webkit-transform: translate3d(0, 0, 20px);
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  width: 100%;
  height: 65px;
  background-color: ${palette.main.blue};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  .button {
    text-align: center;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  height: 48px;
  background-image: url("/asset/homeDoctorText.png");
  background-repeat: no-repeat;
  background-size: contain;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 409px;
  background-image: url("/asset/homeDoctorImg.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
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
  -webkit-transform: translate3d(0, 0, 21px);
`;
