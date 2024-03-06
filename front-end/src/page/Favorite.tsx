import { useState } from "react";
import MyButton from "../style/basicComponent/MyButton";
import {
  MyContainer,
  MyFlexContainer,
} from "../style/basicComponent/MyContainer";
import MyHr from "../style/basicComponent/MyHr";
import MyText, { MyLinkText } from "../style/basicComponent/MyText";
import { formatPrice } from "../style/common";
import ItemBox from "../style/component/ItemBox";
import ItemCountBox from "../style/component/ItemCountBox";
import palette from "../style/palette";
import BarcodeFetcher from "../barcode/BarcodeFetcher";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentItemStore,
  favoriteItemsStore,
  selectedMenuStore,
  similerItemsStore,
} from "../recoilStore";

function Favorite() {
  const setCurrentMenu = useSetRecoilState(selectedMenuStore);
  const setCurrentItem = useSetRecoilState(currentItemStore);
  const setSismilerItems = useSetRecoilState(similerItemsStore);

  const [favoriteItems, setFavoriteItems] = useRecoilState(favoriteItemsStore);

  return (
    <MyFlexContainer $flexDirection="column" $alignItems="flex-start">
      <div style={{ width: "100%" }}>
        <MyText
          $font="bold24"
          $color={palette.gray.gray4}
          $margin="8px 0 6px 0"
        >
          '좋아요'가 눌린 상품 목록
        </MyText>
        <MyHr />
      </div>
      <MyFlexContainer
        $overflowX="auto"
        $gap="20px"
        $flexGrow="1"
        $height="100%"
        $flexWrap="wrap"
      >
        {favoriteItems.map((item: ItemData) => (
          <ItemBox
            key={item.id}
            preset="large"
            item={item}
            useIcon={true}
            onClick={() => {
              setCurrentItem(item);
              setSismilerItems([]);
              BarcodeFetcher.getItems(item.text).then(({ data: items }) => {
                if (items === "검색 결과 없음") {
                  setSismilerItems([]);
                  return;
                }

                setSismilerItems(items);
              });
            }}
          />
        ))}
      </MyFlexContainer>
    </MyFlexContainer>
  );
}

export default Favorite;
