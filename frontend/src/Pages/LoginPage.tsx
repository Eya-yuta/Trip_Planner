export default function LoginPage() {
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
        </div>
    );
}