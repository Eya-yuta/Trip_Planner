import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
    user:string
}
export default function HelloPage(props:Readonly<ProtectedRouteProps>) {
    const navigate = useNavigate();

    const goNextPage = () => {
        navigate("/login");
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Triply</h1>
            <p className="app-subtitle">Hello {props.user}!</p>
            <button className="next-button" onClick={goNextPage}>
                Next
            </button>
        </div>
    );
}