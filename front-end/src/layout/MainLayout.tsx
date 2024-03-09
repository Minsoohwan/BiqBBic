import { PropsWithChildren } from "react";
import styled from "styled-components";
import { YunseulNavigator } from "./YunseulNavigator";
import { YunseulCenter } from "./YunseulCenter";
import { YunseulCart } from "./YunseulCart";
import palette from "../style/palette";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <YunseulNavigator />
      <YunseulCenter children={children} />
      <YunseulCart />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  padding: 15px 15px 15px 0;
  display: flex;
  flex-direction: row;
  position: relative;
  background-color: ${palette.gray.gray2};
`;
