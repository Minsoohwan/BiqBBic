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
