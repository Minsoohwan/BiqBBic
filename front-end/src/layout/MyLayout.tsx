import { PropsWithChildren } from "react";
import styled from "styled-components";

interface Props {
  background?: string;
}

const MyLayout = ({ children, background }: PropsWithChildren<Props>) => {
  return <Layout $backgroundImage={background}>{children}</Layout>;
};

const Layout = styled.div<StyledComponentProps>`
  display: flex;
  gap: 24px;
  width: 100vw;
  height: 100vh;
  min-width: 768px;
  position: relative;
  padding: 25px;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;

  svg {
    min-width: 410px;
  }
`;

export default MyLayout;
