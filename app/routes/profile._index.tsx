import { Link } from "@remix-run/react"

export default function ProfileIndexRoute() {
    return (
        <main>
            <div>
                <Link to="/factures/">
                    factures
                </Link>
                <Link to="/clients/">
                    clients
                </Link>
            </div>
        </main>
    );
}