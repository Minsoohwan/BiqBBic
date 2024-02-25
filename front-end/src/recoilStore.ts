import { atom } from "recoil";

export const selectedMenuStore = atom<string>({
  key: "selectedMenu",
  default: "바코드검색",
});

export const currentItemStore = atom<ItemData | "검색 결과 없음" | null>({
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
