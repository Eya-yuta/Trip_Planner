import { useNavigate} from "react-router-dom";
import "../Styles/HelloPage.css";
import {destinations} from "../Types/Destination.ts";

type ProtectedRouteProps = {
    user:string
    setUser:(username:string) => void
}
export default function HelloPage(props:Readonly<ProtectedRouteProps>) {
    const navigate = useNavigate();
    const goNextPage = () => {
        navigate("/trip");
    };

    return (
        <div className="hello-container">
            <div className="hello-content">
                <p className="hello-subtitle">{props.user}, your trip starts now!</p>
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