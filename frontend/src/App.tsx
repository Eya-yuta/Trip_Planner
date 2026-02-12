import './App.css'
import HomePage from "./Pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import HelloPage from "./Pages/HelloPage.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import ProtectedRoute from "./ProtectedRoute.tsx";

function App() {
    const [user, setUser] = useState<string>("anonymousUser")
    useEffect(() => {
        axios.get("/api/user")
            .then((r) => setUser(r.data))
    }, [])

  return (

          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<LoginPage setUser={setUser}/>} />
              <Route path="/register" element={<RegisterPage/>} />
              <Route element={<ProtectedRoute user={user}/>}>
              <Route path="/hello" element={<HelloPage user={user} setUser={setUser}/>} />
              </Route>
          </Routes>
  );
}

export default App
