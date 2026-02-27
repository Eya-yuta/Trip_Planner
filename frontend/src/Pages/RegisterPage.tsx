import {useNavigate} from "react-router-dom";
import {type SubmitEvent,useState} from "react";
import axios from "axios";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [error, setError] = useState<string>("");

    const nav = useNavigate();

    function submitRegister(e:SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !username.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            setError("Please fill in all fields!");
            return;
        }
        setError("");
        axios.post("/api/user/register", {
            firstName,
            lastName,
            username,
            email,
            password
        })
            .then(() => nav("/login"))
            .catch(() => setError("Registration failed!"));
    }

    return (
        <div className="app-container register-page">
            <h1 className="app-title">Triply</h1>
            <p className="app-subtitle">Glad you’re here! Create your account<br />
                and start your journey!</p>

            <form className="login-form" onSubmit={submitRegister} noValidate>
                <label htmlFor="firstName">First Name:</label>
                <input required type="text" value={firstName} placeholder="Please enter your First Name" className="input-field"
                       onChange={e => {setFirstName(e.target.value);setError("");}}/>
                <label htmlFor="lastName">Last Name:</label>
                <input required type="text" value={lastName} placeholder="Please enter your Last Name" className="input-field"
                onChange={e => {setLastName(e.target.value);setError("");}}/>
                <label htmlFor="username">Username:</label>
                <input required type="text" value={username} placeholder="Please enter your Username" className="input-field"
                       onChange={e => {setUsername(e.target.value);setError("");}}/>
                <label htmlFor="email">Email:</label>
                <input required type="email" value={email} placeholder="Please enter your Email" className="input-field"
                onChange={e => {setEmail(e.target.value);setError("");}}/>
                <label htmlFor="password">Password:</label>
                <input required type="password" value={password} placeholder="Please enter your Password" className="input-field"
                       onChange={e => {setPassword(e.target.value);setError("");}}/>
                {error && <p className="error-text">{error}</p>}
                <button type="submit" className="submit-button">
                    Register
                </button>
            </form>
        </div>
    );
}