import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { ysMenuState } from "../recoil/Yunseul";
import { useRecoilValue } from "recoil";
import { YunseulOrderMenu } from "../component/yunseulMenu/YunseulOrderMenu";
import { YunseulClosetMenu } from "../component/yunseulMenu/YunseulClosetMenu";
import { YunseulHomeMenu } from "../component/yunseulMenu/YunseulHomeMenu";
import { YunseulSortMenu } from "../component/yunseulMenu/YunseulSortMenu";

export const YunseulPage = () => {
  const ysMenu = useRecoilValue(ysMenuState);

  return (
    <MainLayout>
      {ysMenu === "주문내역" ? (
        <YunseulOrderMenu />
      ) : ysMenu === "옷장" ? (
        <YunseulClosetMenu />
      ) : ysMenu === "홈" ? (
        <YunseulHomeMenu />
      ) : (
        <YunseulSortMenu />
      )}
    </MainLayout>
  );
};
