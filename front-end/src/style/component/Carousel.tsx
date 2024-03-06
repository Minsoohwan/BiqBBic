import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import palette from "../palette";

function Carousel({ slides }: { slides: string[] }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <ImgContainer className="AASDF">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} style={{ width: "100%" }}>
            <img
              src={slide}
              alt={`slide_${idx}`}
              style={{ maxWidth: "100%", width: "100%" }}
            />
          </div>
        ))}
      </Slider>
    </ImgContainer>
  );
}

export default Carousel;

const ImgContainer = styled.div`
  width: 100%;

  .slick-dots {
    li.slick-active button:before {
      color: ${palette.main.green};
    }

    li {
      margin: 0;

      button {
        padding: 0;

        &::before {
          font-size: 10px;
          color: ${palette.main.green};
        }
      }
    }
  }
`;
