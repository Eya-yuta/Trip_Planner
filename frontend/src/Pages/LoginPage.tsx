import {Link, useNavigate} from "react-router-dom";
import {type SubmitEvent, useState} from "react";
import axios from "axios";
import logo from "../assets/logo.png";

type LoginPageProps= {
    setUser:(username:string) => void
}
export default function LoginPage(props:Readonly<LoginPageProps>) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    function submitLogin(e:SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        setError("");
        axios
            .post("/api/user/login", undefined, { auth: { username, password } })
            .then((r) => {
                props.setUser(r.data);
                navigate("/hello");
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    setError("Username or password is incorrect!");
                } else {
                    setError("An unexpected error occurred. Please try again!");
                }
            });
    }
    return (
        <div className="app-container">
            <Link to="/" className="logo">
                <img src={logo} alt="Triply Logo" className="logo-img" />
            </Link>
            <p className="app-subtitle">Let’s get started!</p>

            <form className="login-form" onSubmit={submitLogin} noValidate>
                <label htmlFor="username">Username:</label>
                <input type="text" value={username} placeholder="Please enter your Username" className="input-field"
                       onChange={e => {setUsername(e.target.value);setError("")}}/>
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} placeholder="Please enter your Password" className="input-field"
                       onChange={(e) =>{setPassword(e.target.value);setError("")}}/>
                <button type="submit" className="submit-button">
                    Login
                </button>
                {error && <p className="error-text">{error}</p>}
            </form>
            {/* Register text */}
            <p className="register-text">
                Don't have an account yet?{" "}
                <Link to="/register" className="register-link">
                    Register
                </Link>
            </p>
        </div>
    );
}