import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeePage from "./pages/EmployeePage/EmployeePage";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <HomePage /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<EmployeePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
