import './App.css'
import HomePage from "./Pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";

function App() {

  return (

          <Routes>
              <Route path="/" element={<HomePage/>} />
          </Routes>
  );
}

export default App
