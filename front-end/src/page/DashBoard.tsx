import { ReactComponent as Calendar } from "../asset/todo/calendar.svg";

import MyLayout from "../layout/MyLayout";

import palette from "../style/palette";
import {
  MyContainer,
  MyFlexContainer,
} from "../style/basicComponent/MyContainer";
import MyCircle from "../style/basicComponent/MyCircle";
import MyButton from "../style/basicComponent/MyButton";

import { useEffect, useState } from "react";
import MyText from "../style/basicComponent/MyText";
import { getTimeCount } from "../style/common";

// TODO 20240215
// 반응형 구현
function DashBoard() {
  let currentTime = new Date().getTime();
  const pastTime = 1708005362953;

  const [stillnessTime, setStillnessTime] = useState<string>(
    getTimeCount(currentTime - pastTime)
  );
  const [activeTime, setActiveTime] = useState<string>(
    getTimeCount(currentTime - pastTime, { minute: "분 전" })
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      currentTime = new Date().getTime();

      setStillnessTime(getTimeCount(currentTime - pastTime));
      setActiveTime(getTimeCount(currentTime - pastTime, { minute: "분 전" }));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <MyLayout background="/asset/dashBoardBackground.png">
      <MyFlexContainer $flexDirection="column" $flexGrow="1" $height="100%">
        <MyFlexContainer
          $flexDirection="column"
          $padding="20px"
          $opacity="80%"
          $gap="15px"
          $backgroundColor={palette.white}
        >
          {[
            {
              id: "biqBbic",
              text1: "빅삑",
              text2: "바코드 쇼핑",
              iconImage: "/asset/barcode-scanner.png",
            },
            {
              id: "homeDoctor",
              text1: "홈닥터",
              text2: "비대면 진료",
              iconImage: "/asset/health-clinic.png",
            },
            {
              id: "heathCare",
              text1: "메일케어",
              text2: "하루 건강 체크",
              iconImage: "/asset/medical-report.png",
            },
          ].map(({ id, text1, text2, iconImage }) => (
            <ServiceItem
              key={id}
              text1={text1}
              text2={text2}
              iconImage={iconImage}
            />
          ))}
        </MyFlexContainer>
        <MyFlexContainer $flexGrow="1">
          <MyFlexContainer $flexDirection="column" $height="100%">
            <MyContainer
              $backgroundImage="/asset/wether.png"
              $backgroundSize="cover"
              $height="270px"
            />
            <MyContainer
              $backgroundImage="/asset/money.png"
              $backgroundSize="cover"
              $height="84px"
            />
          </MyFlexContainer>
          <MyFlexContainer $flexDirection="column" $height="100%">
            <MyContainer
              $backgroundImage="/asset/medicineTime.png"
              $backgroundSize="cover"
              $height="130px"
            />
            <MyFlexContainer
              $flexGrow="1"
              $flexDirection="column"
              $backgroundColor="#171D36"
              $opacity="85%"
              $padding="20px"
            >
              <img
                src="/asset/alert.png"
                width="43.27"
                style={{ alignSelf: "center" }}
              />
              <MyContainer $flexGrow="1">
                <MyText $color={palette.white}>실내 움직임 미감지</MyText>
                <MyText $font="title32" $color={palette.white}>
                  {stillnessTime}
                </MyText>
              </MyContainer>
              <MyContainer $flexGrow="1">
                <MyText $font="regular14" $color={palette.white}>
                  안전시스템 작동
                </MyText>
                <MyText $font="title32" $color={palette.white}>
                  {activeTime}
                </MyText>
              </MyContainer>
            </MyFlexContainer>
          </MyFlexContainer>
        </MyFlexContainer>
      </MyFlexContainer>
      <Calendar width="40%" height="100%" />
    </MyLayout>
  );
}

export default DashBoard;

function ServiceItem({ text1, text2, iconImage }: Record<string, string>) {
  const [fontType, setFontType] = useState<FontType>("regular16");

  return (
    <MyFlexContainer $alignItems="center">
      <MyCircle
        $width="75px"
        $height="75px"
        $backgroundColor={palette.blue.blue1}
        $backgroundImage={iconImage}
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
