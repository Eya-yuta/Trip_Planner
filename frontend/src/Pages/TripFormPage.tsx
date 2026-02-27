import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { destinations } from "../Types/Destination";
import axios from "axios";
import "../Styles/TripFormPage.css";
export default function TripFormPage() {
    const navigate = useNavigate();

    const [tripTitle, setTripTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [selectedDestinationId, setSelectedDestinationId] = useState<number | "">("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDestinationId || !fromDate || !toDate) {
            alert("Please fill all fields!");
            return;
        }

        const selectedDestination = destinations.find(
            (d) => d.id === selectedDestinationId
        );

        try {
            const response = await axios.post("/api/trips", {
                userId: "testUser",
                //userId: props.user,
                title: tripTitle || `Trip to ${selectedDestination?.name}`,
                destination: selectedDestination?.name,
                startDate: fromDate,
                endDate: toDate,
                notes: notes,
                activities: []
            });

            const createdTrip = response.data;

            navigate(`/destination/${selectedDestination?.id}`, {
                state: {
                    tripId: createdTrip.id,
                    destinationId: selectedDestinationId,
                    fromDate,
                    toDate,
                },
            });

        } catch (error) {
            console.error("Error creating trip:", error);
            alert("Trip could not be saved!");
        }
    };

    return (
        <div className="trip-form-container">
            <h1>Plan Your Trip</h1>

            <form onSubmit={handleSubmit} className="trip-form">
                <label>Trip Title</label>
                <input
                    type="text"
                    value={tripTitle}
                    onChange={(e) => setTripTitle(e.target.value)}
                    placeholder="Enter a title for your trip"
                />
                <label>Destination</label>
                <select
                    value={selectedDestinationId}
                    onChange={(e) => setSelectedDestinationId(Number(e.target.value))}
                >
                    <option value="">Select Destination</option>
                    {destinations.map((dest) => (
                        <option key={dest.id} value={dest.id}>
                            {dest.name} ({dest.country})
                        </option>
                    ))}
                </select>

                <label>From</label>
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />

                <label>To</label>
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />
                <label>Notes</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your notes here..."
                    rows={4}
                />
                <button type="submit">Confirm Trip</button>
            </form>
        </div>
    );
}