import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import "../Styles/DestinationPage.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {destinations} from "../Types/Destination.ts";


export default function MyTripPage() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/trips/${tripId}`)
            .then((res) => setTrip(res.data))
            .catch((err) => console.error(err));
    }, [tripId]);

    if (!trip) return <p>Loading trip...</p>;

    // Activities grouped by day
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

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const sourceDay = Number(result.source.droppableId.replace("day-", ""));
        const destinationDay = Number(result.destination.droppableId.replace("day-", ""));

        const updatedActivities = [...trip.activities];

        // Activity finden
        const movedActivity = updatedActivities.find(
            (a: any) =>
                a.day === sourceDay &&
                updatedActivities
                    .filter((act: any) => act.day === sourceDay)
                    [result.source.index]?.title === a.title
        );

        if (!movedActivity) return;

        // Day ändern
        movedActivity.day = destinationDay;

        try {
            const response = await axios.put(`/api/trips/${trip.id}`, {
                ...trip,
                activities: updatedActivities
            });

            setTrip(response.data);
        } catch (err) {
            console.error(err);
        }
    };
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Monate beginnen bei 0
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
    const destinationObj = destinations.find(d => d.name === trip.destination);
    const handleAddMorePlaces = () => {
        if (!destinationObj) {
            alert("Destination not found!");
            return;
        }
        navigate(`/destination/${destinationObj.id}?tripId=${trip.id}`);
    };
    return (
        <div style={{ padding: "40px" }}>
            <h1>{trip.title}</h1>
            <p className="trip-dates">📅 {formatDate(trip.startDate)} → {formatDate(trip.endDate)}</p>
            {trip.notes && <p className="trip-notes">📝 {trip.notes}</p>}
            <button
                className="newTrip-button"
                onClick={handleAddMorePlaces}
            >
                + Add More Places
            </button>

            <DragDropContext onDragEnd={onDragEnd}>
                {groupedActivities && Object.keys(groupedActivities).map((day) => (
                    <div key={day} className="day-section">
                        <h2>Day {day}</h2>
                        <Droppable droppableId={`day-${day}`}>
                            {(provided) => (
                                <div
                                    className="activities-grid"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {groupedActivities[day].map((activity: any, index: number) => (
                                        <Draggable key={activity.title} draggableId={activity.title} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="activity-card"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
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
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
}