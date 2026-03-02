import { useParams, useNavigate ,useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { destinations } from "../Types/Destination";
import SafeImage from "../components/SafeImage";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import dayjs from "dayjs";
import "../Styles/DestinationPage.css";

type DestinationPageProps = {
    user: string;
};

export default function DestinationPage({ user }: Readonly<DestinationPageProps>) {
    const { id } = useParams();
    const navigate = useNavigate();

    const destination = destinations.find(d => d.id === Number(id));
    const isLoggedIn = user && user !== "anonymousUser";
    const [isEditing, setIsEditing] = useState(false);

    const [category, setCategory] = useState("tourism.sights");
    const [places, setPlaces] = useState<any[]>([]);
    const [trip, setTrip] = useState<any>(null);

    const [showTripForm, setShowTripForm] = useState(false);
    const [tripTitle, setTripTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const today = dayjs().format("YYYY-MM-DD");
    const [notes, setNotes] = useState("");

    const apiKey = import.meta.env.VITE_GEOAPIFY_KEY;

    const [searchParams] = useSearchParams();
    const tripId = searchParams.get("tripId");

    const formatImageName = (name: string) =>
        name
            ?.toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll(/[^a-z0-9-]/g, "");

    /* =============================
       FETCH PLACES
    ==============================*/
    useEffect(() => {
        if (!destination) return;

        const fetchPlaces = async () => {
            try {
                const response = await fetch(
                    `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${destination.lon},${destination.lat},5000&limit=10&apiKey=${apiKey}`
                );

                const data = await response.json();

                let folder: string;

                if (category === "tourism.sights") {
                    folder = "attractions";
                } else if (category === "catering.restaurant") {
                    folder = "restaurants";
                } else {
                    folder = "cafes";
                }

                const uniqueMap = new Map();

                data.features.forEach((place: any) => {
                    const key = place.properties.place_id || place.properties.name;

                    if (!uniqueMap.has(key)) {
                        const imageName = formatImageName(place.properties.name);
                        const imagePath = `/images/${destination.slug}/${folder}/${imageName}.jpg`;

                        uniqueMap.set(key, { ...place, imagePath });
                    }
                });

                setPlaces(Array.from(uniqueMap.values()));
            } catch (err) {
                console.error("Error fetching places:", err);
            }
        };

        fetchPlaces();
    }, [destination, category]);

    /* =============================
       FETCH USER TRIP
    ==============================*/
    useEffect(() => {
        if (!isLoggedIn || !destination) return;

        const fetchTrip = async () => {
            try {
                if (tripId) {
                    const res = await axios.get(`/api/trips/${tripId}`);
                    setTrip(res.data);
                    setTripTitle(res.data.title || "");
                    setStartDate(res.data.startDate || "");
                    setEndDate(res.data.endDate || "");
                    setNotes(res.data.notes || "");
                } else {
                    const res = await axios.get(
                        `/api/trips/user/${user}/destination/${destination.name}`
                    );
                    setTrip(res.data);
                    setTripTitle(res.data.title || "");
                    setStartDate(res.data.startDate || "");
                    setEndDate(res.data.endDate || "");
                    setNotes(res.data.notes || "");
                }
            } catch (err) {
                console.error("Could not fetch trip:", err);
                //alert("Could not load your trip. Please try again.");
                setTrip(null);
            }
        };

        fetchTrip();

    }, [isLoggedIn, destination, user, tripId]);

    /* =============================
       CREATE TRIP
    ==============================*/
    const handleCreateTrip = async () => {
        if (!destination || !startDate || !endDate) {
            alert("Please fill all required fields!");
            return;
        }

        if (dayjs(endDate).isBefore(dayjs(startDate))) {
            alert("End date must be after start date!");
            return;
        }
        if (dayjs(startDate).isBefore(dayjs())) {
            alert("Start date cannot be in the past!");
            return;
        }

        try {
            const response = await axios.post("/api/trips", {
                userId: user,
                title: tripTitle.trim() ? tripTitle : `Trip to ${destination.name}`,
                destination: destination.name,
                startDate,
                endDate,
                notes,
                activities: []
            });

            setTrip(response.data);
            setShowTripForm(false);
        } catch (err) {
            console.error(err);
            alert("Trip could not be created");
        }
    };
    const handleUpdateTrip = async () => {
        if (!trip) return;

        if (dayjs(endDate).isBefore(dayjs(startDate))) {
            alert("End date must be after start date");
            return;
        }

        try {
            const response = await axios.put(`/api/trips/${trip.id}`, {
                userId: user,
                title: tripTitle,
                destination: trip.destination,
                startDate,
                endDate,
                notes,
                activities: trip.activities
            });

            setTrip(response.data);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            alert("Trip update failed");
        }
    };

    /* =============================
       ACTIVITY HANDLING
    ==============================*/
    const isActivityAdded = (placeName: string): boolean =>
        trip?.activities?.some((a: any) => a.title === placeName) ?? false;

    const toggleActivity = async (place: any) => {
        if (!trip) return;

        const placeName = place.properties.name;
        const alreadyAdded = isActivityAdded(placeName);

        let updatedActivities;

        if (alreadyAdded) {
            updatedActivities = trip.activities.filter(
                (a: any) => a.title !== placeName
            );
        } else {
            const start = dayjs(trip.startDate);
            const end = dayjs(trip.endDate);
            const duration = end.diff(start, "day") + 1;

            const dayNumber =
                ((trip.activities?.length || 0) % duration) + 1;

            const newActivity = {
                title: placeName,
                imagePath: place.imagePath,
                day: dayNumber
            };

            updatedActivities = [...(trip.activities || []), newActivity];
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

    if (!destination) return <h2>Destination not found</h2>;
    let bottomButton;

    if (!isLoggedIn) {
        bottomButton = (
            <button
                className="newTrip-button"
                onClick={() => navigate("/login")}
            >
                + New Trip
            </button>
        );
    } else if (trip) {
        bottomButton = (
            <button
                className="newTrip-button"
                onClick={() => navigate(`/my-trip/${trip.id}`)}
            >
                View My Trip
            </button>
        );
    } else {
        bottomButton = (
            <button
                className="newTrip-button"
                onClick={() => setShowTripForm(true)}
            >
                + Start Trip
            </button>
        );
    }

    return (
        <div className="destination-page">
            <h1 className="destination-title">{destination.name}</h1>

            {/* TRIP FORM */}
            {isLoggedIn && showTripForm && !trip && (
                <div className="trip-form-inline">
                    <h3>Plan Your Trip</h3>

                    <label htmlFor="tripTitle">Trip Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Summer Vacation in ..."
                        value={tripTitle}
                        onChange={(e) => setTripTitle(e.target.value)}
                        className="trip-title-input"
                    />

                    <label htmlFor="startDate">From</label>
                    <input
                        type="date"
                        lang="en"
                        value={startDate}
                        min={today}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <label htmlFor="endDate">To</label>
                    <input
                        type="date"
                        lang="en"
                        value={endDate}
                        min={startDate || today}
                        onChange={(e) => setEndDate(e.target.value)}
                    />

                    <label htmlFor="notes">Notes</label>
                    <textarea
                        placeholder="Write something about your trip..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />

                    <button
                        className="confirm-trip-button"
                        onClick={handleCreateTrip}
                    >
                        Confirm Trip
                    </button>
                </div>
            )}

            {/* TRIP INFO */}
            {isLoggedIn && trip && !isEditing && (
                <>
                    <h3 style={{ textAlign: "center",marginBottom:"15px" }}>{trip.title}</h3>

                    {trip.notes && (
                        <p style={{ textAlign: "center" }}>📝 {trip.notes}</p>
                    )}

                    <p style={{ textAlign: "center", margin: "15px 0" }}>
                        📅 {dayjs(trip.startDate).format("DD.MM.YYYY")} →
                        {dayjs(trip.endDate).format("DD.MM.YYYY")}
                    </p>

                    <button
                        className="edit-trip-button"
                        onClick={() => setIsEditing(true)}
                    >
                        ✏️ Edit Trip Infos
                    </button>
                </>
            )}
            {isLoggedIn && trip && isEditing && (
                <div className="trip-form-inline">
                    <h3>Edit Trip</h3>

                    <label htmlFor="tripTitle">Trip Title</label>
                    <input
                        type="text"
                        value={tripTitle}
                        onChange={(e) => setTripTitle(e.target.value)}
                    />

                    <label htmlFor="startDate">From</label>
                    <input
                        type="date"
                        lang="en"
                        value={startDate}
                        min={today}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <label htmlFor="endDate">To</label>
                    <input
                        type="date"
                        lang="en"
                        value={endDate}
                        min={startDate || today}
                        onChange={(e) => setEndDate(e.target.value)}
                    />

                    <label htmlFor="notes">Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />

                    <button
                        className="confirm-trip-button"
                        onClick={handleUpdateTrip}
                    >
                        Save Changes
                    </button>

                    <button
                        className="cancel-button"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* CATEGORY BUTTONS */}
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

            {/* PLACES */}
            <div className="places-list">
                {places.length === 0 ? (
                    <p>Loading places...</p>
                ) : (
                    places.map((place) => (
                        <div
                            key={place.properties.place_id || place.properties.name}
                            className="place-card"
                        >
                            {isLoggedIn && trip && (
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
                            )}

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

            {/* BOTTOM BUTTON */}
            {bottomButton}
        </div>
    );
}