import { LoaderArgs, redirect } from "@remix-run/node";
import { Link, useParams } from "@remix-run/react";
import { isUserLoggedIn } from "~/helpers/session";

export async function loader({ params, request }: LoaderArgs) {
    if (!isUserLoggedIn(request))
        return redirect("/login/");
    return params;
}

export default function CompanyIndexRoute() {
    const { companyName } = useParams();
    return (
        <main>
            <div>
                <Link to={"factures?companyName=" + companyName + '/'}>
                    factures
                </Link>
                <Link to={"devis?companyName=" + companyName + '/'}>
                    devis
                </Link>
                <Link to="clients/">
                    clients
                </Link>
            </div>
        </main>
    );
}