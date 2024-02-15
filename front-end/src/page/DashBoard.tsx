import MyLayout from "../layout/MyLayout";

import palette from "../style/palette";

import {
  MyContainer,
  MyFlexContainer,
} from "../style/basicComponent/MyContainer";
import MyCircle from "../style/basicComponent/MyCircle";
import MyText from "../style/basicComponent/MyText";
import MyHr from "../style/basicComponent/MyHr";
import MyButton from "../style/basicComponent/MyButton";
import { useState } from "react";

function LinkItem({ text1, text2 }: Record<string, string>) {
  const [fontType, setFontType] = useState<FontType>("regular16");

  return (
    <MyFlexContainer $alignItems="center">
      <MyCircle
        $width="75px"
        $height="75px"
        $backgroundColor={palette.blue.blue1}
      />
      <MyFlexContainer
        $width="100px"
        $flexShrink="0"
        $font="bold24"
        $alignItems="center"
      >
        {text1}
      </MyFlexContainer>
      <MyContainer $width="fit-content" $flexGrow="1">
        {text2}
      </MyContainer>
      <MyButton
        $font={fontType}
        onMouseDown={() => {
          setFontType("bold16");
        }}
        onMouseUp={() => {
          setFontType("regular16");
        }}
      >
        바로가기
      </MyButton>
    </MyFlexContainer>
  );
}

function DashBoard() {
  return (
    <MyLayout background="/asset/dashBoardBackground.png">
      <MyFlexContainer
        $flexDirection="column"
        $width="53.7%"
        $padding="20px"
        $opacity="80%"
        $gap="15px"
      >
        <LinkItem text1="빅삑" text2="바코드 쇼핑" />
        <MyHr />
        <LinkItem text1="홈닥터" text2="비대면 진료" />
        <MyHr />
        <LinkItem text1="메일케어" text2="하루 건강 체크" />
      </MyFlexContainer>
    </MyLayout>
  );
}

export default DashBoard;
