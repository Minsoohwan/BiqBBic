import React from "react";
import { useRecoilState } from "recoil";
import { modalGatherStore } from "../../recoilStore";
import { CloesIcon, PopupContent, Shadow } from "../basicComponent/MyModal";
import MyText from "../basicComponent/MyText";
import palette from "../palette";
import MyHr from "../basicComponent/MyHr";
import { RowDiv } from "../basicComponent/MyContainer";
import styled from "styled-components";

export const CustomerServiceModal = () => {
  const [modalGather, setModalGather] = useRecoilState(modalGatherStore);

  const closeFunc = () => {
    setModalGather({ ...modalGather, customerServiceModal: false });
  };

  return (
    <React.Fragment>
      {modalGather.customerServiceModal && (
        <Shadow>
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
                <RowDiv $width="fit-content" $columnGap="65px">
                  <MyText $font="bold20" $color={palette.gray.gray4}>
                    고객센터 번호
                  </MyText>
                  <MyText $font="bold20">070-1234-5678</MyText>
                </RowDiv>
              </div>
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
