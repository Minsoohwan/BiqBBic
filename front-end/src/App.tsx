import "./App.css";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import DashBoard from "./page/DashBoard";
import BigBBic from "./page/BigBBic";
import { useSetRecoilState } from "recoil";
import {
  currentItemStore,
  loadingStore,
  searchResultStore,
  selectedMenuStore,
  similerItemsStore,
} from "./recoilStore";
import BarcodeScanner from "./barcode/BarcodeScanner";
import { YunseulPage } from "./page/YunseulPage";
import { useEffect, useState } from "react";

function App() {
  const setCurrentMenu = useSetRecoilState(selectedMenuStore);
  const setCurrentItem = useSetRecoilState(currentItemStore);
  const setSimilerItems = useSetRecoilState(similerItemsStore);
  const setSearchResult = useSetRecoilState(searchResultStore);
  const setLoading = useSetRecoilState(loadingStore);
  new BarcodeScanner(
    setCurrentMenu,
    setCurrentItem,
    setSimilerItems,
    setSearchResult,
    setLoading
  );
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
