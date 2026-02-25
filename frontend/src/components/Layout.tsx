import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import "../Styles/Layout.css";
type LayoutProps = {
    user: string;
    setUser: (username: string) => void;
};

export default function Layout({ user, setUser }: LayoutProps) {
    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <main className="content">
                <Outlet />
            </main>
            <footer className="footer">
                © 2026 Triply – Plan smarter!
            </footer>

        </>
    );
}