import {useNavigate} from "react-router-dom";
import {type SubmitEvent, useState} from "react";
import axios from "axios";

type LoginPageProps= {
    setUser:(username:string) => void
}
export default function LoginPage(props:Readonly<LoginPageProps>) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    //const [email, setEmail] = useState<string>("")
    const navigate = useNavigate();

        const goRegisterPage = () => {
            navigate("/register");
        };

    function submitLogin(e:SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then(r => props.setUser(r.data))
            .then(() => navigate("/hello"))
    }
    return (
        <div className="app-container">
            <h1 className="app-title">Triply</h1>
            <p className="app-subtitle">Let’s get started!</p>

            <form className="login-form" onSubmit={submitLogin}>
                <label htmlFor="username">Username:</label>
                <input type="text" value={username} placeholder="Please enter your Username" className="input-field"
                       onChange={e => setUsername(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} placeholder="Please enter your Password" className="input-field"
                       onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="submit-button">
                    Login
                </button>
            </form>
            {/* Register Hinweis */}
            <p className="register-text">
                Don't have an account yet?{" "}
                <span
                    className="register-link"
                    onClick={goRegisterPage}
                >
          Register
        </span>
            </p>
        </div>
    );
}