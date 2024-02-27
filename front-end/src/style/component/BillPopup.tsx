import React, { Dispatch, useEffect, useState } from "react";
import palette from "../palette";
import styled from "styled-components";
import MyText from "../basicComponent/MyText";
import MyHr from "../basicComponent/MyHr";
import EmptyVSpace from "../basicComponent/EmptyVSpace";
import MyButton from "../basicComponent/MyButton";
import { formatPrice } from "../common";
import RadioFalse from "../../asset/radioFalse.svg";
import RadioTrue from "../../asset/radioTrue.svg";
import ShippingGif from "../../asset/shipping.gif";
import PaymentGif from "../../asset/cardPayment.gif";
import { ReactComponent as BankbookSvg } from "../../asset/bankBook.svg";
import { useRecoilState } from "recoil";
import { modalGatherStore } from "../../recoilStore";
import { RowDiv } from "../basicComponent/MyContainer";
import { CloesIcon, PopupContent, Shadow } from "../basicComponent/MyModal";

function formatDate(date: Date) {
  const month = date.getMonth() + 1; // 월 (0부터 시작하므로 +1)
  const day = date.getDate(); // 일

  // 한 자리 숫자인 경우 앞에 0을 붙여 두 자리로 만들기
  // const formattedMonth = month < 10 ? "0" + month : month;
  // const formattedDay = day < 10 ? "0" + day : day;

  return month + "월 " + day + "일";
}

type orderProcessType =
  | "주문서"
  | "카드 결제"
  | "카드 결제 완료"
  | "계좌이체 주문 접수";

