import "./App.css";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import DashBoard from "./page/DashBoard";
import BigBBic from "./page/BigBBic";
import { useSetRecoilState } from "recoil";
import {
  currentItemStore,
  loadingStore,
  selectedMenuStore,
  similerItemsStore,
} from "./recoilStore";
import BarcodeScanner from "./barcode/BarcodeScanner";
import { useEffect, useState } from "react";

function App() {
  const setCurrentMenu = useSetRecoilState(selectedMenuStore);
  const setCurrentItem = useSetRecoilState(currentItemStore);
  const setSimilerItems = useSetRecoilState(similerItemsStore);
  const setLoading = useSetRecoilState(loadingStore);
  new BarcodeScanner(
    setCurrentMenu,
    setCurrentItem,
    setSimilerItems,
    setLoading
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navigate to="/" />}></Route>
        <Route path="/" element={<DashBoard />} />
        <Route path="/big-bbic" element={<BigBBic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
