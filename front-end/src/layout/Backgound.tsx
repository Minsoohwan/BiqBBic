import { PropsWithChildren } from "react";

const Background = ({
  children,
  background,
  backgroundColor,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
};

export default Background;
