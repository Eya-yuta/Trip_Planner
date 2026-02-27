import { useNavigate} from "react-router-dom";
import "../Styles/HelloPage.css";
import {destinations} from "../Types/Destination.ts";

export default function HelloPage() {
    const navigate = useNavigate();
    return (
        <>
        <div className="hello-container">
            <div className="hello-content">
                <p className="hello-subtitle">Your trip starts now!</p>

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

            </div>
        </div>
        </>
    );
}