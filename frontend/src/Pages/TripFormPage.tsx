import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TripFormPage() {
    const navigate = useNavigate();

    const [destination, setDestination] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!destination || !fromDate || !toDate) {
            alert("Please fill all fields!");
            return;
        }

        navigate("/trip-summary", {
            state: {
                destination,
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
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                />

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