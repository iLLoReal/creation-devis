import { LoaderArgs, json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllEstimates } from "~/db.server";
import { isUserLoggedIn } from "~/helpers/session";
import { estimate } from "~/types/global";

export async function loader({ params, request }: LoaderArgs) {
    const loggedIn = await isUserLoggedIn(request);
    if (!loggedIn) {
        return redirect('/login');
    }
    return (json(await getAllEstimates("SuperCompany")));
}

export function ErrorBoundary() {
    return (
        <div>
            Error
            <Link to={'..'}>back</Link>
        </div>
    )
}

export default function CompaniesCompanyRouteFacturesIndexRoute() {
    const estimates = useLoaderData<estimate[]>();
    console.log('estimates:', estimates);
    return (
        <main>
            {estimates.map((estimate: estimate, id: number) =>
                <div key={'estimate/' + 'id' + '/' + estimate.billNumber + '?companyName='}>
                    <Link to={estimate.billNumber}>
                        {estimate.billNumber}
                    </Link>
                </div>)}
        </main >
    )
}