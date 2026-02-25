import { useNavigate} from "react-router-dom";
import axios from "axios";
import "../Styles/HelloPage.css";
import {destinations} from "../Types/Destination.ts";

type ProtectedRouteProps = {
    user:string
    setUser:(username:string) => void
}
export default function HelloPage(props:Readonly<ProtectedRouteProps>) {
    const navigate = useNavigate();
    function logout() {
        axios.get("/api/user/logout")
            .then(() => {
                props.setUser("anonymousUser");
                navigate("/trip");
            })
            .catch(() => {
                alert("Logout failed!");
            });
    }

    const goNextPage = () => {
        navigate("/trip");
    };
    const goMyTrips = () => {
        navigate("/myTrips");
    };


    return (
        <div className="hello-container">
            <div className="hello-header">
            <h1 className="hello-title">Triply</h1>
                <div className="header-buttons">
                    <button className="my-trips-button" onClick={goMyTrips}>
                        My Trips
                    </button>
            <button className="logout-button" onClick={logout}>
                Logout
            </button>
            </div>
                </div>
            <div className="hello-content">
                <p className="hello-subtitle">Hello {props.user}! Your trip starts now!</p>
                <div>
                    <h2>Popular Destinations:</h2>

                    <div className="destinations-grid">
                        {destinations.map((dest) => (
                            <div
                                key={dest.id}
                                className="destination-card"
                                onClick={() => navigate(`/destination/${dest.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <img src={dest.image} alt={dest.name} />
                                <h3>{dest.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            <button className="next-button" onClick={goNextPage}>
                +  New Trip
            </button>
            </div>

        </div>
    );
}