import "./App.css";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import DashBoard from "./page/DashBoard";
import BigBBic from "./page/BigBBic";

function App() {
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
