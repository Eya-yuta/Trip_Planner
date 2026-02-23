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
    const deleteActivity = async (activityTitle: string) => {
        if (!trip) return;

        const updatedActivities = trip.activities.filter(
            (activity: any) => activity.title !== activityTitle
        );

        try {
            const response = await axios.put(`/api/trips/${trip.id}`, {
                title: trip.title,
                destination: trip.destination,
                startDate: trip.startDate,
                endDate: trip.endDate,
                notes: trip.notes,
                activities: updatedActivities
            });

            setTrip(response.data);

        } catch (error) {
            console.error("Error deleting activity:", error);
            alert("Could not delete activity");
        }
    };

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
                                    {activity.imagePath && (
                                        <div className="activity-image-wrapper">
                                            <img src={activity.imagePath} alt={activity.title} className="activity-image" />
                                        </div>
                                    )}
                                    <h4>{activity.title}</h4>
                                    <button
                                        className="delete-activity-button"
                                        onClick={() => deleteActivity(activity.title)}
                                    >
                                        🗑
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
}