import styled from "styled-components";
import palette from "../style/palette";
import MyText from "../style/basicComponent/MyText";
import { Line1px, MyFlexContainer } from "../style/basicComponent/MyContainer";
import React, { useEffect, useState } from "react";
import { ProductBox } from "../component/yunseulUnits/ProductBox";
import MyButton from "../style/basicComponent/MyButton";
import { useRecoilState } from "recoil";
import { modalGatherStore } from "../recoilStore";
import jarket1 from "../asset/cloth/jarket1.png";
import { formatPrice } from "../style/common";

export const YunseulCart = () => {
  const [toBuyList, setToBuyList] = useState<string[]>([]);
  const [modalGather, setModalGather] = useRecoilState(modalGatherStore);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [cartList, setCartList] = useState<ysCartType[]>([
    {
      clothKey: "top1",
      brand: "엘리마담",
      title: "베이직 블랙 슬리브",
      option: ["black", "free"],
      buyNum: 2,
      price: 14400,
      src: jarket1,
    },
    {
      clothKey: "bottom1",
      brand: "247 시리즈",
      title: "베이직 스트레이트 진",
      option: ["skyblue", "66"],
      buyNum: 1,
      price: 37800,
      src: jarket1,
    },
  ]); //todo : 여기에 주문 체크불린값을 넣어서 한번에 관리. 그럼 나머지 변수도 쫌 없앨수있씀

  const changeToBuyFunc = (item: ysCartType) => {
    let newBuyList = [...toBuyList];
    if (newBuyList.includes(item.clothKey)) {
      newBuyList = newBuyList.filter((val) => val !== item.clothKey);
    } else newBuyList.push(item.clothKey);
    setToBuyList(newBuyList);
  };

  useEffect(() => {
    console.log(cartList);
    if (cartList) {
      let sum = 0;
      cartList.forEach((val) => {
        if (toBuyList.includes(val.clothKey)) sum += val.price * val.buyNum;
      });
      setPayAmount(sum);
    }
  }, [toBuyList, cartList]);

  useEffect(() => {
    if (cartList.length > 0) {
      let newList: string[] = [];

      cartList.forEach((val) => {
        newList.push(val.clothKey);
      });

      setToBuyList(newList);
      let sum = 0;
      cartList.forEach((val) => {
        sum += val.price * val.buyNum;
      });
      setPayAmount(sum);
    }
  }, []);

  return (
    <Wrap>
      <MyText $font="title32">장바구니</MyText>
      <Line1px $margin="6px 0 0 0" />

      <ProductGroup>
        {cartList.map((item: ysCartType, index: number) => (
          <React.Fragment key={item.clothKey}>
            <MyFlexContainer
              $position="relative"
              $gap="5px"
              $borderRadius="0px"
              $flexShrink="0"
            >
              <input
                type="checkbox"
                checked={toBuyList.includes(item.clothKey)}
                onChange={(e) => {
                  changeToBuyFunc(item);
                }}
              />
              <ProductBox
                cartList={cartList}
                setCartList={setCartList}
                toBuyList={toBuyList}
                setToBuyList={setToBuyList}
                $clothKey={item.clothKey}
                $boxType="medium"
                $brand={item.brand}
                $title={item.title}
                $price={item.price}
                $src={item.src}
                $useage="cart"
                $buyNum={item.buyNum}
                $option={item.option}
              />
            </MyFlexContainer>
            {index !== cartList.length - 1 && <Line1px />}
          </React.Fragment>
        ))}
      </ProductGroup>

      <MyText
        $font="bold20"
        $width="100%"
        $textAlign="right"
        $color={palette.gray.gray4}
      >
        선택상품 총액
      </MyText>
      <MyText
        $font={formatPrice(payAmount).length >= 10 ? "title20" : "title24"}
        $width="100%"
        $textAlign="right"
        $color={palette.gray.gray4}
      >
        {formatPrice(payAmount)}
      </MyText>

      <MyButton
        $font="bold20"
        $size="medium"
        $backgroundColor="mainBlue"
        $disabled={toBuyList.length === 0}
        onClick={() => {
          setModalGather({ ...modalGather, orderModal: true });
        }}
      >
        주문
      </MyButton>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 170px;
  position: relative;
  background-color: ${palette.white};
  height: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 10px;
`;

const ProductGroup = styled.div`
  width: 100%;
  height: calc(100% - 160px);
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  row-gap: 10px;
  overflow-y: auto;
`;
