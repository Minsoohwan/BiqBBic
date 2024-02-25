import { ReactComponent as Logo } from "../asset/logo.svg";
import { ReactComponent as Heart } from "../asset/heart.svg";
import { ReactComponent as Phone } from "../asset/phone.svg";
import { ReactComponent as Trash } from "../asset/trash.svg";

import MyLayout from "../layout/MyLayout";

import palette from "../style/palette";
import {
  MyContainer,
  MyFlexContainer,
} from "../style/basicComponent/MyContainer";

import { Dispatch, useEffect, useRef, useState } from "react";
import MyHr from "../style/basicComponent/MyHr";
import MyButton from "../style/basicComponent/MyButton";
import ItemBox from "../style/component/ItemBox";
import styled from "styled-components";
import MyText, { MyLinkText } from "../style/basicComponent/MyText";
import { formatPrice, handleFontStyle } from "../style/common";
import ItemCountBox from "../style/component/ItemCountBox";
import { useRecoilState } from "recoil";
import {
  currentItemStore,
  noDataStore,
  selectedMenuStore,
  similerItemsStore,
} from "../recoilStore";
import Favorite from "./Favorite";
import Home from "./Home";
import ItemList from "./ItemList";
import BillPopup from "../style/component/BillPopup";
import BarcodeFetcher from "../barcode/BarcodeFetcher";

