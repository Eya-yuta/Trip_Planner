import { useLocation } from "react-router-dom";

export default function TripSummaryPage() {
    const location = useLocation();
    const { destination, fromDate, toDate } = location.state || {};

    return (
        <div className="trip-summary-container">
            <h1>Your Trip</h1>

            <div className="trip-summary-card">
                <h2>{destination}</h2>
                <p>
                    📅 From: {fromDate}
                </p>
                <p>
                    📅 To: {toDate}
                </p>
            </div>
        </div>
    );
}