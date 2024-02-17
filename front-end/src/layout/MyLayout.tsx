import { PropsWithChildren } from "react";
import styled from "styled-components";

interface Props {
  background?: string;
}

const MyLayout = ({ children, background }: PropsWithChildren<Props>) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Layout $backgroundImage={background}>{children}</Layout>;
    </div>
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

  svg {
    min-width: 410px;
  }
`;

export default MyLayout;
