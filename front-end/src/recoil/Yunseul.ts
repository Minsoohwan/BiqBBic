import { atom } from "recoil";

export const ysMenuState = atom<ysMenuType>({
  key: "ysMenuState",
  default: "홈",
});

export const ysClosetListState = atom<string[]>({
  key: "ysClosetListState",
  default: ["jarket1"],
});
