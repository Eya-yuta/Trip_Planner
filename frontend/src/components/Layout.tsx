import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx";

type LayoutProps = {
    user: string;
    setUser: (username: string) => void;
};

export default function Layout({ user, setUser }: LayoutProps) {
    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <Outlet />
        </>
    );
}