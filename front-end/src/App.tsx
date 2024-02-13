import "./App.css";
import { Navigate, Route, Routes, HashRouter } from "react-router-dom";
import DashBoard from "./page/DashBoard";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
