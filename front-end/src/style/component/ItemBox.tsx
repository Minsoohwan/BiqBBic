import styled from "styled-components";
import { ReactComponent as HeartFill } from "../../asset/heartFill.svg";
import { ReactComponent as Heart } from "../../asset/heartDefault.svg";
import palette from "../palette";
import { formatPrice, handleFontStyle } from "../common";
import MyText from "../basicComponent/MyText";
import ItemCountBox from "./ItemCountBox";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { favoriteItemsStore } from "../../recoilStore";

function ItemBox(props: Item & { onClick?: () => void }) {
  const [itemCount, setItemCount] = useState<number>(1);

  const [favoriteItems, setFavoriteItems] = useRecoilState(favoriteItemsStore);

  const presetStyle = getStyle(props.preset);

  useEffect(() => {
    if (props.itemCount) setItemCount(props.itemCount);
  }, [props.itemCount]);

  return (
    <Wrap $size={presetStyle.size} onClick={props.onClick}>
      <ItemImg $size={presetStyle.size} $img={props.item.img}>
        {props.useIcon && (
          <IconBox
            onClick={(e) => {
              e.stopPropagation();

              const newFavorite = (() => {
                if (favoriteItems.some((item) => item.id === props.item.id)) {
                  return favoriteItems.filter(
                    (item) => item.id !== props.item.id
                  );
                } else {
                  return [...favoriteItems, props.item];
                }
              })();
              setFavoriteItems(newFavorite);
            }}
          >
            {favoriteItems.some((item) => item.id === props.item.id) ? (
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
        <ItemText $font={presetStyle.font}>{props.item.text}</ItemText>
      )}
      {props.useCount && (
        <ItemCountBox
          count={itemCount}
          setCount={setItemCount}
          onCountChanged={props.onCountChanged}
        />
      )}
      {!props.imgOnly && props.item.price && (
        <MyText $font={presetStyle.price} $color={palette.main.blue}>
          {formatPrice(props.item.price * itemCount)}
        </MyText>
      )}
    </Wrap>
  );
}

export default ItemBox;

const Wrap = styled.div<{ $size: string }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: ${({ $size }) => $size};
  flex-shrink: 0;
`;

const ItemImg = styled.div<{ $size: string; $img: string }>`
  position: relative;

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
  width: 100%;
  word-break: break-all;
`;

type Style = {
  font: string;
  price: FontType;
  size: string;
  heart: { width: number; height: number };
};
function getStyle(preset: string | undefined): Style {
  const result: Style = {
    font: "display:-webkit-box; overflow: hidden; text-overflow: ellipsis; white-space: normal; position: relative; -webkit-line-clamp: 2; -webkit-box-orient: vertical;",
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
