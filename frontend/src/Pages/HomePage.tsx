import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    const goNextPage = () => {
        navigate("/login");
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Triply</h1>
            <p className="app-subtitle">Welcome to your adventure!</p>
            <button className="next-button" onClick={goNextPage}>
                Next
            </button>
        </div>
    );
}