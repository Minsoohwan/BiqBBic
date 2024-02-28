import { Dispatch, useEffect, useState } from "react";
import MyButton from "../style/basicComponent/MyButton";
import { MyFlexContainer } from "../style/basicComponent/MyContainer";
import MyHr from "../style/basicComponent/MyHr";
import MyText, { MyLinkText } from "../style/basicComponent/MyText";
import { formatPrice } from "../style/common";
import ItemBox from "../style/component/ItemBox";
import ItemCountBox from "../style/component/ItemCountBox";
import palette from "../style/palette";
import { useSetRecoilState } from "recoil";
import {
  currentItemStore,
  selectedMenuStore,
  similerItemsStore,
} from "../recoilStore";
import BarcodeFetcher from "../barcode/BarcodeFetcher";
import EmptyVSpace from "../style/basicComponent/EmptyVSpace";

export interface ItemListProps {
  title?: string;
  useCount?: boolean;
  items?: ItemData[];
}

function ItemList(props: ItemListProps) {
  const { title, items, useCount } = props;

  const setCurrentMenu = useSetRecoilState(selectedMenuStore);
  const setCurrentItem = useSetRecoilState(currentItemStore);
  const setSismilerItems = useSetRecoilState(similerItemsStore);

  const [itemList, setItemList] = useState<ItemData[]>(
    items ?? [
      {
        id: 8809369710016,
        text: "프라임하우스 프라임하우스 에스프레소 커피 1kg",
        price: 29000,
        img: "https://shopping-phinf.pstatic.net/main_9689536/9689536083.1.jpg?type=f140",
      },
      {
        id: 8802128783993,
        text: "(주)해우촌  청파래김 전장 (롯데마트)  15G x 7EA",
        price: 4500,
        img: "https://shopping-phinf.pstatic.net/main_8369271/83692711325.jpg?type=f140",
      },
      {
        id: 8809413580077,
        text: "(주)남한산성 동부묵 3kg",
        price: 13290,
        img: "https://shopping-phinf.pstatic.net/main_4353976/43539764856.20231027165540.jpg?type=f140",
      },
      {
        id: 8801043003100,
        text: "라면육개장",
        price: 5680,
        img: "https://shopping-phinf.pstatic.net/main_5681673/5681673560.20150128153149.jpg?type=f140",
      },
      {
        id: 8801043803694,
        text: "안성탕면 125Gx20`S",
        price: 19900,
        img: "https://shopping-phinf.pstatic.net/main_4536673/45366730319.1.jpg?type=f140",
      },
      {
        id: 8809369710015,
        text: "프라임하우스 프라임하우스 에스프레소 커피 1kg",
        price: 29000,
        img: "https://shopping-phinf.pstatic.net/main_9689536/9689536083.1.jpg?type=f140",
      },
      {
        id: 8802128783996,
        text: "(주)해우촌  청파래김 전장 (롯데마트)  15G x 7EA",
        price: 4500,
        img: "https://shopping-phinf.pstatic.net/main_8369271/83692711325.jpg?type=f140",
      },
      {
        id: 8809413580074,
        text: "(주)남한산성 동부묵 3kg",
        price: 13290,
        img: "https://shopping-phinf.pstatic.net/main_4353976/43539764856.20231027165540.jpg?type=f140",
      },
      {
        id: 8801043003102,
        text: "라면육개장",
        price: 5680,
        img: "https://shopping-phinf.pstatic.net/main_5681673/5681673560.20150128153149.jpg?type=f140",
      },
      {
        id: 8801043803691,
        text: "안성탕면 125Gx20`S",
        price: 19900,
        img: "https://shopping-phinf.pstatic.net/main_4536673/45366730319.1.jpg?type=f140",
      },
    ]
  );

  useEffect(() => {
    if (items) setItemList(items);
  }, [items]);

  return (
    <>
      {title && (
        <div style={{ width: "100%" }}>
          <MyText
            $font="bold24"
            $color={palette.gray.gray4}
            $margin="8px 0 6px 0"
          >
            {title}
          </MyText>
          <MyHr />
        </div>
      )}
      <MyFlexContainer
        $overflowX="auto"
        $gap="10px"
        $height="fit-content"
        $flexWrap="wrap"
      >
        {itemList.map((item: ItemData, idx) => (
          <ItemBox
            key={idx}
            preset="large"
            item={item}
            useIcon={true}
            buyCount={useCount ? idx + 3 : undefined}
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
    </>
  );
}

export default ItemList;
