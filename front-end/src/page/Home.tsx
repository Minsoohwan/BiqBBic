import { useState } from "react";
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

function Home() {
  const setCurrentMenu = useSetRecoilState(selectedMenuStore);
  const setCurrentItem = useSetRecoilState(currentItemStore);
  const setSismilerItems = useSetRecoilState(similerItemsStore);

  const [favoriteItems, setFavoriteItems] = useState<ItemData[]>([
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
  ]);

  return (
    <>
      <MyText $font="bold16" $color={palette.gray.gray4}>
        오늘의 행사 상품
      </MyText>
      <MyFlexContainer
        $overflowX="auto"
        $gap="10px"
        $flexGrow="1"
        $height="100%"
        $flexWrap="wrap"
      >
        {favoriteItems.map((item: ItemData) => (
          <ItemBox
            key={item.id}
            preset="large"
            img={item.img}
            useIcon={true}
            text={item.text}
            price={item.price}
            onClick={() => {
              setCurrentItem(item);
              setCurrentMenu("바코드검색");
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

export default Home;
