import {useNavigate} from "react-router-dom";

export default function LoginPage() {
        const navigate = useNavigate();

        const goRegisterPage = () => {
            navigate("/register");
        };
    return (
        <div className="app-container">
            <h1 className="app-title">Triply</h1>
            <p className="app-subtitle">Let’s get started!</p>

            <form className="login-form">
                <label htmlFor="email">Email:</label>
                <input type="email" placeholder="Please enter your Email" className="input-field" />
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="Please enter your Password" className="input-field" />
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