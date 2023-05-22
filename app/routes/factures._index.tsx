import { LoaderArgs, json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getFactures } from "~/db.server";
import { isUserLoggedIn } from "~/helpers/session";
import { getSession } from "~/session";
import { bill } from "~/types/global";

export async function loader({request} : LoaderArgs) {
    const loggedIn = await isUserLoggedIn(request);
    if (!loggedIn) {
        return redirect('/');
    } 
    return (json(await getFactures()));
}
export default function FacturesIndexRoute() {
    const  bills = useLoaderData<typeof loader>();

    return (
        <main>
            {bills.map((bill: bill, id: number) =>
                <div key={bill.billNumber}>
                    <Link to={"/factures/" + id}>
                        {bill.billNumber}
                    </Link>
                </div>)}
        </main >
    )
}