import {useNavigate, useParams} from "react-router-dom";
import {destinations} from "../Types/Destination.ts";
import {useEffect, useState} from "react";

export default function DestinationPage() {
    const { id } = useParams();

    const destination = destinations.find(
        (dest) => dest.id === Number(id)
    );

    const navigate = useNavigate();

    const goLoginPage = () => {
        navigate("/login");
    };
    const [category, setCategory] = useState("tourism.sights"); // default Attractions
    const [places, setPlaces] = useState<any[]>([]);

    const apiKey = import.meta.env.VITE_GEOAPIFY_KEY;
    useEffect(() => {
        if (!destination) return;

        const fetchPlaces = async () => {
            try {
                const response = await fetch(
                    `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${destination.lon},${destination.lat},5000&limit=10&apiKey=${apiKey}`
                );
                const data = await response.json();
                setPlaces(data.features);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };

        fetchPlaces();
    }, [destination, category]);

    if (!destination) return <h2>Destination not found!</h2>;

    return (
        <div className="destination-page">
            <h1 className="destination-title">{destination.name}</h1>
            <h2 className="categories-title">Categories:</h2>

            <div className="categories-container">
                <button className="category-button" onClick={() => setCategory("tourism.sights")}>
                    🏛 Attractions</button>
                <button className="category-button" onClick={() => setCategory("catering.restaurant")}>
                    🍽 Restaurants</button>
                <button className="category-button"  onClick={() => setCategory("catering.cafe")}>
                    ☕ Cafes</button>
            </div>
            <div className="places-list">
                {places.length === 0 ? (
                    <p>Loading ...</p>
                ) : (
                    places.map((place, index) => (
                        <div key={index} className="place-card">
                            <h3>{place.properties.name}</h3>
                            <p>{place.properties.address_line1}</p>
                        </div>
                    ))
                )}
            </div>
            <button className="next-button" onClick={goLoginPage}>
                Start planning
            </button>
        </div>
    );
}