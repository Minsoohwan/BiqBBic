import { PropsWithChildren } from "react";
import styled from "styled-components";
import Background from "./Backgound";

const MyLayout = ({
  children,
  background,
  backgroundColor,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <Layout $backgroundColor={backgroundColor} $backgroundImage={background}>
      {children}
    </Layout>
  );
};

const Layout = styled.div<StyledComponentProps>`
  position: relative;
  display: flex;
  flex-shrink: 0;
  gap: 24px;
  width: 100vw;
  height: 100vh;
  min-width: 768px;
  padding: 25px;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${(props) => props.$backgroundColor};

  .calendar {
    min-width: 410px;
  }
`;

export default MyLayout;
