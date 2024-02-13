import MyButton from "../component/MyButton";
import MyLayout from "../layout/MyLayout";

import styled from "styled-components";
import palette from "../style/palette";
import { ReactComponent as Background } from "../asset/background/mainBackground.svg";

type BackGroundProps = {
  width?: string;
  height?: string;
  padding?: string | number;
  backgroundColor?: string;
  opacity?: string;
};

const Container = styled.div<BackGroundProps>`
  width: ${(props) => props.width ?? "fit-content"};
  height: ${(props) => props.height ?? "fit-content"};
  background-color: ${(props) => props.backgroundColor ?? palette.white};
  padding: ${(props) => props.padding ?? 20};
  opacity: ${(props) => props.opacity ?? "80%"};
`;

function DashBoard() {
  return (
    <MyLayout>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: 'url("../asset/background/mainBackground.svg")',
        }}
      >
        {/* //   <Background style={{ width: "100%", height: "100%" }}> */}
        <Container width="550px" height="320px">
          {/* <MyButton content="바로가기" /> */}
        </Container>
      </div>
      {/* </Background> */}
    </MyLayout>
  );
}

export default DashBoard;
