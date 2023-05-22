import { Links, Outlet } from "@remix-run/react";

export default function Profile() {
    return (
        <main>
            <Links />
            <Outlet />
        </main >
    )
}