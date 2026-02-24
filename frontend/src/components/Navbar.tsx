import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Navbar.css";

type NavbarProps = {
    user: string;
    setUser: (username: string) => void;
};

export default function Navbar({ user, setUser }: Readonly<NavbarProps>) {
    const navigate = useNavigate();

    const logout = () => {
        axios.get("/api/user/logout")
            .then(() => {
                setUser("anonymousUser");
                navigate("/trip");
            })
            .catch(() => alert("Logout failed!"));
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo">
                    Triply
                </Link>
            </div>

            <div className="navbar-center">
                <Link to="/my-trips">📊 My Trips</Link>
                <Link to="/trip">+ New Trip</Link>
            </div>

            <div className="navbar-right">
                <span className="user-text">Hello {user}</span>
                <button onClick={logout} className="logout-btn">
                    Logout
                </button>
            </div>
        </nav>
    );
}