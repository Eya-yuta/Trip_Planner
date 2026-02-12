import './App.css'
import HomePage from "./Pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";

function App() {

  return (

          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<LoginPage />} />
          </Routes>
  );
}

export default App