function BigBBic() {
  const [currentMenu, setCurrentMenu] = useRecoilState(selectedMenuStore);
  const [currentItem, setCurrentItem] = useRecoilState(currentItemStore);
  const [isNoData, setisNoData] = useRecoilState(noDataStore);
  const [similerItems, setSismilerItems] = useRecoilState(similerItemsStore);

  const [searchResult, setSearchResult] = useState<ItemData[]>([]);

  const [itemCount, setItemCount] = useState<number>(1);

  const [toBuyList, setToBuyList] = useState<any>([]);

  const [currentSelectedItems, setCurrentSelectedItems] = useState<
    Record<string, true>
  >({});

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let price = 0;

    toBuyList.forEach((item: any) => {
      if (item.id in currentSelectedItems) price += item.price * item.itemCount;
    });

    setTotalPrice(price);
  }, [toBuyList, currentSelectedItems]);

  useEffect(() => {
    setItemCount(1);
  }, [currentItem]);

  return (
    <MyFlexContainer
      $position="relative"
      $width="100vw"
      $height="100vh"
      $backgroundColor={palette.main.green}
      $padding="15px 15px 15px 0"
      $gap="0"
    >
      <MyFlexContainer
        $flexDirection="column"
        $alignItems="center"
        $flexShrink="0"
        $width="110px"
        $height="100%"
        $gap="55px"
      >
        <Logo />
        <MyFlexContainer
          $flexGrow="1"
          $flexDirection="column"
          $alignItems="center"
          $gap="3px"
          $borderRadius="0"
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
            $borderRadius="5px 0 0 5px"
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
      <ItemContainer>
        {(currentMenu === "홈" || currentMenu === "바코드검색") && (
          <MyFlexContainer
            $justifyContent="center"
            $alignItems="center"
            $flexShrink="0"
          >
            <SearchPanel $width="100%">
              <SearchBox
                ref={searchRef}
                placeholder="검색어 또는 바코드 숫자를 입력해주세요."
              />
              <SearchIcon
                onClick={() => {
                  if (searchRef.current) {
                    if (isNaN(Number(searchRef.current.value))) {
                      BarcodeFetcher.getItems(searchRef.current.value).then(
                        ({ data: items }) => {
                          if (items === "검색 결과 없음") {
                            return;
                          }

                          setCurrentItem(null);
                          setSearchResult(items);
                        }
                      );
                    } else {
                      BarcodeFetcher.getItemData(searchRef.current.value).then(
                        ({ data }) => {
                          if (data === "검색 결과 없음") {
                            return;
                          }

                          setCurrentItem(data.item);
                          setSismilerItems(data.similerItems);
                        }
                      );
                    }
                  }
                }}
              />
            </SearchPanel>
          </MyFlexContainer>
        )}
        {currentMenu === "바코드검색" && (
          <>
            {currentItem && currentItem !== "검색 결과 없음" ? (
              <>
                <MyFlexContainer $gap="20px">
                  <ItemBox
                    preset="xlarge"
                    img={currentItem.img}
                    useIcon={true}
                  />
                  <MyFlexContainer
                    $flexDirection="column"
                    $gap="8px"
                    $height="100%"
                  >
                    <MyText $font="bold24">{currentItem.text}</MyText>
                    <MyText $font="bold28" $color={palette.main.blue}>
                      {formatPrice(currentItem.price)}
                    </MyText>
                    <MyText
                      $font="regular20"
                      $margin="12px 0 0 0 "
                      $flexGrow="1"
                    >
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
                        <ItemCountBox
                          count={itemCount}
                          setCount={setItemCount}
                        />
                        <MyFlexContainer
                          $alignItems="flex-end"
                          $justifyContent="flex-end"
                          $flexGrow="1"
                        >
                          <MyText $font="bold20" $color={palette.green.green4}>
                            총
                          </MyText>
                          <MyText
                            $font={
                              formatPrice(currentItem.price * itemCount)
                                .length >= 10
                                ? "title24"
                                : "title32"
                            }
                            $color={palette.green.green4}
                          >
                            {formatPrice(currentItem.price * itemCount)}
                          </MyText>
                        </MyFlexContainer>
                      </MyFlexContainer>
                      <MyButton
                        $font="bold20"
                        $backgroundColor="orange"
                        $size="large"
                        $alignSelf="flex-end"
                        onClick={() => {
                          const list = [...toBuyList];

                          const alreadySelectedItem = list.find(
                            (item) => item.id == currentItem.id
                          );
                          if (alreadySelectedItem)
                            alreadySelectedItem.itemCount += itemCount;
                          else list.push({ ...currentItem, itemCount });
                          setToBuyList(list);

                          const selectedItems = {
                            ...currentSelectedItems,
                          };
                          selectedItems[currentItem.id] = true;
                          setCurrentSelectedItems(selectedItems);
                        }}
                      >
                        장바구니 담기
                      </MyButton>
                    </MyFlexContainer>
                  </MyFlexContainer>
                </MyFlexContainer>
                <MyHr />
                <MyFlexContainer $flexDirection="column" $gap="10px">
                  <MyText $font="bold16" $color={palette.gray.gray4}>
                    비슷한 상품
                  </MyText>
                  <MyFlexContainer $overflowX="auto" $flexGrow="1">
                    {similerItems.map((item: ItemData, idx: number) => (
                      <ItemBox
                        key={idx}
                        preset="small"
                        img={item.img}
                        useIcon={true}
                        text={item.text}
                        price={item.price}
                      />
                    ))}
                  </MyFlexContainer>
                </MyFlexContainer>
              </>
            ) : currentItem === "검색 결과 없음" ? (
              <MyFlexContainer
                $flexGrow="1"
                $font="title32"
                $flexDirection="column"
                $alignItems="center"
                $margin="150px 0 0 0"
              >
                검색 결과가 없습니다.
              </MyFlexContainer>
            ) : searchResult.length != 0 ? (
              <ItemList title="검색 결과" items={searchResult} />
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
          </>
        )}
        {currentMenu == "heart" && <Favorite />}
        {currentMenu == "홈" && <Home />}
        {currentMenu == "다시 주문" && <ItemList />}
      </ItemContainer>
      <MyFlexContainer
        $flexShrink="0"
        $flexDirection="column"
        $width="170px"
        $height="100%"
        $backgroundColor={palette.white}
        $padding="25px 10px"
        $margin="0 0 0 10px"
        $alignItems="center"
        $gap="6px"
      >
        <MyText $font="title32" $color={palette.green.green4}>
          장바구니
        </MyText>
        <MyHr />
        <MyFlexContainer
          $flexDirection="column"
          $flexGrow="1"
          $overflowY="auto"
          $alignItems="center"
          $borderRadius="0px"
        >
          {toBuyList.map((item: ToBuyItem) => (
            <MyFlexContainer
              key={item.id}
              $position="relative"
              $gap="5px"
              $borderRadius="0px"
              $flexShrink="0"
            >
              <input
                type="checkbox"
                checked={item.id in currentSelectedItems}
                onChange={(e) => {
                  console.log(e.target.checked);
                  if (e.target.checked) currentSelectedItems[item.id] = true;
                  else delete currentSelectedItems[item.id];

                  setCurrentSelectedItems({ ...currentSelectedItems });
                }}
              />
              <ItemBox
                preset="small"
                img={item.img}
                text={item.text}
                price={item.price}
                useCount={true}
                itemCount={item.itemCount}
                onCountChanged={(count) => {
                  item.itemCount = count;

                  setToBuyList([...toBuyList]);
                }}
              />
              <MyContainer
                $position="absolute"
                $right="0"
                $bottom="0"
                $width="fit-content"
                $height="17px"
                $cursor="pointer"
                $overflowY="hidden"
                onClick={() => {
                  const list = [...toBuyList];
                  toBuyList.forEach((toBuyItem: ToBuyItem, idx: number) => {
                    if (toBuyItem.id == item.id) list.splice(idx, 1);
                  });
                  setToBuyList(list);

                  const selectedItems = { ...currentSelectedItems };
                  delete selectedItems[item.id];
                  setCurrentSelectedItems(selectedItems);
                }}
              >
                <Trash height="17" />
              </MyContainer>
            </MyFlexContainer>
          ))}
        </MyFlexContainer>
        <MyFlexContainer $flexDirection="column" $gap="4px" $flexShrink="0">
          <MyFlexContainer
            $flexDirection="column"
            $alignItems="flex-end"
            $borderRadius="0px"
            $height="52px"
            $gap="4px"
            $overflowY="hidden"
          >
            <MyText $font="bold20" $color={palette.green.green4}>
              선택상품 총액
            </MyText>
            <MyText
              $font={formatPrice(totalPrice).length >= 10 ? "bold20" : "bold24"}
              $color={palette.green.green4}
            >
              {formatPrice(totalPrice)}
            </MyText>
          </MyFlexContainer>
          <MyButton
            $font="bold20"
            $size="medium"
            $backgroundColor="orange"
            $disabled={toBuyList.length === 0}
            onClick={() => {
              setPopupVisible(true);
            }}
          >
            주문
          </MyButton>
        </MyFlexContainer>
      </MyFlexContainer>
      {popupVisible && (
        <BillPopup
          items={toBuyList.filter(
            (item: ToBuyItem) => item.id in currentSelectedItems
          )}
          setPopupVisible={setPopupVisible}
        />
      )}
    </MyFlexContainer>
  );
}

export default BigBBic;

const CallButton = styled.button`
  ${handleFontStyle("regular14")};
  align-items: center;
  padding: 10px 5px;
  background-color: rgba(23, 29, 54, 0.85);
  border-radius: 10px;
  cursor: pointer;
`;

const SearchPanel = styled(MyFlexContainer)`
  position: relative;
  width: 62.5%;
  border-radius: 0;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 20px;
  background-color: ${palette.white};
  height: 100%;
  padding: 25px;
  border-radius: 10px;
  overflow: scroll;
`;

const SearchBox = styled.input`
  ${handleFontStyle("regular20")};
  width: 100%;
  height: 41px;
  padding: 8px 32px 8px 15px;
  border: 1px solid ${palette.main.green};
  border-radius: 5px;

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
      $padding="8px 0"
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
