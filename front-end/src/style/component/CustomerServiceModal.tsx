import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalGatherStore } from "../../recoilStore";
import { CloesIcon, PopupContent, Shadow } from "../basicComponent/MyModal";
import MyText from "../basicComponent/MyText";
import palette from "../palette";
import MyHr from "../basicComponent/MyHr";
import { RowDiv } from "../basicComponent/MyContainer";
import styled from "styled-components";
import MyButton from "../basicComponent/MyButton";

export const CustomerServiceModal = () => {
  const [modalGather, setModalGather] = useRecoilState(modalGatherStore);
  const [choose, setChoose] = useState<"" | "left" | "right">("");

  const closeFunc = () => {
    setModalGather({ ...modalGather, customerServiceModal: false });
  };

  useEffect(() => {
    setChoose("");
  }, [modalGather.customerServiceModal]);

  return (
    <React.Fragment>
      {modalGather.customerServiceModal && (
        <Shadow onClick={closeFunc}>
          <PopupContent
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CloesIcon onClick={closeFunc} />
            <MyText $font="title32" $color={palette.green.green4}>
              원격상담 연결
            </MyText>
            <MyHr $margin="5px 0 50px 0" />
            <CenterWrap>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <RowDiv $width="fit-content" $columnGap="16px">
                  <MyText $font="bold20" $color={palette.gray.gray4}>
                    고객센터 운영시간
                  </MyText>
                  <MyText $font="bold20">매일 오전 7시~오후 10시</MyText>
                </RowDiv>
                <RowDiv $width="fit-content" $columnGap="54px">
                  <MyText $font="bold20" $color={palette.gray.gray4}>
                    고객센터 번호
                  </MyText>
                  <MyText $font="bold20">070-1234-5678</MyText>
                </RowDiv>
              </div>
              <RowDiv $margin="48px 0 0 0 ">
                <ChooseBox
                  $isActive={choose === "left"}
                  onClick={() => setChoose("left")}
                >
                  <MyText
                    $font="bold24"
                    $color={choose === "left" ? palette.white : ""}
                  >
                    • 사용 방법
                  </MyText>
                  <MyText
                    $font="bold24"
                    $color={choose === "left" ? palette.white : ""}
                  >
                    • 주문
                  </MyText>
                </ChooseBox>
                <ChooseBox
                  $isActive={choose === "right"}
                  onClick={() => setChoose("right")}
                >
                  <MyText
                    $font="bold24"
                    $color={choose === "right" ? palette.white : ""}
                  >
                    • 배송
                  </MyText>
                  <MyText
                    $font="bold24"
                    $color={choose === "right" ? palette.white : ""}
                  >
                    • 교환
                  </MyText>
                  <MyText
                    $font="bold24"
                    $color={choose === "right" ? palette.white : ""}
                  >
                    • 반품
                  </MyText>
                </ChooseBox>
              </RowDiv>
              <WaitingTimeBox>
                {choose === "" ? (
                  <MyText $font="title24">문의 유형을 선택해주세요.</MyText>
                ) : choose === "left" ? (
                  <>
                    <MyText $font="title24">대기 고객 : 3명</MyText>
                    <MyText $font="title24">예상 대기 시간 : 2분</MyText>
                  </>
                ) : (
                  <>
                    <MyText $font="title24">대기 고객 : 1명</MyText>
                    <MyText $font="title24">예상 대기 시간 : 1분</MyText>
                  </>
                )}
              </WaitingTimeBox>

              <MyButton
                $disabled={choose === ""}
                $font="bold20"
                $size="large"
                $backgroundColor="orange"
                $width="277px"
              >
                상담 연결하기
              </MyButton>
            </CenterWrap>
          </PopupContent>
        </Shadow>
      )}
    </React.Fragment>
  );
};

const CenterWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

interface chooseBoxProps {
  $isActive: boolean;
}

const ChooseBox = styled.div<chooseBoxProps>`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  row-gap: 20px;
  border: ${(props) => !props.$isActive && `1.5px solid ${palette.main.green}`};
  background-color: ${(props) => props.$isActive && palette.main.green};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const WaitingTimeBox = styled.div`
  width: 100%;
  height: 72px;
  margin: 30px 0 50px 0;
  row-gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
