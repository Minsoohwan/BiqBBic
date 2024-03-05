import "./App.css";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import DashBoard from "./page/DashBoard";
import BigBBic from "./page/BigBBic";
import { useSetRecoilState } from "recoil";
import {
  currentItemStore,
  selectedMenuStore,
  similerItemsStore,
} from "./recoilStore";
import BarcodeScanner from "./barcode/BarcodeScanner";
import { YunseulPage } from "./page/YunseulPage";

function App() {
  const setCurrentMenu = useSetRecoilState(selectedMenuStore);
  const setCurrentItem = useSetRecoilState(currentItemStore);
  const setSimilerItems = useSetRecoilState(similerItemsStore);
  new BarcodeScanner(setCurrentMenu, setCurrentItem, setSimilerItems);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navigate to="/" />}></Route>
        <Route path="/" element={<DashBoard />} />
        <Route path="/big-bbic" element={<BigBBic />} />
        <Route path="/yunseul" element={<YunseulPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
