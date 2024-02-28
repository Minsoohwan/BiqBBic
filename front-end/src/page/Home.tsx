import { useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  currentItemStore,
  selectedMenuStore,
  similerItemsStore,
} from "../recoilStore";
import ItemList from "./ItemList";
import Carousel from "../style/component/Carousel";

function Home() {
  const setCurrentMenu = useSetRecoilState(selectedMenuStore);
  const setCurrentItem = useSetRecoilState(currentItemStore);
  const setSismilerItems = useSetRecoilState(similerItemsStore);

  const [homeItems, setHomeItems] = useState<ItemData[]>([
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
  ]);

  return (
    <>
      <Carousel
        slides={[
          "/asset/banner1.png",
          "/asset/banner2.png",
          "/asset/banner3.png",
        ]}
      />
      <ItemList title="오늘의 행사 상품" items={homeItems} />;
    </>
  );
}

export default Home;
