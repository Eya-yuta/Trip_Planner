import {useNavigate} from "react-router-dom";
import {type SubmitEvent,useState} from "react";
import axios from "axios";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const nav = useNavigate();

    function submitRegister(e:SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        axios.post("/api/user/register", {
            firstName,
            lastName,
            username,
            email,
            password
        })
            .then(() => nav("/login"))
    }

    return (
        <div className="app-container register-page">
            <h1 className="app-title">Triply</h1>
            <p className="app-subtitle">Glad you’re here! Create your account<br />
                and start your journey!</p>

            <form className="login-form" onSubmit={submitRegister}>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" value={firstName} placeholder="Please enter your First Name" className="input-field"
                       onChange={e => setFirstName(e.target.value)}/>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" value={lastName} placeholder="Please enter your Last Name" className="input-field"
                onChange={e => setLastName(e.target.value)}/>
                <label htmlFor="username">Username:</label>
                <input type="text" value={username} placeholder="Please enter your Username" className="input-field"
                       onChange={e => setUsername(e.target.value)}/>
                <label htmlFor="email">Email:</label>
                <input type="email" value={email} placeholder="Please enter your Email" className="input-field"
                onChange={e => setEmail(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} placeholder="Please enter your Password" className="input-field"
                       onChange={e => setPassword(e.target.value)}/>
                <button type="submit" className="submit-button">
                    Register
                </button>
            </form>
        </div>
    );
}