import { useNavigate } from "react-router-dom";
import axios from "axios";

type ProtectedRouteProps = {
    user:string
    setUser:(username:string) => void
}
export default function HelloPage(props:Readonly<ProtectedRouteProps>) {
    const navigate = useNavigate();
    function logout() {
        axios.get("/api/user/logout")
            .then(() => {
                props.setUser("anonymousUser");
                navigate("/login");
            })
            .catch(() => {
                alert("Logout failed!");
            });
    }

    const goNextPage = () => {
        navigate("/trip");
    };


    return (
        <div className="app-container">
            <h1 className="app-title">Triply</h1>
            <p className="app-subtitle">Hello {props.user}!</p>
            <button className="submit-button" onClick={logout}>
                Logout
            </button>
            <button className="next-button" onClick={goNextPage}>
                Next
            </button>
        </div>
    );
}