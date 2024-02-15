import { PropsWithChildren } from "react";
import styled from "styled-components";

interface Props {
  background?: string;
}

const MyLayout = ({ children, background }: PropsWithChildren<Props>) => {
  return <Layout $background={background}>{children}</Layout>;
};

type LayoutProps = {
  $background?: string;
};
const Layout = styled.div<LayoutProps>`
  width: 100vw;
  height: 100vh;
  min-width: 768px;
  position: relative;
  padding: 25px;
  background-image: url(${(props) => props.$background});
`;

export default MyLayout;
