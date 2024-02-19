import { PropsWithChildren } from "react";

const Background = ({
  children,
  background,
  backgroundColor,
}: PropsWithChildren<LayoutProps>) => {
  const a: any = {};
  window.addEventListener("keydown", (e: any) => {
    // console.log(e.code + " 누름");
    a[e.key] = true;
    console.log(a);
  });

  window.addEventListener("keyup", (e: any) => {
    // console.log(e.code + " 손뗌");
    delete a[e.code];
    console.log(a);
  });

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
