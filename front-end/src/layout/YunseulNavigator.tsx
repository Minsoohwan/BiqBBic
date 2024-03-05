import styled from "styled-components";
import YunseulSvg from "../asset/icons/yunseulLogo.svg";
import { ReactComponent as ClosetSvg } from "../asset/icons/closet.svg";
import palette from "../style/palette";
import { useRecoilState } from "recoil";
import { ysMenuState } from "../recoil/Yunseul";
import React from "react";

export const YunseulNavigator = () => {
  const menuList: ysMenuType[] = ["주문내역", "옷장", "홈", "상품 분류"];
  const [ysMenu, setYsMenu] = useRecoilState(ysMenuState);

  return (
    <Wrap>
      <Logo src={YunseulSvg} />
      <MenuWrap>
        {menuList.map((val: ysMenuType, index) => {
          return (
            <React.Fragment key={val}>
              <MenuBox
                $isActive={ysMenu === val}
                onClick={() => {
                  setYsMenu(val);
                }}
              >
                {val === "옷장" ? <ClosetSvg /> : val}
              </MenuBox>
              {val === "옷장" && <MenuLine />}
            </React.Fragment>
          );
        })}
      </MenuWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 110px;
  /* background-color: #d6d6ef; */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  cursor: pointer;
  position: relative;
`;

const MenuWrap = styled.div`
  margin: 55px auto auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2px;
`;

interface menuProps {
  $isActive: boolean;
}

const MenuBox = styled.div<menuProps>`
  width: 110px;
  height: 40px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${(props) => (props.$isActive ? palette.white : "")};
  color: ${(props) => (props.$isActive ? palette.black : palette.gray.gray4)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: bold;
  font-size: 20px;
  cursor: pointer;
`;

const MenuLine = styled.div`
  width: 90px;
  height: 1px;
  background-color: ${palette.gray.gray4};
  margin: 10px 0;
`;
