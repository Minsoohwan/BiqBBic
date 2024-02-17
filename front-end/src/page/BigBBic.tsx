import { ReactComponent as Logo } from "../asset/logo.svg";
import { ReactComponent as Heart } from "../asset/heart.svg";
import { ReactComponent as Phone } from "../asset/phone.svg";

import MyLayout from "../layout/MyLayout";

import palette from "../style/palette";
import {
  MyContainer,
  MyFlexContainer,
} from "../style/basicComponent/MyContainer";

import { Dispatch, useState } from "react";
import MyHr from "../style/basicComponent/MyHr";
import MyButton from "../style/basicComponent/MyButton";
import ItemBox from "../style/component/ItemBox";
import styled from "styled-components";
import MyText, { MyLinkText } from "../style/basicComponent/MyText";
import { formatPrice, handleFontStyle } from "../style/common";
import ItemCountBox from "../style/component/ItemCountBox";

function BigBBic() {
  const [currentMenu, setCurrentMenu] = useState("바코드검색");
  const [currentItem, setCurrentItem] = useState<any>({
    img: "/asset/alert.png",
    text: "신라면 30개입",
    price: 234500,
  });
  const [similerItems, setSimilerItems] = useState<any>([
    {
      img: "/asset/alert.png",
      text: "신라면 30개입",
      price: 234500,
    },
    {
      img: "/asset/alert.png",
      text: "신라면 30개입",
      price: 234500,
    },
    {
      img: "/asset/alert.png",
      text: "신라면 30개입",
      price: 234500,
    },
  ]);
  const [otherOptions, setotherOptions] = useState<any>([
    {
      img: "/asset/alert.png",
      text: "신라면 30개입",
      price: 234500,
    },
    {
      img: "/asset/alert.png",
      text: "신라면 30개입",
      price: 234500,
    },
    {
      img: "/asset/alert.png",
      text: "신라면 30개입",
      price: 234500,
    },
  ]);

  const [itemCount, setItemCount] = useState<number>(1);

  return (
    <MyLayout background="/asset/dashBoardBackground.png">
      <MyFlexContainer
        $height="100%"
        $backgroundColor={palette.main.green}
        $padding="15px 15px 15px 0"
        $gap="0"
      >
        <MyFlexContainer
          $flexDirection="column"
          $alignItems="center"
          $width="155px"
          $height="100%"
          $gap="55px"
        >
          <Logo />
          <MyFlexContainer
            $flexGrow="1"
            $flexDirection="column"
            $alignItems="center"
            $gap="0"
          >
            <Menu
              currentMenu={currentMenu}
              setCurrentMenu={setCurrentMenu}
              data={{ text: "주문내역" }}
            />
            <MyContainer
              $textAlign="center"
              $padding="8px"
              $backgroundColor={currentMenu === "heart" ? palette.white : ""}
              $cursor="pointer"
              onClick={() => {
                setCurrentMenu("heart");
              }}
            >
              <Heart
                className={
                  currentMenu === "heart" ? "heart-green" : "heart-white"
                }
              />
            </MyContainer>
            <MyContainer $padding="8px">
              <MyHr $backgroundColor={palette.white} />
            </MyContainer>

            {[
              { text: "바코드검색" },
              { text: "홈" },
              { text: "다시 주문" },
              { text: "상품 분류" },
            ].map((data) => (
              <Menu
                key={data.text}
                currentMenu={currentMenu}
                setCurrentMenu={setCurrentMenu}
                data={data}
              />
            ))}
          </MyFlexContainer>
          <CallButton>
            <MyFlexContainer
              $alignContent="center"
              $gap="0"
              $color={palette.white}
            >
              <Phone />
              원격상담
            </MyFlexContainer>
          </CallButton>
        </MyFlexContainer>
        <MyFlexContainer
          $flex-grow="1"
          $flexDirection="column"
          $backgroundColor={palette.white}
          $height="100%"
          $padding="25px"
          $overflow="scroll"
        >
          {(currentMenu === "홈" || currentMenu === "바코드검색") && (
            <MyFlexContainer $justifyContent="center" $alignItems="center">
              <SearchPanel $width="100%">
                <SearchBox placeholder="검색어 또는 바코드 숫자를 입력해주세요." />
                <SearchIcon />
              </SearchPanel>
            </MyFlexContainer>
          )}
          {currentItem ? (
            <MyFlexContainer $gap="20px">
              <ItemBox preset="xlarge" img={currentItem.img} />
              <MyFlexContainer
                $flexDirection="column"
                $gap="8px"
                $height="100%"
              >
                <MyText $font="bold24">{currentItem.text}</MyText>
                <MyText $font="bold28" $color={palette.main.blue}>
                  {formatPrice(currentItem.price)}
                </MyText>
                <MyText $font="regular20" $margin="12px 0 0 0 " $flexGrow="1">
                  원산지 :
                  <MyLinkText
                    $font="regular20"
                    $color={palette.main.green}
                    $margin="0 0 0 7px"
                  >
                    상품 상세설명 참조
                  </MyLinkText>
                </MyText>
                <MyFlexContainer $flexDirection="column">
                  <MyFlexContainer
                    $justifyContent="space-between"
                    $alignItems="center"
                  >
                    <ItemCountBox count={itemCount} setCount={setItemCount} />
                    <MyFlexContainer $alignItems="flex-end">
                      <MyText $font="bold20" $color={palette.green.green4}>
                        총
                      </MyText>
                      <MyText $font="title32" $color={palette.green.green4}>
                        {formatPrice(currentItem.price * itemCount)}
                      </MyText>
                    </MyFlexContainer>
                  </MyFlexContainer>
                  <MyButton
                    $font="bold20"
                    $backgroundColor="orange"
                    $size="large"
                    $alignSelf="flex-end"
                  >
                    장바구니 담기
                  </MyButton>
                </MyFlexContainer>
              </MyFlexContainer>
            </MyFlexContainer>
          ) : (
            <MyFlexContainer
              $flexGrow="1"
              $font="title32"
              $flexDirection="column"
              $alignItems="center"
              $margin="150px 0 0 0"
            >
              <img src="/asset/barcode-scanner.png" />
              바코드 검색은 바코드를 리더기에 스캔해주세요.
            </MyFlexContainer>
          )}
          <MyHr />
          <MyFlexContainer $flexDirection="column" $gap="10px">
            <MyText $font="bold16" $color={palette.gray.gray4}>
              동일 상품 다른 옵션
            </MyText>
            <MyFlexContainer>
              {otherOptions.map((item: Item) => (
                <ItemBox
                  preset="small"
                  img={item.img}
                  useIcon={true}
                  text={item.text}
                  price={item.price}
                />
              ))}
            </MyFlexContainer>
          </MyFlexContainer>
          <MyHr />
          <MyFlexContainer $flexDirection="column" $gap="10px">
            <MyText $font="bold16" $color={palette.gray.gray4}>
              비슷한 상품
            </MyText>
            <MyFlexContainer>
              {otherOptions.map((item: Item) => (
                <ItemBox
                  preset="small"
                  img={item.img}
                  useIcon={true}
                  text={item.text}
                  price={item.price}
                />
              ))}
            </MyFlexContainer>
          </MyFlexContainer>
        </MyFlexContainer>
        <MyFlexContainer
          $flex-grow="1"
          $flexDirection="column"
          $width="16.6%"
          $height="100%"
          $backgroundColor={palette.white}
          $margin="0 0 0 10px"
        >
          asdfasfdsa
        </MyFlexContainer>
      </MyFlexContainer>
    </MyLayout>
  );
}

