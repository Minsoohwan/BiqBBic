import { atom } from "recoil";

export const selectedMenuStore = atom<string>({
  key: "selectedMenu",
  default: "바코드검색",
});

export const currentItemStore = atom<ItemData | null>({
  key: "currentItem",
  default: null,
});
