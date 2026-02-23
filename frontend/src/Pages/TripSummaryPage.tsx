import { useLocation, useNavigate } from "react-router-dom";
import { destinations } from "../Types/Destination";
import { useEffect, useState } from "react";
import SafeImage from "../components/SafeImage";
import "../Styles/DestinationPage.css";

export default function TripSummaryPage() {
    const location = useLocation();
    const navigate = useNavigate();

    if (!location.state) {
        return <h2>No trip data found</h2>;
    }

    const { destinationId, fromDate, toDate } = location.state;

    const destination = destinations.find(
        (dest) => dest.id === Number(destinationId)
    );

    const [category, setCategory] = useState("tourism.sights");
    const [places, setPlaces] = useState<any[]>([]);

    const apiKey = import.meta.env.VITE_GEOAPIFY_KEY;

    const formatImageName = (name: string) => {
        return name
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");
    };

    useEffect(() => {
        if (!destination) return;

        const fetchPlaces = async () => {
            try {
                const response = await fetch(
                    `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${destination.lon},${destination.lat},5000&limit=10&apiKey=${apiKey}`
                );

                const data = await response.json();

                const folder =
                    category === "tourism.sights"
                        ? "attractions"
                        : category === "catering.restaurant"
                            ? "restaurants"
                            : "cafes";

                const enriched = data.features.map((place: any) => {
                    const imageName = formatImageName(place.properties.name);

                    const imagePath = `/images/${destination.slug}/${folder}/${imageName}.jpg`;

                    return {
                        ...place,
                        imagePath,
                    };
                });

                setPlaces(enriched);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };

        fetchPlaces();
    }, [destination, category]);

    if (!destination) return <h2>Destination not found</h2>;

    return (
        <div className="destination-page">
            <h1 className="destination-title">
                Your Trip to {destination.name}
            </h1>

            <p style={{ textAlign: "center", marginBottom: "20px" }}>
                📅 {fromDate} → {toDate}
            </p>

            <h2 className="categories-title">Categories:</h2>

            <div className="categories-container">
                <button
                    className={`category-button ${category === "tourism.sights" ? "active" : ""}`}
                    onClick={() => setCategory("tourism.sights")}
                >
                    🏛 Attractions
                </button>

                <button
                    className={`category-button ${category === "catering.restaurant" ? "active" : ""}`}
                    onClick={() => setCategory("catering.restaurant")}
                >
                    🍽 Restaurants
                </button>

                <button
                    className={`category-button ${category === "catering.cafe" ? "active" : ""}`}
                    onClick={() => setCategory("catering.cafe")}
                >
                    ☕ Cafes
                </button>
            </div>

            <div className="places-list">
                {places.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    places.map((place) => (
                        <div
                            key={place.properties.place_id || place.properties.name}
                            className="place-card"
                        >
                            <button
                                className="add-activity-button"
                                //onClick={() => addActivity(place)}
                            >
                                ➕
                            </button>
                            <p>{place.properties.address_line1}</p>

                            <div className="image-wrapper">
                                <SafeImage
                                    src={place.imagePath}
                                    alt={place.properties.name}
                                    className="place-image"
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button
                className="next-button"
                onClick={() => navigate("/destination/" + destination.id)}
            >
                Back to Destination Page
            </button>
        </div>
    );
}