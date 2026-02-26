import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Navbar.css";
import logo from "../assets/logo.png";
import {useState} from "react";
import {destinations} from "../Types/Destination.ts";

type NavbarProps = {
    user: string;
    setUser: (username: string) => void;
};

export default function Navbar({ user, setUser }: Readonly<NavbarProps>) {

    const navigate = useNavigate();

    const logout = () => {
        axios.get("/api/user/logout")
            .then(() => {
                setUser("User");
                navigate("/");
            })
            .catch(() => alert("Logout failed!"));
    };
    const isLoggedIn = user && user !== "anonymousUser";
    const [searchQuery, setSearchQuery] = useState("");
    const filteredDestinations = destinations.filter(dest =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link  to={isLoggedIn ? "/hello" : "/"}  className="logo">
                    <img src={logo} alt="Triply Logo" className="logo-img" />
                </Link>
            </div>

            {isLoggedIn && (
                <div className="navbar-center">
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder=" Enter your destination..."
                        className="navbar-search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {searchQuery && filteredDestinations.length > 0 && (
                        <ul className="search-dropdown">
                            {filteredDestinations.map(dest => (
                                <li
                                    key={dest.id}
                                    onClick={() => {
                                        navigate(`/destination/${dest.id}`);
                                        setSearchQuery("");
                                    }}
                                >
                                    {dest.name}, {dest.country}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <div className="navbar-right">
                {isLoggedIn ? (
                    <>
                        <span className="user-text">Hello {user}!</span>
                        <Link to="/myTrips" className="nav-button">
                            My Trips
                        </Link>
                        <button onClick={logout} className="logout-btn">
                            👤 Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="logout-btn"
                    >
                        👤 Login
                    </button>
                )}
            </div>
        </nav>
    );
}