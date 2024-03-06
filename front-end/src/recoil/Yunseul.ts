import { atom } from "recoil";

export const ysMenuState = atom<ysMenuType>({
  key: "ysMenuState",
  default: "홈",
});
