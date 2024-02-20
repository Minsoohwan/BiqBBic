import styled from "styled-components";
import { ReactComponent as HeartFill } from "../../asset/heartFill.svg";
import { ReactComponent as Heart } from "../../asset/heartDefault.svg";
import palette from "../palette";
import { formatPrice, handleFontStyle } from "../common";
import MyText from "../basicComponent/MyText";
import ItemCountBox from "./ItemCountBox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function ItemBox(props: Item) {
  const [itemCount, setItemCount] = useState<number>(1);

  const presetStyle = getStyle(props.preset);

  useEffect(() => {
    if (props.itemCount) setItemCount(props.itemCount);
  }, [props.itemCount]);

  return (
    <Wrap>
      <ItemImg $size={presetStyle.size} $img={props.img}>
        {props.useIcon && (
          <IconBox>
            {props.favorite ? (
              <HeartFill
                width={presetStyle.heart.width}
                height={presetStyle.heart.height}
              />
            ) : (
              <Heart
                width={presetStyle.heart.width}
                height={presetStyle.heart.height}
              />
            )}
          </IconBox>
        )}
      </ItemImg>
      {!!props.buyCount && (
        <MyText $font="bold20">{props.buyCount}번 구매</MyText>
      )}
      {!props.imgOnly && (
        <ItemText $font={presetStyle.font}>{props.text}</ItemText>
      )}
      {props.useCount && (
        <ItemCountBox
          count={itemCount}
          setCount={setItemCount}
          onCountChanged={props.onCountChanged}
        />
      )}
      {!props.imgOnly && props.price && (
        <MyText $font={presetStyle.price} $color={palette.main.blue}>
          {formatPrice(props.price * itemCount)}
        </MyText>
      )}
    </Wrap>
  );
}

export default ItemBox;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const ItemImg = styled.div<{ $size: string; $img: string }>`
  position: relative;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border: 1px solid ${palette.gray.gray2};
  border-radius: 10px;
  background-image: url(${({ $img }) => $img});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const IconBox = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
`;

const ItemText = styled.div<{ $font: string }>`
  ${({ $font }) => $font}
`;

type Style = {
  font: string;
  price: FontType;
  size: string;
  heart: { width: number; height: number };
};
function getStyle(preset: string | undefined): Style {
  const result: Style = {
    font: "display:block overflow: hidden text-overflow: ellipsis white-space: nowrap position: relative -webkit-line-clamp: 1 -webkit-box-orient: vertical;",
    size: "120px",
    price: "bold16",
    heart: { width: 23.3, height: 17.65 },
  };

  switch (preset) {
    case "xlarge":
      result.size = "280px";
      result.heart = { width: 34.94, height: 26.48 };
      break;
    case "large":
      result.font = result.font + handleFontStyle("regular20");
      result.size = "210px";
      result.price = "bold24";
      result.heart = { width: 34.94, height: 26.48 };
      break;
    case "medium":
      result.font = result.font + handleFontStyle("regular16");
      result.size = "136px";
      result.price = "bold20";
      break;
    case "small":
      result.font = result.font + handleFontStyle("regular16");
      break;
    default:
      result.font = result.font + handleFontStyle("regular16");
  }

  return result;
}