function BillPopup({ items }: { items: ToBuyItem[] }) {
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(2800);
  const paymentList = ["카드", "계좌이체"];
  const [paymentType, setPaymentType] = useState<string>(paymentList[0]);
  const [modalGather, setModalGather] = useRecoilState(modalGatherStore);
  const [orderProcess, setOrderProcess] = useState<orderProcessType>("주문서");
  const [addDayList, setAddDayList] = useState<string[]>([
    "2월 26일",
    "2월 28일",
    "3월 4일",
  ]);

  const goPaymentFunc = () => {
    if (paymentType === "카드") setOrderProcess("카드 결제");
    else setOrderProcess("계좌이체 주문 접수");
  };

  const closeFunc = () => {
    setModalGather({ ...modalGather, orderModal: false });
  };

  useEffect(() => {
    if (orderProcess === "카드 결제") {
      setTimeout(() => {
        setOrderProcess("카드 결제 완료");
      }, 2000);
    }
  }, [orderProcess]);

  useEffect(() => {
    if (modalGather.orderModal) {
      setPrice(
        items.reduce((price, item) => {
          return price + item.price * item.itemCount;
        }, 0)
      );
      const today = new Date(); // 현재 날짜 가져오기
      const add2 = new Date(today); // 복사본 생성
      const add7 = new Date(today); // 복사본 생성

      add2.setDate(add2.getDate() + 2); // 현재 날짜에서 2일을 더하기
      add7.setDate(add7.getDate() + 7); // 현재 날짜에서 7일을 더하기

      setAddDayList([formatDate(today), formatDate(add2), formatDate(add7)]); // 현재 날짜에서 2일을 더하기
    } else {
      setOrderProcess("주문서");
      setPaymentType("카드");
    }
  }, [modalGather.orderModal]);

  return (
    <React.Fragment>
      {modalGather.orderModal && (
        <Shadow>
          <PopupContent
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CloesIcon onClick={closeFunc} />
            <MyText $font="title32" $color={palette.green.green4}>
              {orderProcess}
            </MyText>
            <EmptyVSpace $height="5px" />
            <MyHr />
            <EmptyVSpace $height="20px" />
            {orderProcess === "카드 결제" ? (
              <CenterWrap>
                <GifContainer>
                  <PaymentGifImg src={PaymentGif} />
                </GifContainer>
                <MyText $margin="50px 0 0 0" $font="title32">
                  카드를 리더기에 꽂아주세요.
                </MyText>
              </CenterWrap>
            ) : orderProcess === "카드 결제 완료" ? (
              <CenterWrap>
                <img src={ShippingGif} alt="배송gif" width={"340px"}></img>
                <MyText $margin="50px 0 0 0" $font="title32">
                  감사합니다.
                </MyText>
                <MyText $margin="10px 0 30px 0" $font="title32">
                  배송예정일은 <span className="day">{addDayList[1]} </span>
                  입니다.
                </MyText>
                <MyButton
                  $size="large"
                  $width="150px"
                  $font="bold20"
                  $backgroundColor="orange"
                  onClick={closeFunc}
                >
                  닫기
                </MyButton>
              </CenterWrap>
            ) : orderProcess === "계좌이체 주문 접수" ? (
              <CenterWrap>
                <MyText $font="title32">주문 접수되었습니다.</MyText>
                <MyText $margin="10px 0 0 0" $font="title32">
                  아래 계좌로 <span className="day">{addDayList[2]} </span>
                  까지 입금하시면,
                </MyText>
                <MyText $margin="10px 0 0 0" $font="title32">
                  평일 기준 2-3일 내 배송됩니다.
                </MyText>
                <RowDiv $columnGap="30px" $margin="88px 0 120px 0">
                  <BankbookSvg />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <RowDiv $width="fit-content" $columnGap="15px">
                      <MyText $font="bold20" $color={palette.gray.gray4}>
                        입금 계좌
                      </MyText>
                      <MyText $font="bold20">농협 110-456-789 (빅삑)</MyText>
                    </RowDiv>
                    <RowDiv $width="fit-content" $columnGap="15px">
                      <MyText $font="bold20" $color={palette.gray.gray4}>
                        입금 금액
                      </MyText>
                      <MyText $font="bold20">{formatPrice(price)}</MyText>
                    </RowDiv>
                  </div>
                </RowDiv>
                <MyButton
                  $size="large"
                  $width="150px"
                  $font="bold20"
                  $backgroundColor="orange"
                  onClick={closeFunc}
                >
                  닫기
                </MyButton>
              </CenterWrap>
            ) : (
              <>
                <ContentContainer>
                  <ContentBox>
                    <MyText
                      $font="bold16"
                      $width="81px"
                      $color={palette.gray.gray4}
                    >
                      배송지
                    </MyText>
                    <div>
                      <MyText $font="regular20" $color={palette.black}>
                        심아영님 010-1234-5678
                      </MyText>
                      <EmptyVSpace $height="5px" />
                      <MyText $font="regular20" $color={palette.black}>
                        경기도 성남시 분당구 불정로 426번길 9-5, 301호
                      </MyText>
                    </div>
                  </ContentBox>
                  <ContentBox>
                    <MyText
                      $font="bold16"
                      $width="81px"
                      $color={palette.gray.gray4}
                    >
                      배송 메시지
                    </MyText>
                    <MyText $font="regular20" $color={palette.black}>
                      문 앞에 놓아주세요
                    </MyText>
                  </ContentBox>
                  <ContentBox>
                    <MyText
                      $font="bold16"
                      $width="81px"
                      $color={palette.gray.gray4}
                    >
                      주문 상품
                    </MyText>
                    <ItemContainer>
                      {items.map((item, index) => (
                        <div className="item" key={index}>
                          <MyText $font="regular16" $flexGrow="1">
                            {item.text}
                          </MyText>
                          <MyText $font="regular16" $width="50px">
                            {item.itemCount}
                          </MyText>
                          <MyText $font="regular16" $width="100px">
                            {formatPrice(item.price * item.itemCount)}
                          </MyText>
                        </div>
                      ))}
                    </ItemContainer>
                  </ContentBox>
                  <ContentBox>
                    <MyText
                      $font="bold16"
                      $width="81px"
                      $color={palette.gray.gray4}
                    >
                      주문 금액
                    </MyText>
                    <div className="price">
                      <MyText $font="regular20" $color={palette.black}>
                        {formatPrice(price >= 50000 ? price : price + 4000)}
                      </MyText>
                      <MyText $font="regular14" $color={palette.black}>
                        (상품가: {formatPrice(price)})
                        {price < 50000 ? "+배송비 4,000원" : ""}
                      </MyText>
                    </div>
                  </ContentBox>
                  <ContentBox>
                    <MyText
                      $font="bold16"
                      $width="81px"
                      $color={palette.gray.gray4}
                    >
                      할인 금액
                    </MyText>
                    <div className="price">
                      <MyText $font="bold20" $color={palette.sub.orange}>
                        {formatPrice(discount)}
                      </MyText>
                      <MyText $font="regular14">(적립금)</MyText>
                    </div>
                  </ContentBox>
                  <ContentBox>
                    <MyText
                      $font="bold16"
                      $width="81px"
                      $color={palette.gray.gray4}
                    >
                      결제 금액
                    </MyText>
                    <div className="price">
                      <MyText $font="bold24" $color={palette.green.green4}>
                        {formatPrice(
                          (price >= 50000 ? price : price + 4000) - discount
                        )}
                      </MyText>
                      <MyText $font="regular14">
                        (예상 적립금{" "}
                        {formatPrice(
                          ((price >= 50000 ? price : price + 4000) - discount) *
                            0.02,
                          true
                        )}
                        )
                      </MyText>
                    </div>
                  </ContentBox>
                  <ContentBox>
                    <MyText
                      $font="bold16"
                      $width="81px"
                      $color={palette.gray.gray4}
                    >
                      결제 방법
                    </MyText>
                    <PaymentWrap>
                      {paymentList.map((val) => {
                        return (
                          <PaymentBox
                            key={val}
                            onClick={() => {
                              setPaymentType(val);
                            }}
                          >
                            <RadioImg
                              src={paymentType === val ? RadioTrue : RadioFalse}
                            />
                            <MyText $font="regular20">{val}</MyText>
                          </PaymentBox>
                        );
                      })}
                    </PaymentWrap>
                  </ContentBox>
                </ContentContainer>
                <EmptyVSpace $height="34px" />
                <ButtonContainer>
                  <MyButton
                    $font="bold20"
                    $size="large"
                    $backgroundColor="orange"
                    $width="277px"
                    onClick={goPaymentFunc}
                  >
                    결제하기
                  </MyButton>
                </ButtonContainer>
              </>
            )}
          </PopupContent>
        </Shadow>
      )}
    </React.Fragment>
  );
}

export default BillPopup;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ContentBox = styled.div`
  display: flex;
  gap: 20px;

  .price {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
  border-radius: 10px;
  border: 1px solid ${palette.gray.gray3};
  height: 120px;
  width: 100%;
  overflow-y: auto;

  .item {
    display: flex;
    gap: 5px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PaymentWrap = styled.div`
  display: flex;
  gap: 30px;
`;

const PaymentBox = styled.div`
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const RadioImg = styled.img`
  width: 20px;
  height: 20px;
`;

const GifContainer = styled.div`
  width: 250px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const PaymentGifImg = styled.img`
  width: 345px;
  height: auto;
  background-position: center;
`;

const CenterWrap = styled.div`
  margin: 60px auto auto auto;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
