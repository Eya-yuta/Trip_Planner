import {useNavigate, useParams} from "react-router-dom";
import {destinations} from "../Types/Destination.ts";
import {useEffect, useState} from "react";
import SafeImage from "../components/SafeImage";
import "../Styles/DestinationPage.css";

type DestinationPageProps = {
    user: string;
};

export default function DestinationPage({ user }: Readonly<DestinationPageProps>) {
    const { id } = useParams();

    const destination = destinations.find(
        (dest) => dest.id === Number(id)
    );

    const navigate = useNavigate();

    const [category, setCategory] = useState("tourism.sights"); // default Attractions
    const [places, setPlaces] = useState<any[]>([]);

    const apiKey = import.meta.env.VITE_GEOAPIFY_KEY;
    // Convert place name to valid image file name
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
                    const placeNameForImage = place.properties.name;
                    const imageName = formatImageName(placeNameForImage);

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

    if (!destination) return <h2>Destination not found!</h2>;
    const isLoggedIn = user && user !== "anonymousUser";
    const handleNewTrip = () => {
        if (isLoggedIn) {
            navigate("/trip");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="destination-page">
            <h1 className="destination-title">{destination.name}</h1>
            <h2 className="categories-title">Categories:</h2>

            <div className="categories-container">
                <button className={`category-button ${category === "tourism.sights" ? "active" : ""}`} onClick={() => setCategory("tourism.sights")}>
                    🏛 Attractions</button>
                <button className={`category-button ${category === "catering.restaurant" ? "active" : ""}`} onClick={() => setCategory("catering.restaurant")}>
                    🍽 Restaurants</button>
                <button className={`category-button ${category === "catering.cafe" ? "active" : ""}`}  onClick={() => setCategory("catering.cafe")}>
                    ☕ Cafes</button>
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
            <button className="newTrip-button" onClick={handleNewTrip}>
                + New Trip
            </button>
        </div>
    );
}