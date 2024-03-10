import Carousel from "../../style/component/Carousel";
import { ProductBox } from "../yunseulUnits/ProductBox";
import { SearchBox } from "../yunseulUnits/SearchBox";
import jarket1 from "../../asset/cloth/jarket1.png";
import styled from "styled-components";

export const YunseulHomeMenu = () => {
  return (
    <>
      <SearchBox $placeholder="검색어를 입력해주세요." />
      <Carousel
        slides={[
          "/asset/ysBanner1.png",
          "/asset/ysBanner3.png",
          "/asset/ysBanner2.png",
        ]}
      />
      <ProductWrap>
        <ProductBox
          $clothKey="jarket1"
          $boxType="large"
          $brand="화사한봄"
          $title="코랄 누빔 자켓"
          $price={172000}
          $src={jarket1}
          $useage="home"
        />
        <ProductBox
          $clothKey="jarket1"
          $boxType="large"
          $brand="화사한봄"
          $title="코랄 누빔 자켓"
          $price={172000}
          $src={jarket1}
          $useage="home"
        />
        <ProductBox
          $clothKey="jarket1"
          $boxType="large"
          $brand="화사한봄"
          $title="코랄 누빔 자켓 코랄 누빔 자켓 코랄 누빔 자켓 코랄 누빔 자켓코랄 누빔 자켓"
          $price={172000}
          $src={jarket1}
          $useage="home"
        />
        <ProductBox
          $clothKey="jarket1"
          $boxType="large"
          $brand="화사한봄"
          $title="코랄 누빔 자켓"
          $price={172000}
          $src={jarket1}
          $useage="home"
        />
        <ProductBox
          $clothKey="jarket1"
          $boxType="large"
          $brand="화사한봄"
          $title="코랄 누빔 자켓"
          $price={172000}
          $src={jarket1}
          $useage="home"
        />
      </ProductWrap>
    </>
  );
};

const ProductWrap = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: flex-start; */
  flex-wrap: wrap;
  position: relative;
  gap: 20px;
  margin-top: 40px;
`;
