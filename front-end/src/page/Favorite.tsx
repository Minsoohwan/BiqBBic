import { useState } from "react";
import MyButton from "../style/basicComponent/MyButton";
import { MyFlexContainer } from "../style/basicComponent/MyContainer";
import MyHr from "../style/basicComponent/MyHr";
import MyText, { MyLinkText } from "../style/basicComponent/MyText";
import { formatPrice } from "../style/common";
import ItemBox from "../style/component/ItemBox";
import ItemCountBox from "../style/component/ItemCountBox";
import palette from "../style/palette";

function Favorite() {
  const [favoriteItems, setFavoriteItems] = useState<ItemData[]>([
    {
      id: 8809009575717,
      text: "해물탕(소)",
      price: 29000,
      img: "https://shopping-phinf.pstatic.net/main_4336937/43369377475.jpg?type=f140",
    },
    {
      id: 8809105572038,
      text: "오색약수골 고추장",
      price: 30000,
      img: "https://shopping-phinf.pstatic.net/main_1275918/12759189177.jpg?type=f140",
    },
    {
      id: 8809360172523,
      text: "황금빛하늘내린황태포5미270g",
      price: 29940,
      img: "https://shopping-phinf.pstatic.net/main_3024583/30245830907.jpg?type=f140",
    },
    {
      id: 8801075001327,
      text: "사조 고등어 400g",
      price: 2990,
      img: "https://shopping-phinf.pstatic.net/main_4065781/40657813223.1.jpg?type=f140",
    },
    {
      id: 8801016350996,
      text: "브데)땅콩샌드",
      price: 5350,
      img: "https://shopping-phinf.pstatic.net/main_8293183/8293183212.20150212121503.jpg?type=f140",
    },
  ]);

  return (
    <>
      <MyText $font="bold24" $color={palette.gray.gray4}>
        '좋아요'가 눌린 상품 목록
      </MyText>
      <MyHr />
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
            favorite={true}
          />
        ))}
      </MyFlexContainer>
    </>
  );
}

export default Favorite;