export default BigBBic;

const CallButton = styled.button`
  ${handleFontStyle("regular14")};
  align-items: center;
  padding: 10px 5px;
  background-color: rgba(23, 29, 54, 0.85);
  border-radius: 10px;
`;

const SearchPanel = styled(MyFlexContainer)`
  position: relative;
  width: 62.5%;
`;

const SearchBox = styled.input`
  ${handleFontStyle("regular20")};
  width: 100%;
  height: 41px;
  padding-inline-start: 15px;
  border: 1px solid ${palette.main.green};
  border-radius: 5px;
  opacity: 80%;

  &:focus {
    background-color: ${palette.green.green1};
    outline: none;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-image: url("/asset/search.png");
  background-repeat: no-repeat;
  background-size: contain;

  cursor: pointer;
`;

function Menu({
  currentMenu,
  setCurrentMenu,
  data,
}: {
  currentMenu: string;
  setCurrentMenu: Dispatch<React.SetStateAction<string>>;
  data: { text: string };
}) {
  return (
    <MyContainer
      $color={currentMenu === data.text ? palette.green.green4 : palette.white}
      $font="bold20"
      $width="100%"
      $textAlign="center"
      $padding="8px"
      $borderRadius="5px 0px 0px 5px"
      $backgroundColor={currentMenu === data.text ? palette.white : ""}
      $cursor="pointer"
      onClick={() => {
        setCurrentMenu(data.text);
      }}
    >
      {data.text}
    </MyContainer>
  );
}
