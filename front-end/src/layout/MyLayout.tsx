import { PropsWithChildren } from "react";
import styled from "styled-components";

const MyLayout = ({ children }: PropsWithChildren) => {
  return <Layout>{children}</Layout>;
};

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  padding: 25px;
`;

export default MyLayout;
