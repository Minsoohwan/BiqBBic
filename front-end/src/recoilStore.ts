import { atom } from "recoil";

export const selectedMenuStore = atom<string>({
  key: "selectedMenu",
  default: "바코드검색",
});

export const currentItemStore = atom<ItemData | null>({
  key: "currentItem",
  default: null,
});

export const similerItemsStore = atom<ItemData[]>({
  key: "similerItems",
  default: [],
});

export const noDataStore = atom<boolean>({
  key: "noData",
  default: false,
});

interface modalGather {
  orderModal: boolean;
  customerServiceModal: boolean;
}
export const modalGatherStore = atom<modalGather>({
  key: "modalGatherStore",
  default: {
    orderModal: false,
    customerServiceModal: false,
  },
});

export const favoriteItemsStore = atom<ItemData[]>({
  key: "favoriteItems",
  default: [
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
  ],
});
