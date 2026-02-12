import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/HelloPage.css";
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
        <div className="hello-container">
            <div className="hello-header">
            <h1 className="hello-title">Triply</h1>
            <button className="logout-button" onClick={logout}>
                Logout
            </button>
            </div>
            <div className="hello-content">
                <p className="hello-subtitle">Hello {props.user}! Your trip starts now!</p>
            <button className="next-button" onClick={goNextPage}>
                Next
            </button>
            </div>
        </div>
    );
}