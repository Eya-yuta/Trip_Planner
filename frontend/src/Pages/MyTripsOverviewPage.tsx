import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/DestinationPage.css";
import Navbar from "../components/Navbar.tsx";


type MyTripsOverviewPageProps = {
    user: string;
    setUser: (username: string) => void;
}


export default function MyTripsOverviewPage({ user, setUser }: Readonly<MyTripsOverviewPageProps>) {
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

    return (
        <div style={{ padding: "40px" }}>
            <h1>📊 My Trips</h1>

            <div className="activities-grid">
                {trips.length === 0 ? (
                    <p>No trips yet...</p>
                ) : (
                    trips.map((trip) => (
                        <div key={trip.id} className="activity-card">
                            <h3>{trip.title}</h3>
                            <p>{trip.destination}</p>
                            <p>📅 {trip.startDate} → {trip.endDate}</p>

                            <div style={{ marginTop: "10px" }}>
                                <button
                                    className="next-button"
                                    onClick={() => navigate(`/my-trip/${trip.id}`)}
                                >
                                    View Trip
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