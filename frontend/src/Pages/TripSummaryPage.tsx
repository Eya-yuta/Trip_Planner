import { useLocation, useNavigate } from "react-router-dom";
import { destinations } from "../Types/Destination";
import { useEffect, useState } from "react";
import SafeImage from "../components/SafeImage";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import dayjs from "dayjs";
import "../Styles/DestinationPage.css";

export default function TripSummaryPage() {
    const location = useLocation();
    const navigate = useNavigate();

    if (!location.state) {
        return <h2>No trip data found</h2>;
    }

    const { tripId, destinationId, trip: initialTrip } = location.state;
    const [trip, setTrip] = useState<any>(initialTrip || null);

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

    // Fetch places from Geoapify
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

                // Remove duplicates by place_id or name
                const uniquePlacesMap = new Map();
                data.features.forEach((place: any) => {
                    const key = place.properties.place_id || place.properties.name;
                    if (!uniquePlacesMap.has(key)) {
                        const imageName = formatImageName(place.properties.name);
                        const imagePath = `/images/${destination.slug}/${folder}/${imageName}.jpg`;
                        uniquePlacesMap.set(key, { ...place, imagePath });
                    }
                });

                setPlaces(Array.from(uniquePlacesMap.values()));
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };

        fetchPlaces();
    }, [destination, category]);

    // Fetch trip from API if not passed
    useEffect(() => {
        if (!trip && tripId) {
            axios.get(`/api/trips/${tripId}`)
                .then((res) => setTrip(res.data))
                .catch((err) => console.error(err));
        }
    }, [tripId, trip]);

    if (!destination) return <h2>Destination not found</h2>;
    if (!trip) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading trip data...</p>;

    const isActivityAdded = (placeName: string) => {
        if (!trip || !trip.activities) return false;
        return trip.activities.some((activity: any) => activity.title === placeName);
    };

    const toggleActivity = async (place: any) => {
        if (!trip) return;

        const placeName = place.properties.name;
        const alreadyAdded = trip.activities?.some(a => a.title === placeName);
        let updatedActivities;

        if (alreadyAdded) {
            updatedActivities = trip.activities.filter(a => a.title !== placeName);
        } else {
            const start = dayjs(trip.startDate);
            const end = dayjs(trip.endDate);
            const duration = end.diff(start, "day") + 1;

            const activitiesSoFar = trip.activities || [];
            const dayNumber = (activitiesSoFar.length % duration) + 1;

            const newActivity = {
                title: placeName,
                imagePath: place.imagePath,
                day: dayNumber
            };

            updatedActivities = [...activitiesSoFar, newActivity];
        }

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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    return (
        <div className="destination-page">
            <h1 className="destination-title">
                {trip.title && trip.title.trim() !== "" ? trip.title : `Trip to ${destination.name}`}
            </h1>

            {trip.notes && <p style={{ textAlign: "center", marginBottom: "20px" }}>{trip.notes}</p>}

            <p style={{ textAlign: "center", marginBottom: "20px" }}>
                📅 {formatDate(trip.startDate)} → {formatDate(trip.endDate)}
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
                    <p>Loading places...</p>
                ) : (
                    places.map((place) => (
                        <div
                            key={place.properties.place_id || place.properties.name}
                            className="place-card"
                        >
                            <button
                                className="add-activity-button"
                                onClick={() => toggleActivity(place)}
                            >
                                {isActivityAdded(place.properties.name) ? (
                                    <FaHeart size={20} color="red" />
                                ) : (
                                    <FaRegHeart size={20} />
                                )}
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
                className="newTrip-button"
                onClick={() => navigate(`/my-trip/${trip.id}`)}
            >
                View My Trip
            </button>
        </div>
    );
}