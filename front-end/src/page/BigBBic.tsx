import { ReactComponent as Logo } from "../asset/logo.svg";
import { ReactComponent as Heart } from "../asset/heart.svg";
import { ReactComponent as Phone } from "../asset/phone.svg";
import { ReactComponent as Trash } from "../asset/trash.svg";
import { ReactComponent as ArrowLeft } from "../asset/arrowLeft.svg";

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
  loadingStore,
  modalGatherStore,
  noDataStore,
  searchResultStore,
  selectedMenuStore,
  similerItemsStore,
} from "../recoilStore";
import Favorite from "./Favorite";
import Home from "./Home";
import ItemList from "./ItemList";
import BillPopup from "../style/component/BillPopup";
import BarcodeFetcher from "../barcode/BarcodeFetcher";
import Information from "../style/component/Information";
import { useNavigate } from "react-router";
import EmptyVSpace from "../style/basicComponent/EmptyVSpace";
import { CustomerServiceModal } from "../style/component/CustomerServiceModal";
import { ItemSort } from "./ItemSort";
import LoadPanel from "../style/component/LoadPanel";

function BigBBic() {
  const nav = useNavigate();

  const [isLoading, setLoading] = useRecoilState(loadingStore);

  const [infoVisible, setInfoVisible] = useState(true);

  const [currentMenu, setCurrentMenu] = useRecoilState(selectedMenuStore);
  const [currentItem, setCurrentItem] = useRecoilState(currentItemStore);
  const [similerItems, setSismilerItems] = useRecoilState(similerItemsStore);
  const [searchResult, setSearchResult] = useRecoilState(searchResultStore);

  const [itemCount, setItemCount] = useState<number>(1);

  const [toBuyList, setToBuyList] = useState<any>([]);

  const [currentSelectedItems, setCurrentSelectedItems] = useState<
    Record<string, true>
  >({});

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [modalGather, setModalGather] = useRecoilState(modalGatherStore);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  const searchRef = useRef<HTMLInputElement>(null);

  function searchItems(value: string | number) {
    if (currentMenu == "주문내역") return;

    if (isNaN(Number(value))) {
      setLoading(true);
      BarcodeFetcher.getItems(value)
        .then(({ data: items }) => {
          if (items === "검색 결과 없음") {
            setSearchResult("검색 결과 없음");
            setCurrentMenu("검색");
            return;
          }

          setCurrentItem(null);
          setCurrentMenu("검색");
          setSearchResult(items);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      BarcodeFetcher.getItemData(value)
        .then(({ data }) => {
          if (data === "검색 결과 없음") {
            setSearchResult("검색 결과 없음");
            setCurrentMenu("검색");
            return;
          }

          setCurrentItem(data.item);
          setCurrentMenu("검색");
          setSismilerItems(data.similerItems);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    let price = 0;

    toBuyList.forEach((item: any) => {
      if (item.id in currentSelectedItems) price += item.price * item.itemCount;
    });

    setTotalPrice(price);
  }, [toBuyList, currentSelectedItems]);

  useEffect(() => {
    if (currentItem) {
      setItemCount(1);
      setCurrentMenu("상품");
    }
  }, [currentItem]);

  useEffect(() => {
    setCurrentMenu("바코드검색");
    setCurrentItem(null);
  }, []);

  return (
    <MyFlexContainer
      $position="relative"
      $width="100vw"
      $height="100vh"
      $backgroundColor={palette.main.green}
      $padding="15px 15px 15px 0"
      $gap="0"
    >
      {infoVisible && <Information setPopupVisible={setInfoVisible} />}
      <MyFlexContainer
        $flexDirection="column"
        $alignItems="center"
        $flexShrink="0"
        $width="110px"
        $height="100%"
        $gap="55px"
      >
        <Logo
          style={{ cursor: "pointer" }}
          onClick={() => {
            setCurrentMenu("바코드검색");
          }}
        />
        <MyFlexContainer
          $flexGrow="1"
          $flexDirection="column"
          $alignItems="center"
          $gap="3px"
          $borderRadius="0"
        >
          <Menu data={{ text: "주문내역" }} setSearchResult={setSearchResult} />
          <MyContainer
            $textAlign="center"
            $padding="8px"
            $backgroundColor={currentMenu === "heart" ? palette.white : ""}
            $cursor="pointer"
            $borderRadius="5px 0 0 5px"
            onClick={() => {
              setCurrentMenu("heart");
              setSearchResult([]);
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
              data={data}
              setSearchResult={setSearchResult}
            />
          ))}
        </MyFlexContainer>
        <ButtonContainer>
          <CallButton
            onClick={() => {
              setModalGather({ ...modalGather, customerServiceModal: true });
            }}
          >
            <MyFlexContainer
              $alignContent="center"
              $gap="0"
              $color={palette.white}
            >
              <Phone />
              원격상담
            </MyFlexContainer>
          </CallButton>
          <BackButton
            onClick={() => {
              nav(-1);
            }}
          >
            <MyFlexContainer
              $alignContent="center"
              $justifyContent="center"
              $gap="0"
              $color={palette.white}
            >
              <div>
                <ArrowLeft />
              </div>
              뒤로가기
            </MyFlexContainer>
          </BackButton>
        </ButtonContainer>
      </MyFlexContainer>
      <ItemContainer>
        {(currentMenu === "홈" ||
          currentMenu === "바코드검색" ||
          currentMenu === "상품 분류" ||
          currentMenu === "검색" ||
          currentMenu === "상품" ||
          currentMenu === "주문내역") && (
          <MyFlexContainer
            $justifyContent="center"
            $alignItems="center"
            $flexShrink="0"
          >
            <SearchPanel $width="100%">
              <SearchBox
                ref={searchRef}
                placeholder={
                  currentMenu === "주문내역"
                    ? "주문한 상품을 검색할 수 있어요"
                    : "검색어 또는 바코드 숫자를 입력해주세요."
                }
                onKeyUp={(e) => {
                  if (e.key !== "Enter") return;

                  if (searchRef.current) searchItems(searchRef.current.value);
                }}
              />
              <SearchIcon
                onClick={() => {
                  if (searchRef.current) searchItems(searchRef.current.value);
                }}
              />
            </SearchPanel>
          </MyFlexContainer>
        )}
        {currentMenu == "주문내역" && (
          <MyContainer
            $height="100%"
            $width="100%"
            $backgroundImage="asset/orderment.png"
            $backgroundPosition="center"
            $backgroundSize="contain"
            $backgroundRepeat="no-repeat"
          />
        )}
        {currentMenu == "검색" && Array.isArray(searchResult) && (
          <ItemList title="검색 결과" items={searchResult} />
        )}
        {currentMenu === "바코드검색" && (
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
        {currentMenu === "상품" && currentItem && (
          <>
            <MyFlexContainer $gap="20px">
              <ItemBox
                preset="xlarge"
                item={currentItem}
                imgOnly={true}
                useIcon={true}
              />
              <MyFlexContainer
                $flexDirection="column"
                $gap="8px"
                $height="280px"
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
                          formatPrice(currentItem.price * itemCount).length >=
                          10
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
              <MyText $font="bold24" $color={palette.gray.gray4}>
                비슷한 상품
              </MyText>
              <MyFlexContainer $overflowX="auto" $flexGrow="1">
                {similerItems.map((item: ItemData, idx: number) => (
                  <ItemBox
                    key={idx}
                    preset="small"
                    item={item}
                    useIcon={true}
                    onClick={() => {
                      setCurrentItem(item);
                      setCurrentMenu("바코드검색");
                      setSismilerItems([]);
                      setLoading(true);
                      BarcodeFetcher.getItems(item.text)
                        .then(({ data: items }) => {
                          if (items === "검색 결과 없음") {
                            setSismilerItems([]);
                            return;
                          }

                          setSismilerItems(items);
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    }}
                  />
                ))}
              </MyFlexContainer>
            </MyFlexContainer>
          </>
        )}
        {searchResult === "검색 결과 없음" && currentItem === null && (
          <MyFlexContainer
            $flexGrow="1"
            $font="title32"
            $flexDirection="column"
            $alignItems="center"
            $margin="150px 0 0 0"
          >
            검색 결과가 없습니다.
          </MyFlexContainer>
        )}

        {currentMenu === "heart" && <Favorite />}
        {currentMenu === "홈" && <Home />}
        {currentMenu === "다시 주문" && (
          <ItemList title="자주 구매한 상품 다시 구매하기" useCount={true} />
        )}
        {currentMenu === "상품 분류" && <ItemSort />}
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
        $borderRadius="10px"
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
          {toBuyList.map((item: ToBuyItem, idx: number) => (
            <>
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
                    if (e.target.checked) currentSelectedItems[item.id] = true;
                    else delete currentSelectedItems[item.id];

                    setCurrentSelectedItems({ ...currentSelectedItems });
                  }}
                />
                <ItemBox
                  preset="small"
                  item={{
                    id: item.id,
                    img: item.img,
                    text: item.text,
                    price: item.price,
                  }}
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
              {idx !== toBuyList.length - 1 && <MyHr />}
            </>
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
              $font={
                formatPrice(totalPrice).length >= 10 ? "title20" : "title24"
              }
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
              setModalGather({ ...modalGather, orderModal: true });
            }}
          >
            주문
          </MyButton>
        </MyFlexContainer>
      </MyFlexContainer>

      <BillPopup
        items={toBuyList.filter(
          (item: ToBuyItem) => item.id in currentSelectedItems
        )}
      />
      <CustomerServiceModal />
      {isLoading && <LoadPanel />}
    </MyFlexContainer>
  );
}

export default BigBBic;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const CallButton = styled.button`
  ${handleFontStyle("regular14")};
  align-items: center;
  padding: 10px 5px;
  background-color: ${palette.sub.orange};
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

const BackButton = styled(CallButton)`
  background-color: rgba(23, 29, 54, 0.85);
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
  align-items: flex-start;
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
  data,
  setSearchResult,
}: {
  data: { text: string };
  setSearchResult: Dispatch<
    React.SetStateAction<ItemData[] | "검색 결과 없음">
  >;
}) {
  const [currentMenu, setCurrentMenu] = useRecoilState(selectedMenuStore);

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
        setSearchResult([]);
      }}
    >
      {data.text}
    </MyContainer>
  );
}
