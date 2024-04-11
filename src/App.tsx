import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeePage from "./pages/EmployeePage/EmployeePage";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import Footer from "./components/Footer/Footer";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <HomePage /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employee/:id" element={<EmployeePage />} />
          <Route path="/new-employee" element={<CreateEmployeePage />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={4500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
