import { Dispatch, useState } from "react";
import palette from "../palette";
import styled from "styled-components";
import MyText from "../basicComponent/MyText";
import MyHr from "../basicComponent/MyHr";
import EmptyVSpace from "../basicComponent/EmptyVSpace";
import MyButton from "../basicComponent/MyButton";
import { formatPrice } from "../common";

function BillPopup({
  setPopupVisible,
  items,
}: {
  setPopupVisible: Dispatch<React.SetStateAction<boolean>>;
  items: ToBuyItem[];
}) {
  const [price, setPrice] = useState<number>(
    items.reduce((price, item) => {
      return price + item.price * item.itemCount;
    }, 0)
  );
  const [discount, setDiscount] = useState<number>(2800);

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
        <MyText $font="title32" $color={palette.green.green4}>
          주문서
        </MyText>
        <EmptyVSpace $height="5px" />
        <MyHr />
        <EmptyVSpace $height="20px" />
        <ContentContainer>
          <ContentBox>
            <MyText $font="bold16" $width="81px" $color={palette.gray.gray4}>
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
            <MyText $font="bold16" $width="81px" $color={palette.gray.gray4}>
              배송 메시지
            </MyText>
            <MyText $font="regular20" $color={palette.black}>
              문 앞에 놓아주세요
            </MyText>
          </ContentBox>
          <ContentBox>
            <MyText $font="bold16" $width="81px" $color={palette.gray.gray4}>
              주문 상품
            </MyText>
            <ItemContainer>
              {items.map((item) => (
                <div className="item">
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
            <MyText $font="bold16" $width="81px" $color={palette.gray.gray4}>
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
            <MyText $font="bold16" $width="81px" $color={palette.gray.gray4}>
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
            <MyText $font="bold16" $width="81px" $color={palette.gray.gray4}>
              결제 금액
            </MyText>
            <div className="price">
              <MyText $font="bold24" $color={palette.green.green4}>
                {formatPrice(
                  (price >= 50000 ? price : price + 4000) - discount
                )}
              </MyText>
              <MyText $font="regular14">
                (적립 예정금액{" "}
                {formatPrice(
                  ((price >= 50000 ? price : price + 4000) - discount) * 0.02,
                  true
                )}
                )
              </MyText>
            </div>
          </ContentBox>
          <ContentBox>
            <MyText $font="bold16" $width="81px" $color={palette.gray.gray4}>
              결제 방법
            </MyText>
            <MyText $font="regular20" $color={palette.black}>
              문 앞에 놓아주세요
            </MyText>
          </ContentBox>
        </ContentContainer>
        <EmptyVSpace $height="34px" />
        <ButtonContainer>
          <MyButton $size="large" $backgroundColor="orange" $width="277px">
            결제하기
          </MyButton>
        </ButtonContainer>
      </PopupContent>
    </Shadow>
  );
}

export default BillPopup;

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
`;

const PopupContent = styled.div`
  position: relative;
  padding: 25px;
  width: 800px;
  height: 650px;
  border-radius: 10px;
  background-color: ${palette.white};
  z-index: 100;
`;

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
