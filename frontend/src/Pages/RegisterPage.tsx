export default function RegisterPage() {
    return (
        <div className="app-container register-page">
            <h1 className="app-title">Triply</h1>
            <p className="app-subtitle">Glad you’re here! Create your account<br />
                and start your journey!</p>

            <form className="login-form">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" placeholder="Please enter your First Name" className="input-field" />
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" placeholder="Please enter your Last Name" className="input-field" />
                <label htmlFor="username">Username:</label>
                <input type="text" placeholder="Please enter your Username" className="input-field" />
                <label htmlFor="email">Email:</label>
                <input type="email" placeholder="Please enter your Email" className="input-field" />
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="Please enter your Password" className="input-field" />
                <button type="submit" className="submit-button">
                    Register
                </button>
            </form>
        </div>
    );
}