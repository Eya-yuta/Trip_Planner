import { useNavigate } from "react-router-dom";
import {destinations} from "../Types/Destination.ts";

export default function HomePage() {
    const navigate = useNavigate();

    const goLoginPage = () => {
        navigate("/login");
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Triply</h1>
            <p className="app-subtitle">Welcome to your adventure!</p>
            <button className="next-button" onClick={goLoginPage}>
                Start planning
            </button>
            <div>
                <h2>Popular Destinations</h2>

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
        </div>
    );
}