import styled from "styled-components";
import palette from "../../style/palette";
import MyText from "../../style/basicComponent/MyText";
import { formatPrice } from "../../style/common";
import ClosetOnSvg from "../../asset/icons/closetOn.svg";
import ClosetOffSvg from "../../asset/icons/closetOff.svg";
import { useRecoilState } from "recoil";
import { ysClosetListState } from "../../recoil/Yunseul";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ItemCountBox from "../../style/component/ItemCountBox";
import trashSvg from "../../asset/trash.svg";

interface productBoxProps {
  $clothKey: string;
  $boxType: "small" | "medium" | "large";
  $brand: string;
  $title: string;
  $price: number;
  $src?: string;
  $useage?: "cart" | "closet" | "home" | "sort";
  $option?: string[];
  $buyNum?: number;
}

export const ProductBox = (
  props: productBoxProps & {
    cartList?: ysCartType[];
    setCartList?: Dispatch<SetStateAction<ysCartType[]>>;
    toBuyList?: string[];
    setToBuyList?: Dispatch<SetStateAction<string[]>>;
  }
) => {
  const [ysClosetList, setYsClosetList] = useRecoilState(ysClosetListState);
  const [buyCount, setBuycount] = useState<number>(props.$buyNum || 0);

  const clickClosetIconFunc = () => {
    let newClosetList = [...ysClosetList];
    if (newClosetList.includes(props.$clothKey)) {
      newClosetList = newClosetList.filter((val) => val !== props.$clothKey);
    } else newClosetList.push(props.$clothKey);
    setYsClosetList(newClosetList);
  };

  const handleBuyList = (buyCount: number) => {
    if (props.cartList && props.setCartList) {
      let newList = [...props.cartList];
      const index = newList.findIndex(
        (item) => item.clothKey === props.$clothKey
      );
      newList[index].buyNum = buyCount;
      props.setCartList(newList);
    }
  };

  const removeCartFunc = () => {
    if (
      props.cartList &&
      props.setCartList &&
      props.toBuyList &&
      props.setToBuyList
    ) {
      let newBuyList = [...props.toBuyList];
      newBuyList = newBuyList.filter((val) => val !== props.$clothKey);
      props.setToBuyList(newBuyList);

      let newList = [...props.cartList];
      newList = newList.filter((item) => item.clothKey !== props.$clothKey);
      props.setCartList(newList);
    }
  };

  return (
    <Wrap $boxType={props.$boxType}>
      <ImgBox $boxType={props.$boxType}>
        <ClothImg src={props.$src} />
        {props.$useage !== "cart" && (
          <SaveInClosettImg
            src={
              ysClosetList.includes(props.$clothKey)
                ? ClosetOnSvg
                : ClosetOffSvg
            }
            onClick={clickClosetIconFunc}
          />
        )}
      </ImgBox>
      <ContentWrap $boxType={props.$boxType}>
        <MyText
          $font={props.$boxType === "large" ? "bold16" : "bold14"}
          $color={palette.gray.gray4}
        >
          {props.$brand}
        </MyText>
        <ProductName
          $font={
            props.$boxType === "large"
              ? "regular20"
              : props.$boxType === "medium"
              ? "regular16"
              : "regular14"
          }
          $color={palette.gray.gray4}
        >
          {props.$title}
        </ProductName>
        {props.$useage === "cart" && (
          <>
            <MyText $font={"regular16"}>{props.$option?.join(", ")}</MyText>

            <ItemCountBox
              count={buyCount}
              setCount={setBuycount}
              useage="yunseul"
              onCountChanged={(count) => {
                handleBuyList(count);
              }}
            />
          </>
        )}
        <MyText
          $font={
            props.$boxType === "large"
              ? "regular20"
              : props.$boxType === "medium"
              ? "regular16"
              : "regular14"
          }
          $color={palette.gray.gray4}
        >
          {props.$useage === "cart" && props.$buyNum
            ? formatPrice(props.$price * props.$buyNum)
            : formatPrice(props.$price)}
          {props.$useage === "cart" && (
            <TrashSvg src={trashSvg} onClick={removeCartFunc} />
          )}
        </MyText>
      </ContentWrap>
    </Wrap>
  );
};

interface boxProps {
  $boxType: "small" | "medium" | "large";
}

const Wrap = styled.div<boxProps>`
  ${({ $boxType }) => handleWrapStyle($boxType)};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const ImgBox = styled.div<boxProps>`
  ${({ $boxType }) => handleImgBoxStyle($boxType)};
  display: flex;
  border-radius: 10px;
  padding: 10px;
  position: relative;
`;

const ClothImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const SaveInClosettImg = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const ContentWrap = styled.div<boxProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  row-gap: ${(props) => (props.$boxType === "large" ? "5px" : "3px")};
  margin-top: ${(props) => (props.$boxType === "small" ? "" : "5px")};
`;

const ProductName = styled(MyText)`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  position: relative;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const TrashSvg = styled.img`
  position: absolute;
  right: 0;
  bottom: 1px;
  cursor: pointer;
`;

const handleWrapStyle = (
  $boxType: "small" | "medium" | "large" | undefined
) => {
  switch ($boxType) {
    case "small":
      return "width : 108px; max-height : 182px;  ";
    case "medium":
      return "width : 120px; max-height : 264px;  ";
    case "large":
      return "width : 210px; max-height :315px;  ";
    default:
      return "width : 120px; max-height : 264px;  ";
  }
};

const handleImgBoxStyle = (
  $boxType: "small" | "medium" | "large" | undefined
) => {
  switch ($boxType) {
    case "small":
      return "width : 108px; height : 108px;  background :linear-gradient(#9E9E9E 0%,#E2E2E2 60%, #F5F5F5 100%); ";
    case "medium":
      return `width : 120px; height : 120px; border:1px solid ${palette.gray.gray3};  `;
    case "large":
      return `width : 210px; height :210px;  border:1px solid ${palette.gray.gray2};  `;
    default:
      return `width : 120px; height : 120px; border:1px solid ${palette.gray.gray3}; `;
  }
};
