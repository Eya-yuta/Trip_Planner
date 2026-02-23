import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { destinations } from "../Types/Destination";

export default function TripFormPage() {
    const navigate = useNavigate();

    const [selectedDestinationId, setSelectedDestinationId] = useState<number | "">("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDestinationId || !fromDate || !toDate) {
            alert("Please fill all fields!");
            return;
        }

        navigate("/trip-summary", {
            state: {
                destinationId: selectedDestinationId,
                fromDate,
                toDate,
            },
        });
    };

    return (
        <div className="trip-form-container">
            <h1>Plan Your Trip</h1>

            <form onSubmit={handleSubmit} className="trip-form">
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

                <button type="submit">Confirm Trip</button>
            </form>
        </div>
    );
}