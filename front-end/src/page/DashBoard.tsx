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
import { getTimeCount } from "../style/common";
import { useNavigate } from "react-router";
import HomeDoctorPopup from "../style/component/HomeDoctorPopup";

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

  const [showDoctorModal, setShowDoctorModal] = useState(false);

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
    <>
      <MyLayout background="/asset/dashBoardBackground.png">
        <MyFlexContainer
          $borderRadius="0"
          $flexDirection="column"
          $height="100%"
        >
          <MyFlexContainer
            $flexDirection="column"
            $flexShrink="0"
            $padding="20px"
            $opacity="80%"
            $gap="15px"
            $borderRadius="10px"
            $backgroundColor={palette.white}
          >
            {[
              {
                id: "biqBbic",
                text1: "빅삑",
                text2: "바코드 쇼핑",
                iconImage: "/asset/barcode-scanner.png",
                linkTo: "/big-bbic",
              },
              {
                id: "yunseul",
                text1: "윤슬",
                text2: "나에게 딱 맞는 스타일",
                iconImage: "/asset/yunseol.png",
                onClick: () => {
                  alert("3월 중 프로토타입 개발 완료 예정입니다.");
                },
                // linkTo: "/yunseul",
              },
              {
                id: "homeDoctor",
                text1: "홈닥터",
                text2: "비대면 진료",
                iconImage: "/asset/health-clinic.png",
                onClick: () => {
                  setShowDoctorModal(true);
                },
              },
            ].map(({ id, text1, text2, iconImage, linkTo, onClick }, idx) => (
              <ServiceItem
                key={id}
                text1={text1}
                text2={text2}
                iconImage={iconImage}
                linkTo={linkTo}
                onClick={onClick}
              />
            ))}
          </MyFlexContainer>
          <MyFlexContainer $flexGrow="1" $flexShrink="0">
            <MyFlexContainer $flexDirection="column" $height="100%">
              <MyContainer
                $backgroundImage="/asset/wether.png"
                $backgroundSize="contain"
                $height="270px"
              />
              <MyContainer
                $backgroundImage="/asset/money.png"
                $backgroundSize="contain"
                $height="84px"
              />
            </MyFlexContainer>
            <MyFlexContainer
              $flexDirection="column"
              $height="100%"
              $flexGrow="1"
            >
              <MyContainer
                $backgroundImage="/asset/medicineTime.png"
                $backgroundSize="contain"
                $height="130px"
              />
            </MyFlexContainer>
          </MyFlexContainer>
        </MyFlexContainer>
        <Calendar className="calendar" width="40%" />
      </MyLayout>

      {showDoctorModal && (
        <HomeDoctorPopup setPopupVisible={setShowDoctorModal} />
      )}
    </>
  );
}

export default DashBoard;

interface ServiceItemProps {
  text1: string;
  text2: string;
  iconImage: string;
  linkTo?: string;
  onClick?: () => void;
}

function ServiceItem({
  text1,
  text2,
  iconImage,
  linkTo,
  onClick,
}: ServiceItemProps) {
  const [fontType, setFontType] = useState<FontType>("regular16");

  const nav = useNavigate();

  return (
    <MyFlexContainer $alignItems="center">
      <MyCircle
        $width="55px"
        $height="55px"
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
        $size="small"
        $backgroundColor="blue"
        onClick={() => {
          setFontType("regular16");
          if (linkTo) nav(linkTo);
          else if (onClick) onClick();
        }}
      >
        바로가기
      </MyButton>
    </MyFlexContainer>
  );
}
