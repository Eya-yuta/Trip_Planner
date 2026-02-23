import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/DestinationPage.css";

export default function MyTripPage() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState<any>(null);

    useEffect(() => {
        axios.get(`/api/trips/${tripId}`)
            .then((res) => setTrip(res.data))
            .catch((err) => console.error(err));
    }, [tripId]);

    if (!trip) return <p>Loading trip...</p>;

    // Activities nach Tagen gruppieren
    const groupedActivities = trip.activities?.reduce((acc: any, activity: any) => {
        const day = activity.day;
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(activity);
        return acc;
    }, {});

    return (
        <div style={{ padding: "40px" }}>
            <h1>{trip.title}</h1>
            <p>📅 {trip.startDate} → {trip.endDate}</p>

            {groupedActivities &&
                Object.keys(groupedActivities).map((day) => (
                    <div key={day} className="day-section">
                        <h2>Day {day}</h2>

                        <div className="activities-grid">
                            {groupedActivities[day].map((activity: any, index: number) => (
                                <div key={index} className="activity-card">
                                    <h4>{activity.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
}