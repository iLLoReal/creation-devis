import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getFactures } from "~/db.server";
import { bill } from "~/types/global";

export async function loader() {
    return (json(await getFactures()));
}

export default function FacturesIndexRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <main>
            {data.bills.map((bill: bill) =>
                <div key={bill.billNumber}>
                    {bill.billNumber}
                </div>)}
        </main >
    )
}