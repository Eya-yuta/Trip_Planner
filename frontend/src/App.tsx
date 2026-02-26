import './App.css'
import HomePage from "./Pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import HelloPage from "./Pages/HelloPage.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import DestinationPage from "./Pages/DestinationPage.tsx";
import TripFormPage from "./Pages/TripFormPage.tsx";
import TripSummaryPage from "./Pages/TripSummaryPage.tsx";
import MyTripPage from "./Pages/MyTripPage.tsx";
import MyTripsOverviewPage from "./Pages/MyTripsOverviewPage.tsx";
import Layout from "./components/Layout.tsx";

function App() {
    const [user, setUser] = useState<string>("anonymousUser")
    useEffect(() => {
        axios.get("/api/user")
            .then((r) => setUser(r.data))
    }, [])

  return (

          <Routes>
              <Route path="/" element={<HomePage/>} />

              <Route element={<Layout user={user} setUser={setUser} />}>
                  <Route path="/destination/:id" element={<DestinationPage user={user}/>} />
              </Route>
              <Route path="/login" element={<LoginPage setUser={setUser}/>} />
              <Route path="/register" element={<RegisterPage/>} />
              <Route element={<ProtectedRoute user={user}/>}>
                  <Route element={<Layout user={user} setUser={setUser} />}>
              <Route path="/hello" element={<HelloPage user={user} setUser={setUser}/>} />
                  <Route path="/trip" element={<TripFormPage />} />
                  <Route path="/trip-summary" element={<TripSummaryPage />} />
                  <Route path="/my-trip/:tripId" element={<MyTripPage />} />
                  <Route path="/myTrips" element={<MyTripsOverviewPage user={user} setUser={setUser}/>} />
              </Route>
              </Route>
          </Routes>
  );
}

export default App
