import { PropsWithChildren } from "react";
import styled from "styled-components";
import Background from "./Backgound";

const MyLayout = ({
  children,
  background,
  backgroundColor,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <Background background={background}>
      <Layout $backgroundColor={backgroundColor}>{children}</Layout>
    </Background>
  );
};

const Layout = styled.div<StyledComponentProps>`
  position: relative;
  display: flex;
  flex-shrink: 0;
  gap: 24px;
  width: 1024px;
  height: 768px;
  min-width: 768px;
  padding: 25px;
  background-color: ${(props) => props.$backgroundColor};

  .calendar {
    min-width: 410px;
  }
`;

export default MyLayout;
