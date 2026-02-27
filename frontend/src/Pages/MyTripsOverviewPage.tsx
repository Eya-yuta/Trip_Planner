import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/DestinationPage.css";

type MyTripsOverviewPageProps = {
    user: string;
    setUser: (username: string) => void;
}


export default function MyTripsOverviewPage({ user}: Readonly<MyTripsOverviewPageProps>) {
    const [trips, setTrips] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user !== "anonymousUser") {
            axios.get(`/api/trips?userId=${user}`)
                .then(res => setTrips(res.data))
                .catch(err => console.error(err));
        }
    }, [user]);

    const deleteTrip = async (tripId: string) => {
        try {
            await axios.delete(`/api/trips/${tripId}`);
            setTrips(trips.filter(trip => trip.id !== tripId));
        } catch (err) {
            console.error(err);
            alert("Could not delete trip");
        }
    };
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Monate beginnen bei 0
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    return (
        <div style={{ padding: "40px" }}>
            <h1>📊 My Trips</h1>

            <div className="activities-grid">
                {trips.length === 0 ? (
                    <p>No trips yet...</p>
                ) : (
                    trips.map((trip) => (
                        <div key={trip.id} className="view-card">
                            <h3 style={{ textAlign: "center",paddingTop: "1px", marginBottom: "15px" }}>{trip.title}</h3>
                            <p style={{ textAlign: "center",marginTop: "10px", marginBottom: "15px" }}>{trip.destination}</p>
                            <p className="tripView-dates"><span className="date-icon">📅</span>
                                {formatDate(trip.startDate)} <span className="date-separator">→</span>
                                {formatDate(trip.endDate)}</p>

                            <div style={{ marginTop: "10px" }}>
                                <button
                                    className="view-trip-icon"
                                    onClick={() => navigate(`/my-trip/${trip.id}`)}
                                >
                                    👁️
                                </button>

                                <button
                                    className="delete-activity-button"
                                    onClick={() => deleteTrip(trip.id)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    🗑
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}