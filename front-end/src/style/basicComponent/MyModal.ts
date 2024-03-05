import styled from "styled-components";
import palette from "../palette";

export const Shadow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  -webkit-transform: translate3d(0, 0, 10px);
`;

export const PopupContent = styled.div`
  position: relative;
  padding: 25px;
  width: 800px;
  height: 650px;
  border-radius: 10px;
  background-color: ${palette.white};
  z-index: 100;
  -webkit-transform: translate3d(0, 0, 20px);
`;

export const CloesIcon = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  width: 24px;
  height: 24px;
  background-image: url("/asset/close.png");
  background-size: cover;
  cursor: pointer;
  z-index: 101;
  -webkit-transform: translate3d(0, 0, 21px);
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  width: 100%;
  height: 65px;
  background-color: ${palette.main.green};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
