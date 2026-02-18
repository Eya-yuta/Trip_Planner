export type Destination = {
    id: number;
    name: string;
    country: string;
    image: string;
    lat: number;
    lon: number;
    slug: string;
    continent: string;
    popularity: number;
};

export const destinations: Destination[] = [

    { id: 1, name: "Paris", country: "France", image: "/images/Paris.jpg", lat: 48.8566, lon: 2.3522, slug: "paris", continent: "Europe", popularity: 98 },
    { id: 2, name: "Vienna", country: "Austria", image: "/images/Vienna.jpg", lat: 48.2082, lon: 16.3738, slug: "vienna", continent: "Europe", popularity: 90 },
    { id: 3, name: "Budapest", country: "Hungary", image: "/images/Budapest.jpg", lat: 47.4979, lon: 19.0402, slug: "budapest", continent: "Europe", popularity: 88 },
    { id: 4, name: "Amsterdam", country: "Netherlands", image: "/images/Amsterdam.jpg", lat: 52.3676, lon: 4.9041, slug: "amsterdam", continent: "Europe", popularity: 92 },
    { id: 5, name: "Prague", country: "Czech Republic", image: "/images/Prague.jpg", lat: 50.0755, lon: 14.4378, slug: "prague", continent: "Europe", popularity: 89 },
    { id: 6, name: "Bern", country: "Switzerland", image: "/images/Bern.jpg", lat: 46.9480, lon: 7.4474, slug: "bern", continent: "Europe", popularity: 80 },
    { id: 7, name: "Copenhagen", country: "Denmark", image: "/images/Copenhagen.jpg", lat: 55.6761, lon: 12.5683, slug: "copenhagen", continent: "Europe", popularity: 85 },
    { id: 8, name: "Oslo", country: "Norway", image: "/images/Oslo.jpg", lat: 59.9139, lon: 10.7522, slug: "oslo", continent: "Europe", popularity: 82 },
    { id: 9, name: "Rome", country: "Italy", image: "/images/Rome.jpg", lat: 41.9028, lon: 12.4964, slug: "rome", continent: "Europe", popularity: 95 },
    { id: 10, name: "Barcelona", country: "Spain", image: "/images/Barcelona.jpg", lat: 41.3851, lon: 2.1734, slug: "barcelona", continent: "Europe", popularity: 93 },

    { id: 11, name: "Tokyo", country: "Japan", image: "/images/Tokyo.jpg", lat: 35.6762, lon: 139.6503, slug: "tokyo", continent: "Asia", popularity: 97 },
    { id: 12, name: "Seoul", country: "South Korea", image: "/images/Seoul.jpg", lat: 37.5665, lon: 126.9780, slug: "seoul", continent: "Asia", popularity: 87 },
    { id: 13, name: "Bangkok", country: "Thailand", image: "/images/Bangkok.jpg", lat: 13.7563, lon: 100.5018, slug: "bangkok", continent: "Asia", popularity: 91 },
    { id: 14, name: "Singapore", country: "Singapore", image: "/images/Singapore.jpg", lat: 1.3521, lon: 103.8198, slug: "singapore", continent: "Asia", popularity: 89 },
    { id: 15, name: "Dubai", country: "UAE", image: "/images/Dubai.jpg", lat: 25.2048, lon: 55.2708, slug: "dubai", continent: "Asia", popularity: 94 },

    { id: 16, name: "New York", country: "USA", image: "/images/NewYork.jpg", lat: 40.7128, lon: -74.0060, slug: "new-york", continent: "North America", popularity: 99 },
    { id: 17, name: "Los Angeles", country: "USA", image: "/images/LosAngeles.jpg", lat: 34.0522, lon: -118.2437, slug: "los-angeles", continent: "North America", popularity: 90 },
    { id: 18, name: "Toronto", country: "Canada", image: "/images/Toronto.jpg", lat: 43.6510, lon: -79.3470, slug: "toronto", continent: "North America", popularity: 85 },
    { id: 19, name: "Mexico City", country: "Mexico", image: "/images/MexicoCity.jpg", lat: 19.4326, lon: -99.1332, slug: "mexico-city", continent: "North America", popularity: 84 },

    { id: 20, name: "Rio de Janeiro", country: "Brazil", image: "/images/Rio.jpg", lat: -22.9068, lon: -43.1729, slug: "rio-de-janeiro", continent: "South America", popularity: 92 },
    { id: 21, name: "Buenos Aires", country: "Argentina", image: "/images/BuenosAires.jpg", lat: -34.6037, lon: -58.3816, slug: "buenos-aires", continent: "South America", popularity: 86 },

    { id: 22, name: "Cape Town", country: "South Africa", image: "/images/CapeTown.jpg", lat: -33.9249, lon: 18.4241, slug: "cape-town", continent: "Africa", popularity: 88 },
    { id: 23, name: "Marrakech", country: "Morocco", image: "/images/Marrakech.jpg", lat: 31.6295, lon: -7.9811, slug: "marrakech", continent: "Africa", popularity: 85 },

    { id: 24, name: "Sydney", country: "Australia", image: "/images/Sydney.jpg", lat: -33.8688, lon: 151.2093, slug: "sydney", continent: "Oceania", popularity: 93 },
    { id: 25, name: "Auckland", country: "New Zealand", image: "/images/Auckland.jpg", lat: -36.8509, lon: 174.7645, slug: "auckland", continent: "Oceania", popularity: 82 },

    { id: 26, name: "Berlin", country: "Germany", image: "/images/Berlin.jpg", lat: 52.5200, lon: 13.4050, slug: "berlin", continent: "Europe", popularity: 91 },
    { id: 27, name: "London", country: "United Kingdom", image: "/images/London.jpg", lat: 51.5072, lon: -0.1276, slug: "london", continent: "Europe", popularity: 97 },
    { id: 28, name: "Lisbon", country: "Portugal", image: "/images/Lisbon.jpg", lat: 38.7223, lon: -9.1393, slug: "lisbon", continent: "Europe", popularity: 88 },
    { id: 29, name: "Athens", country: "Greece", image: "/images/Athens.jpg", lat: 37.9838, lon: 23.7275, slug: "athens", continent: "Europe", popularity: 87 },
    { id: 30, name: "Istanbul", country: "Turkey", image: "/images/Istanbul.jpg", lat: 41.0082, lon: 28.9784, slug: "istanbul", continent: "Europe", popularity: 92 },
    {id: 31, name: "Hammamet", country: "Tunisia", image: "/images/Hammamet.jpg", lat: 36.4000, lon: 10.6167, slug: "hammamet", continent: "Africa", popularity: 83}
];