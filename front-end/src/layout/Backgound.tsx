import { PropsWithChildren, useEffect } from "react";
import BarcodeScanner from "../barcode/BarcodeScanner";
import { useSetRecoilState } from "recoil";
import { currentItemStore, selectedMenuStore } from "../recoilStore";
import axios from "axios";

const Background = ({
  children,
  background,
  backgroundColor,
}: PropsWithChildren<LayoutProps>) => {
  const setCurrentMenu = useSetRecoilState(selectedMenuStore);
  const setCurrentItem = useSetRecoilState(currentItemStore);
  const barcodeScanner = new BarcodeScanner(setCurrentMenu, setCurrentItem);

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
