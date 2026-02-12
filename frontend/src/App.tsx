import './App.css'
import HomePage from "./Pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";

function App() {

  return (

          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
          </Routes>
  );
}

export default App
